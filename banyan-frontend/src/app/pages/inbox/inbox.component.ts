import {Component, OnInit, ViewChild} from '@angular/core';
import {ListViewComponent} from "inet-ui";

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
    keyword = '';
    peoples: any[] = [];
    selectedPeople: any[] = [];

    @ViewChild(ListViewComponent) listView: ListViewComponent;

    constructor() {
    }

    ngOnInit() {

    }

    onListSelectionChanged(items, click?: boolean) {

    }

    search($event: any) {

    }

}
