/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { SocialGroupComponent } from "../../social-friend/group/group.component";
import { FriendInvitationComponent } from "../../social-friend/invitation/friend-invitation.component";
import { FriendBrowseComponent } from "../../social-friend/browse/friend-browse.component";
export class SocialFriendComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.tabs = [
            {
                name: 'Trang chủ',
                component: '',
                path: ''
            },
            {
                name: 'Bạn bè',
                component: SocialGroupComponent,
                path: '/friend'
            },
            {
                name: 'Lời mời',
                component: FriendInvitationComponent,
                path: '/friend/invitation'
            },
            {
                name: 'Tìm bạn',
                component: FriendBrowseComponent,
                path: '/friend/browse'
            }
        ];
        this.searchValue = '';
        this.search = new FormControl();
        this.prefix = this.router.url.substring(0, this.router.url.indexOf('/friend'));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._searchEl = $(this.searchEl.nativeElement);
        this.search.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (this._searchable) {
                this._activeComponent.instance.onSearch(value.trim());
            }
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    changeTab(data) {
        this.searchValue = '';
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    loadTabComponent(componentRef) {
        this._activeComponent = componentRef;
        this._searchable = componentRef.instance.onSearch;
        this.placeholder = componentRef.instance.placeholder || 'Tìm kiếm...';
        if (this._searchable) {
            this._searchEl.show();
            componentRef.instance.clearSearchValue = (/**
             * @return {?}
             */
            () => {
                this.searchValue = '';
            });
        }
        else {
            this._searchEl.hide();
        }
    }
}
SocialFriendComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"friend-toolbar\">\n    <div navigationTab\n         [tabs]=\"tabs\"\n         [viewContainerRef]=\"_tabViewContainer\"\n         [prefix]=\"prefix\"\n         (onChange)=\"changeTab($event)\"\n         (onLoad)=\"loadTabComponent($event)\" class=\"friend-tab\"></div>\n\n    <div #searchEl class=\"input-group search-input\">\n        <div class=\"input-group-prepend\">\n            <i class=\"input-group-text fa fa-search\"></i>\n        </div>\n        <input type=\"text\"\n               [formControl]=\"search\"\n               [(ngModel)]=\"searchValue\"\n               class=\"form-control\" [placeholder]=\"placeholder\">\n    </div>\n</div>\n<div class=\"friend-content\">\n    <ng-container #tabViewContainer></ng-container>\n</div>\n",
                styles: [".friend-toolbar{border-bottom:1px solid rgba(0,0,0,.12);background:#e5e9ee;margin-bottom:20px;padding:10px 15px;min-height:58px}.friend-tab{float:left;margin-right:25px}.friend-content{padding:0 15px}.search-input{width:300px}@media (max-width:767px){.friend-content{padding:0}.friend-tab{margin:0 0 10px}.search-input{width:100%}}"]
            }] }
];
/** @nocollapse */
SocialFriendComponent.ctorParameters = () => [
    { type: Router }
];
SocialFriendComponent.propDecorators = {
    _tabViewContainer: [{ type: ViewChild, args: ['tabViewContainer', { read: ViewContainerRef },] }],
    searchEl: [{ type: ViewChild, args: ['searchEl',] }]
};
if (false) {
    /** @type {?} */
    SocialFriendComponent.prototype._tabViewContainer;
    /** @type {?} */
    SocialFriendComponent.prototype.searchEl;
    /** @type {?} */
    SocialFriendComponent.prototype.tabs;
    /** @type {?} */
    SocialFriendComponent.prototype.searchValue;
    /** @type {?} */
    SocialFriendComponent.prototype.search;
    /** @type {?} */
    SocialFriendComponent.prototype.placeholder;
    /** @type {?} */
    SocialFriendComponent.prototype.prefix;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._activeComponent;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._searchEl;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._searchable;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWZyaWVuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9yb3V0aW5nL2ZyaWVuZC9zb2NpYWwtZnJpZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBd0IsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNERBQTRELENBQUM7QUFDckcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFPekYsTUFBTSxPQUFPLHFCQUFxQjs7OztJQXNDOUIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFqQ2xDLFNBQUksR0FBcUI7WUFDckI7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxFQUFFO2FBQ1g7WUFDRDtnQkFDSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixJQUFJLEVBQUUsU0FBUzthQUNsQjtZQUNEO2dCQUNJLElBQUksRUFBRSxTQUFTO2dCQUNmLFNBQVMsRUFBRSx5QkFBeUI7Z0JBQ3BDLElBQUksRUFBRSxvQkFBb0I7YUFDN0I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxJQUFJLEVBQUUsZ0JBQWdCO2FBQ3pCO1NBQ0osQ0FBQztRQUVGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLFdBQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBVXZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBb0I7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxZQUErQjtRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7OztZQUFHLEdBQUcsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFBLENBQUM7U0FDTDthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7OztZQXZFSixTQUFTLFNBQUM7Z0JBQ1Asb3dCQUE2Qzs7YUFFaEQ7Ozs7WUFWTyxNQUFNOzs7Z0NBYVQsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO3VCQUN0RCxTQUFTLFNBQUMsVUFBVTs7OztJQURyQixrREFBMkU7O0lBQzNFLHlDQUFnQzs7SUFFaEMscUNBcUJFOztJQUVGLDRDQUF5Qjs7SUFDekIsdUNBQTJCOztJQUMzQiw0Q0FBb0I7O0lBRXBCLHVDQUFlOzs7OztJQUVmLGlEQUF5Qjs7Ozs7SUFDekIsMENBQWtCOzs7OztJQUNsQiw0Q0FBNkI7Ozs7O0lBRWpCLHVDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge05hdmlnYXRpb25EYXRhfSBmcm9tIFwiaW5ldC11aVwiO1xuaW1wb3J0IHtTb2NpYWxHcm91cENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL3NvY2lhbC1mcmllbmQvZ3JvdXAvZ3JvdXAuY29tcG9uZW50XCI7XG5pbXBvcnQge0ZyaWVuZEludml0YXRpb25Db21wb25lbnR9IGZyb20gXCIuLi8uLi9zb2NpYWwtZnJpZW5kL2ludml0YXRpb24vZnJpZW5kLWludml0YXRpb24uY29tcG9uZW50XCI7XG5pbXBvcnQge0ZyaWVuZEJyb3dzZUNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL3NvY2lhbC1mcmllbmQvYnJvd3NlL2ZyaWVuZC1icm93c2UuY29tcG9uZW50XCI7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9zb2NpYWwtZnJpZW5kLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zb2NpYWwtZnJpZW5kLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NpYWxGcmllbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgndGFiVmlld0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgX3RhYlZpZXdDb250YWluZXI7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoRWwnKSBzZWFyY2hFbDtcblxuICAgIHRhYnM6IE5hdmlnYXRpb25EYXRhW10gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdUcmFuZyBjaOG7pycsXG4gICAgICAgICAgICBjb21wb25lbnQ6ICcnLFxuICAgICAgICAgICAgcGF0aDogJydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0LhuqFuIGLDqCcsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFNvY2lhbEdyb3VwQ29tcG9uZW50LFxuICAgICAgICAgICAgcGF0aDogJy9mcmllbmQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdM4budaSBt4budaScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEZyaWVuZEludml0YXRpb25Db21wb25lbnQsXG4gICAgICAgICAgICBwYXRoOiAnL2ZyaWVuZC9pbnZpdGF0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVMOsbSBi4bqhbicsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEZyaWVuZEJyb3dzZUNvbXBvbmVudCxcbiAgICAgICAgICAgIHBhdGg6ICcvZnJpZW5kL2Jyb3dzZSdcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBzZWFyY2hWYWx1ZTogc3RyaW5nID0gJyc7XG4gICAgc2VhcmNoID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIHByZWZpeDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ29tcG9uZW50O1xuICAgIHByaXZhdGUgX3NlYXJjaEVsO1xuICAgIHByaXZhdGUgX3NlYXJjaGFibGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMucHJlZml4ID0gdGhpcy5yb3V0ZXIudXJsLnN1YnN0cmluZygwLCB0aGlzLnJvdXRlci51cmwuaW5kZXhPZignL2ZyaWVuZCcpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc2VhcmNoRWwgPSAkKHRoaXMuc2VhcmNoRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuc2VhcmNoLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VhcmNoYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC5pbnN0YW5jZS5vblNlYXJjaCh2YWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VUYWIoZGF0YTogTmF2aWdhdGlvbkRhdGEpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIGxvYWRUYWJDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9hY3RpdmVDb21wb25lbnQgPSBjb21wb25lbnRSZWY7XG4gICAgICAgIHRoaXMuX3NlYXJjaGFibGUgPSBjb21wb25lbnRSZWYuaW5zdGFuY2Uub25TZWFyY2g7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UucGxhY2Vob2xkZXIgfHwgJ1TDrG0ga2nhur9tLi4uJztcbiAgICAgICAgaWYgKHRoaXMuX3NlYXJjaGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaEVsLnNob3coKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbGVhclNlYXJjaFZhbHVlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hFbC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==