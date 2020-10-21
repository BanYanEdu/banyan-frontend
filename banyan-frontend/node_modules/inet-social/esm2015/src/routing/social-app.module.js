/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { SocialRoutingModule } from "./social-routing.module";
import { SocialHomeComponent } from './home/social-home.component';
import { SocialFriendComponent } from "./friend/social-friend.component";
import { SocialActivityViewComponent } from "./activity-view/social-activity-view.component";
import { SocialRightLayoutComponent } from "./right-layout/social-right-layout.component";
import { SocialModule } from "../social.module";
import { NavigationTabModule } from "inet-ui";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
export class SocialAppModule {
}
SocialAppModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    SocialModule,
                    SocialRoutingModule,
                    NavigationTabModule
                ],
                declarations: [
                    SocialHomeComponent,
                    SocialFriendComponent,
                    SocialActivityViewComponent,
                    SocialRightLayoutComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWFwcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9yb3V0aW5nL3NvY2lhbC1hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQzNGLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBaUJoRSxNQUFNLE9BQU8sZUFBZTs7O1lBZjNCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDVixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQiwwQkFBMEI7aUJBQzdCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsUm91dGluZ01vZHVsZX0gZnJvbSBcIi4vc29jaWFsLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQge1NvY2lhbEhvbWVDb21wb25lbnR9IGZyb20gJy4vaG9tZS9zb2NpYWwtaG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHtTb2NpYWxGcmllbmRDb21wb25lbnR9IGZyb20gXCIuL2ZyaWVuZC9zb2NpYWwtZnJpZW5kLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eVZpZXdDb21wb25lbnR9IGZyb20gXCIuL2FjdGl2aXR5LXZpZXcvc29jaWFsLWFjdGl2aXR5LXZpZXcuY29tcG9uZW50XCI7XG5pbXBvcnQge1NvY2lhbFJpZ2h0TGF5b3V0Q29tcG9uZW50fSBmcm9tIFwiLi9yaWdodC1sYXlvdXQvc29jaWFsLXJpZ2h0LWxheW91dC5jb21wb25lbnRcIjtcbmltcG9ydCB7U29jaWFsTW9kdWxlfSBmcm9tIFwiLi4vc29jaWFsLm1vZHVsZVwiO1xuaW1wb3J0IHtOYXZpZ2F0aW9uVGFiTW9kdWxlfSBmcm9tIFwiaW5ldC11aVwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgU29jaWFsTW9kdWxlLFxuICAgICAgICBTb2NpYWxSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXZpZ2F0aW9uVGFiTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU29jaWFsSG9tZUNvbXBvbmVudCxcbiAgICAgICAgU29jaWFsRnJpZW5kQ29tcG9uZW50LFxuICAgICAgICBTb2NpYWxBY3Rpdml0eVZpZXdDb21wb25lbnQsXG4gICAgICAgIFNvY2lhbFJpZ2h0TGF5b3V0Q29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NpYWxBcHBNb2R1bGUgeyB9XG4iXX0=