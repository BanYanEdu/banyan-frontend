import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
let AngularUtilService = class AngularUtilService {
    constructor(compFactoryResolver, appRef, injector) {
        this.compFactoryResolver = compFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    createAngularComponent(component) {
        // Create a component reference from the component
        const componentRef = this.compFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);
        // Get DOM element from component
        let domElem;
        const viewRef = componentRef.hostView;
        if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
            domElem = viewRef.rootNodes[0];
        }
        return { componentRef, domElement: domElem };
    }
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    createAngularComponentAppendToDom(component, targetElement, clearTargetContent = false) {
        const componentOutput = this.createAngularComponent(component);
        // Append DOM element to the HTML element specified
        if (targetElement && targetElement.appendChild) {
            if (clearTargetContent && targetElement.innerHTML) {
                targetElement.innerHTML = '';
            }
            targetElement.appendChild(componentOutput.domElement);
        }
        else {
            document.body.appendChild(componentOutput.domElement); // when no target provided, we'll simply add it to the HTML Body
        }
        return componentOutput;
    }
};
AngularUtilService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver,
        ApplicationRef,
        Injector])
], AngularUtilService);
export { AngularUtilService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhclV0aWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQWlDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFDN0IsWUFDVSxtQkFBNkMsRUFDN0MsTUFBc0IsRUFDdEIsUUFBa0I7UUFGbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEwQjtRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3hCLENBQUM7SUFFTCx1R0FBdUc7SUFDdkcsc0JBQXNCLENBQUMsU0FBYztRQUNuQyxrREFBa0Q7UUFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjthQUMxQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUM7YUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLGlDQUFpQztRQUNqQyxJQUFJLE9BQU8sQ0FBQztRQUNaLE1BQU0sT0FBTyxHQUFJLFlBQVksQ0FBQyxRQUFpQyxDQUFDO1FBQ2hFLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO1NBQy9DO1FBRUQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVHQUF1RztJQUN2RyxpQ0FBaUMsQ0FBQyxTQUFjLEVBQUUsYUFBcUMsRUFBRSxrQkFBa0IsR0FBRyxLQUFLO1FBQ2pILE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvRCxtREFBbUQ7UUFDbkQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUM5QyxJQUFJLGtCQUFrQixJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pELGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBQ0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdFQUFnRTtTQUN4SDtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFBO0FBM0NZLGtCQUFrQjtJQUQ5QixVQUFVLEVBQUU7NkNBR29CLHdCQUF3QjtRQUNyQyxjQUFjO1FBQ1osUUFBUTtHQUpqQixrQkFBa0IsQ0EyQzlCO1NBM0NZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuZ3VsYXJDb21wb25lbnRPdXRwdXQgfSBmcm9tICcuLy4uL21vZGVscy9hbmd1bGFyQ29tcG9uZW50T3V0cHV0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclV0aWxTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgKSB7IH1cclxuXHJcbiAgLy8gcmVmIGh0dHBzOi8vaGFja2Vybm9vbi5jb20vYW5ndWxhci1wcm8tdGlwLWhvdy10by1keW5hbWljYWxseS1jcmVhdGUtY29tcG9uZW50cy1pbi1ib2R5LWJhMjAwY2MyODllNlxyXG4gIGNyZWF0ZUFuZ3VsYXJDb21wb25lbnQoY29tcG9uZW50OiBhbnkpOiBBbmd1bGFyQ29tcG9uZW50T3V0cHV0IHtcclxuICAgIC8vIENyZWF0ZSBhIGNvbXBvbmVudCByZWZlcmVuY2UgZnJvbSB0aGUgY29tcG9uZW50XHJcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbXBGYWN0b3J5UmVzb2x2ZXJcclxuICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudClcclxuICAgICAgLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcclxuXHJcbiAgICAvLyBBdHRhY2ggY29tcG9uZW50IHRvIHRoZSBhcHBSZWYgc28gdGhhdCBpdCdzIGluc2lkZSB0aGUgbmcgY29tcG9uZW50IHRyZWVcclxuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICAvLyBHZXQgRE9NIGVsZW1lbnQgZnJvbSBjb21wb25lbnRcclxuICAgIGxldCBkb21FbGVtO1xyXG4gICAgY29uc3Qgdmlld1JlZiA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pO1xyXG4gICAgaWYgKHZpZXdSZWYgJiYgQXJyYXkuaXNBcnJheSh2aWV3UmVmLnJvb3ROb2RlcykgJiYgdmlld1JlZi5yb290Tm9kZXNbMF0pIHtcclxuICAgICAgZG9tRWxlbSA9IHZpZXdSZWYucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGNvbXBvbmVudFJlZiwgZG9tRWxlbWVudDogZG9tRWxlbSB9O1xyXG4gIH1cclxuXHJcbiAgLy8gcmVmIGh0dHBzOi8vaGFja2Vybm9vbi5jb20vYW5ndWxhci1wcm8tdGlwLWhvdy10by1keW5hbWljYWxseS1jcmVhdGUtY29tcG9uZW50cy1pbi1ib2R5LWJhMjAwY2MyODllNlxyXG4gIGNyZWF0ZUFuZ3VsYXJDb21wb25lbnRBcHBlbmRUb0RvbShjb21wb25lbnQ6IGFueSwgdGFyZ2V0RWxlbWVudD86IEhUTUxFbGVtZW50IHwgRWxlbWVudCwgY2xlYXJUYXJnZXRDb250ZW50ID0gZmFsc2UpOiBBbmd1bGFyQ29tcG9uZW50T3V0cHV0IHtcclxuICAgIGNvbnN0IGNvbXBvbmVudE91dHB1dCA9IHRoaXMuY3JlYXRlQW5ndWxhckNvbXBvbmVudChjb21wb25lbnQpO1xyXG5cclxuICAgIC8vIEFwcGVuZCBET00gZWxlbWVudCB0byB0aGUgSFRNTCBlbGVtZW50IHNwZWNpZmllZFxyXG4gICAgaWYgKHRhcmdldEVsZW1lbnQgJiYgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZCkge1xyXG4gICAgICBpZiAoY2xlYXJUYXJnZXRDb250ZW50ICYmIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgfVxyXG4gICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudE91dHB1dC5kb21FbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50T3V0cHV0LmRvbUVsZW1lbnQpOyAvLyB3aGVuIG5vIHRhcmdldCBwcm92aWRlZCwgd2UnbGwgc2ltcGx5IGFkZCBpdCB0byB0aGUgSFRNTCBCb2R5XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudE91dHB1dDtcclxuICB9XHJcbn1cclxuIl19