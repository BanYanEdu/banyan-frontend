import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from "inet-ui";


@Component({
    selector: 'app-root',
    template: `        <app-layout  [expandedMenu]="false"  (routeChange)="onChange($event)"
                     [visibleOverlay]="visibleMenu"
                     [hideToggler]="true"
                     [hideTogglerButton]="true"
                     [homeRouterLink]="'home'" [hideBrandName]="true" [visibleToolbar]="visibleToolbar"
                     [fullLayoutWithUrls]="[]" [theme]="'theme-light'">
            <ng-template #navbarMenu>
            </ng-template>
        </app-layout>

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
