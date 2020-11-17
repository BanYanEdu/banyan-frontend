import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap';

import {ComponentLoaderFactory, ModalModule, PositioningService} from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputCharacterMaskDirective } from '../../shared/directives/input-character-mask.directive';
// import { NumericSeparatorDirective } from '../../shared/directives/numeric-separator.directive';
import { NumericOnlyDirective } from '../../shared/directives/numeric-only.directive';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {CoreModule} from "inet-core";
import {AuthenticateGuard, CloudTranslateModule, InterceptorModule, GridModule, DialogModule} from 'inet-ui';
import {CustomTranslateLoader} from '../../i18n/custom-translate-loader';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
// import { MomentPipe } from "../../shared/pipes/moment/moment.pipe";
// import { ReversePipe } from "../../shared/pipes/reverse/reverse.pipe";
import { BsModalService } from 'ngx-bootstrap/modal';
// import { TreeviewModule } from 'ngx-treeview';
// import { DropdownTreeviewSelectModule } from "./dropdownTreeviewSelect/dropdown-treeview-select.module"
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
// import {NgxMaskModule} from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { OutletSelectorComponent } from './outlet-selector/outlet-selector.component';



@NgModule({
    imports: [
        // NgxMaskModule.forRoot(),
        CloudTranslateModule.forRoot({
            loader: CustomTranslateLoader
        }),
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RatingModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        GridModule,
        CoreModule,
        // TreeviewModule.forRoot(),
        // DropdownTreeviewSelectModule,
        DialogModule,
        RouterModule
    ],
    declarations: [ 
        // MomentPipe,
        // ReversePipe,
        InputCharacterMaskDirective,
        // NumericSeparatorDirective,
        NumericOnlyDirective,
        OutletSelectorComponent,
        // ProspectStatusSelectorComponent
    ],
    exports: [
        // NgxMaskModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,
        CloudTranslateModule,
        ModalModule,
        RouterModule,
        InterceptorModule,
        PopoverModule,
        TabsModule,
        BsDatepickerModule,
        // MomentPipe,
        // ReversePipe,
        InputCharacterMaskDirective,
        // NumericSeparatorDirective,
        NumericOnlyDirective,
        DialogModule,
        OutletSelectorComponent
    ],
    providers: [
        ComponentLoaderFactory,
        AuthenticateGuard,
        PositioningService,
        BsLocaleService,
        BsModalService,
        FocusService,
        CommonService
        // BsModalRef
    ]
})
export class AppCommonModule {
}
