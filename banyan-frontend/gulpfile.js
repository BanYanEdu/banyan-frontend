require('events').EventEmitter.defaultMaxListeners = 0;

const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpRename = require("gulp-rename");
const del = require('del');
const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const exec = require('child_process').exec;
const fs = require('fs');

const distFolder = "dist";
const moduleName = "banyan.zip";
const buildDir = 'dist/build';

const jsFolder = 'iNet.jsFolder';

// Get config on angular.json
let defaultProject;
let projects = [];

initProjectVariable();

gulp.task('clean', function (cb) {
    return del([
        distFolder
    ], cb);
});

gulp.task('ng-build', function (cb) {
    let tasks = [];
    projects.forEach(project => tasks.push(buildProject(project)));
    Promise.all(tasks).then(function () {
        console.log('Build completed');
        cb();
    });
});

gulp.task('package', function (cb) {
    runSync([initResources, copyChunkToBuildFolder], function () {
        runAsync([updateLazyLoadChunkPath, updateChunkPathOnHTML, updateVersionModified], function () {
            zipModule(cb);
        });
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', function (cb) {
    runSequence('clean', 'ng-build', 'package', cb);
});

function buildProject(project) {
    return new Promise(function (resolve) {
        // Fixed node out of memory

        // var ng = exec(`./node_modules/.bin/ng build --project=${project} --aot --prod --named-chunks --progress`, {maxBuffer: 1024 * 2048}, function (err, stdou, stderr) {
        //     resolve();
        // });
        exec(`npm run copy:flatpickr`, function (err, stdou, stderr) {

        });

        const ng = exec(`node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --project=${project} --aot --prod --named-chunks --progress`, {maxBuffer: 1024 * 2048}, function (err, stdou, stderr) {
            resolve();
        });

        ng.stdout.on('data', function (chunk) {
            process.stdout.write(chunk);
        });

        ng.stderr.on('data', function (chunk) {
            process.stdout.write(chunk);
        });
    });
}

function initResources(callback) {
    gulp.src(['icloud/**']).pipe(gulp.dest(buildDir)).on('end', callback);
}

function copyChunkToBuildFolder(callback) {
    let promises = [];
    promises.push(new Promise(resolve => {
        gulp.src(['dist/ng/**/*.js'])
            .pipe(gulpRename(updatePath))
            .pipe(gulp.dest(buildDir + '/js')).on('end', resolve);
    }));
    promises.push(new Promise(resolve => {
        gulp.src(['dist/ng/**/*.css'])
            .pipe(gulpRename(updatePath))
            .pipe(gulp.dest(buildDir + '/css')).on('end', resolve);
    }));
    promises.push(new Promise(resolve => {
        gulp.src(['dist/ng/**/*.properties'])
            .pipe(gulpRename(function(path){
                path.dirname = '';
            }))
            .pipe(gulp.dest(buildDir + '/message')).on('end', resolve);
    }));
    Promise.all(promises).then(callback);

    function updatePath(path) {
        if (path.dirname === defaultProject) {
            path.dirname = '';
        }
    }
}

function updateLazyLoadChunkPath(callback) {
    gulp.src([buildDir + '/**/runtime.*.js'], {base: "./"})
        .pipe(gulpReplace(/(\.src=.*?{return\s).*?\+/, function (str, p1) {
            // dist/build/js/***/runtime.*.js
            let subPath = '';
            let paths = this.file.relative.replace(/\\/g, '/').split('/');
            paths = paths.slice(paths.indexOf('js') + 1, paths.length - 1);
            if (paths.length > 0) {
                paths.push('');
                subPath = paths.join('/');
            }

            return `${p1}${jsFolder}+"${subPath}"+`;
        }))
        // .pipe(gulpReplace(/(\.src=.*?{return\s).*?\+/, '$1' + chunkDir + '+'))
        .pipe(gulp.dest('./'))
        .on('end', callback);
}

function updateChunkPathOnHTML(callback) {
    const sourceFiles = [];
    gulp.src([buildDir + '/**']).on('data', function (file) {
        // All resources file
        sourceFiles.push(file.relative.replace(/\\/g, '/'));
    }).on('end', function () {
        // Replace chunk path: __RESOURCE__CSS | __RESOURCE__JS

        gulp.src([buildDir + '/**/**.html'], {base: "./"})
            .pipe(gulpReplace(/__RESOURCE__(.*?)({.*?})/g, function (str, type, name) {
                return getChunkName(type, name);
            }))
            .pipe(gulp.dest('./')).on('end', callback);

        function getChunkName(type, name) {
            let realName = name.replace(/[{}]/g, '');
            let ext = type.toLowerCase();
            let filePattern = new RegExp(`/${realName}.*?\\.${ext}$`);
            for (let i = 0; i < sourceFiles.length; i++) {
                let file = sourceFiles[i]; // js/banyan/runtime.ed2b195a59d2b5a6eaba.js
                if (filePattern.test(file)) {
                    // theme not include .css suffix
                    file = file.replace(/\.css$/g, '');
                    return file.split('/').slice(1).join('/');
                }
            }
            console.error("Resource file not found: " + name);
        }
    });
}

function updateVersionModified(callback) {
    const version = new Date().getTime();
    gulp.src([buildDir + '/*.profile'], {base: "./"})
        .pipe(gulpReplace(/{version}/g, version))
        .pipe(gulp.dest('./')).on('end', callback);
}

function zipModule(callback) {
    gulp.src([buildDir + '/**'])
        .pipe(zip(moduleName))
        .pipe(gulp.dest(distFolder + '/target')).on('end', callback)
}

function initProjectVariable() {
    try {
        var angularConfig = JSON.parse(fs.readFileSync('angular.json', 'utf-8'));

        defaultProject = angularConfig.defaultProject;

        for (var project in angularConfig.projects) {
            // Test project
            if (!project.endsWith('-e2e') && project!=='collaboration-task-list') {
                projects.push(project);
            }
        }
        console.log('[projects]', projects);
    } catch (e) {
        console.log(e);
        console.log("Can't get config from angular.json");
        process.exit(-1);
    }
}


function runSync(tasks, callback) {
    let count = 0;
    fn();

    function fn() {
        if (count === tasks.length) {
            return callback();
        }
        runTask(tasks[count], fn);
        count += 1;
    }
}

function runAsync(tasks, callback) {
    let count = 0;
    tasks.forEach(fn => {
        runTask(fn, function () {
            count += 1;
            if (count === tasks.length) {
                callback();
            }
        });
    })
}

function runTask(task, callback) {
    let time = new Date();
    console.log(`${task.name} running..`);
    task(function () {
        let timeCompleted = Math.round(new Date() - time);
        console.log(`${task.name} completed after ${timeCompleted} ms`);
        callback();
    });
}
