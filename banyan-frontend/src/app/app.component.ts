import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from "inet-ui";


@Component({
    selector: 'app-root',
    template: `        
                <div>
                    <div class="col-sm-12">
                        <app-top-menu></app-top-menu>
                    </div>
                    <div class="col-sm-12">
                            <router-outlet></router-outlet>
                        </div>
                </div>
    `

})
export class AppComponent implements OnInit {
    theme: string;
    expandedMenu = false;
    visibleMenu = false;
    visibleToolbar = false;
    @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

    constructor() {}

    ngOnInit() {

        window.localStorage.setItem('expandedMenu', this.expandedMenu ? '1' : '0');
    }
    onToggleMenu($event) {
        this.expandedMenu = !this.expandedMenu;
    }

    onChange($event) {
        // this.expandedMenu = $event['expandedMenu'];
    }

    onLoadToolbar($event) {
        this.visibleToolbar = $event;
    }
}
