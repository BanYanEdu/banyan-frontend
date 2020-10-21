import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';

/* App Root */
import {AppComponent} from './app.component';

import {CoreService, SecurityService} from 'inet-core';
import {environment} from '../environments/environment';
import {
    BootstrapLayoutModule, CloudTranslateModule, DialogModule,
    WebsocketModule
} from 'inet-ui';
import {UnicornCommonModule} from './pages/layout/common/unicorn-common.module';
import {MenuComponent} from './pages/layout/menu/menu.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {CustomTranslateLoader} from "./i18n/custom-translate-loader";
import {NavbarComponent} from "./pages/layout/navbar/navbar.component";
import {InboxModule} from "./pages/inbox/inbox.module";
import {RouteReuseStrategy} from "@angular/router";
import {CustomCacheRouteReuseStrategy} from "./pages/common/custom-route.strategy";
import {CalendarModule} from "inet-calendar";
import { SocialModule, SocialAppModule } from 'inet-social';
import {ChatMessageModule} from "inet-chat";
@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        NavbarComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CloudTranslateModule.forRoot({
            loader: CustomTranslateLoader
        }),
        UnicornCommonModule,
        BootstrapLayoutModule,
        WebsocketModule,
        BsDatepickerModule.forRoot(),
        InboxModule,
        CalendarModule,
        SocialModule,
        SocialAppModule,
        ChatMessageModule,
        DialogModule,

    ],
    providers: [{
        provide: RouteReuseStrategy,
        useClass: CustomCacheRouteReuseStrategy
    }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    constructor(
                private securityService: SecurityService,
                private coreService: CoreService) {
        this.coreService.setEnvironment(environment);
        // console.log('[unicorn][environment]', this.coreService.getEnvironment());
        if (this.coreService.getEnvironment().production) {
            setInterval(this.securityService.ping.bind(this), 2 * 60000);
        }

    }
}
