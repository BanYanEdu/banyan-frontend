import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-top-menu',
    templateUrl: './menu.component.html'
})
export class TopMenuComponent implements OnInit {
    username: string;


    constructor() {}

    ngOnInit() {

        this.username = iNet.username;
        // console.log('Load menu ...');
        // console.log(iNet.username);
        console.log(iNet);
    }

}
