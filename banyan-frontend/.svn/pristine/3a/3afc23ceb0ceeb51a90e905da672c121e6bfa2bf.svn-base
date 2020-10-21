/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ErrorMessage } from 'inet-core';
import { Subject } from 'rxjs/Rx';
import { OrganizationService } from '../organization.service';
import { LocationService } from "../../common/location.service";
import { Organization } from "../../model/organization";
import { DictionaryService } from "../../common/dictionary.service";
export class OrganizationGeneralInformationComponent {
    /**
     * @param {?} location
     * @param {?} orgService
     * @param {?} fb
     * @param {?} locationService
     * @param {?} dictionaryService
     * @param {?} translate
     */
    constructor(location, orgService, fb, locationService, dictionaryService, translate) {
        this.location = location;
        this.orgService = orgService;
        this.fb = fb;
        this.locationService = locationService;
        this.dictionaryService = dictionaryService;
        this.translate = translate;
        this.orgInfo = new Organization();
        this.editable = false;
        this.langs = [];
        this.countries = [];
        this.provinces = [];
        this.districts = [];
        this.companySizeCodes = [];
        this.industries = [];
        this.countryCode = 'VN';
        this.onValidate = new EventEmitter();
        this.formChanged = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.langs = this.translate.getLangs(); // Languages
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.onValidate.emit(v);
        }));
        this.orgInfoForm = this.fb.group({
            name: [null, Validators.required],
            primaryEmail: [null, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')],
            address: [null, null],
            primaryPhone: [null, null],
            foreignName: [null, null],
            abbreviationName: [null, null],
            legalRepName: [null, null],
            taxCode: [null, Validators.required],
            industry: [null, null],
            website: [null, null],
            description: [null, null],
            companySize: [null, null],
            country: [null, null],
            street: [null, null],
            district: [null, null],
            province: [null, null]
        });
        this.orgInfoForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.formChanged.next(this.orgInfoForm.valid);
        }));
        this.loadAddress();
        // this.loadDictionary();
        this.setData(this.orgInfo);
    }
    /**
     * @param {?} org
     * @return {?}
     */
    setData(org) {
        /** @type {?} */
        const controls = this.orgInfoForm.controls;
        controls['name'].setValue(org.name);
        controls['foreignName'].setValue(org.foreignName);
        controls['abbreviationName'].setValue(org.abbreviationName);
        controls['industry'].setValue(org.industry);
        controls['legalRepName'].setValue(org.legalRepName);
        controls['companySize'].setValue(org.companySize);
        controls['taxCode'].setValue(org.taxCode);
        controls['address'].setValue(org.address);
        controls['primaryPhone'].setValue(org.primaryPhone);
        controls['primaryEmail'].setValue(org.primaryEmail);
        controls['website'].setValue(org.website);
        controls['description'].setValue(org.description);
        controls['street'].setValue(org.officeAddress.address);
        controls['country'].setValue(org.officeAddress.countryCode);
        controls['province'].setValue(org.officeAddress.provinceCode);
        controls['district'].setValue(org.officeAddress.districtCode);
        if (this.editable) {
            this.orgInfoForm.enable();
        }
        else {
            this.orgInfoForm.disable();
        }
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const controls = this.orgInfoForm.controls;
        /** @type {?} */
        const data = {
            name: controls['name'].value,
            foreignName: controls['foreignName'].value,
            abbreviationName: controls['abbreviationName'].value,
            industry: controls['industry'].value,
            legalRepName: controls['legalRepName'].value,
            companySize: controls['companySize'].value,
            taxCode: controls['taxCode'].value,
            address: controls['address'].value,
            primaryPhone: controls['primaryPhone'].value,
            primaryEmail: controls['primaryEmail'].value,
            website: controls['website'].value,
            description: controls['description'].value,
        };
        if (controls['street'].value) {
            this.orgInfo.officeAddress.address = controls['street'].value;
        }
        if (controls['country'].value) {
            this.orgInfo.officeAddress.countryCode = controls['country'].value;
        }
        if (controls['province'].value) {
            this.orgInfo.officeAddress.provinceCode = controls['province'].value;
        }
        if (controls['district'].value) {
            this.orgInfo.officeAddress.districtCode = controls['district'].value;
        }
        return Object.assign({}, this.orgInfo, data);
    }
    /*
        private loadDictionary () {
            this.dictionaryService.findByKeys('INDUSTRY;COMPANY_SIZE').subscribe((response: any) => {
                if (ErrorMessage.TYPE !== response.type) {
                    //console.log('industry: ',response);
                    const {data} = response;
                    const {INDUSTRY, COMPANY_SIZE} = data;
                    this.industries = INDUSTRY;
                    this.companySizeCodes = COMPANY_SIZE;
                }
            });
        }
    
         */
    /**
     * @private
     * @return {?}
     */
    loadAddress() {
        this.locationService.listCountry().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.countries = data.items || [];
                if (this.orgInfo.officeAddress.countryCode) {
                    this.loadProvinceByCountryCode(this.orgInfo.officeAddress.countryCode);
                    if (this.orgInfo.officeAddress.provinceCode) {
                        this.loadDistrictByCode(this.orgInfo.officeAddress.countryCode, this.orgInfo.officeAddress.provinceCode);
                    }
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    loadProvinceByCountryCode(countryCode) {
        this.countryCode = countryCode;
        this.provinceCode = null;
        this.districts = [];
        this.locationService.getProvinceByCountryCode(countryCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.provinces = data.items || [];
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    loadDistrictByCode(countryCode, provinceCode) {
        this.provinceCode = provinceCode;
        this.locationService.getDistrictByCode(countryCode, provinceCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.districts = data.items || [];
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeCountry($event) {
        /** @type {?} */
        const target$ = $event.target;
        //const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadProvinceByCountryCode(target$.value);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeProvince($event) {
        /** @type {?} */
        const target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    }
}
OrganizationGeneralInformationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-organization-general-information',
                template: "<form [formGroup]=\"orgInfoForm\">\n    <div class=\"row mt-3\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.NAME' | translate}} <i class=\"required\"></i> :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['name']\" name=\"name\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched}\"\n                           type=\"text\" maxlength=\"256\" required/>\n                    <div *ngIf=\"orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.FOREIGN_NAME' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['foreignName']\" name=\"foreignName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"256\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.ABBREVIATION_NAME' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['abbreviationName']\" name=\"abbreviationName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.INDUSTRY' | translate}} :</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['industry']\" name=\"industry\"\n                           name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.LEGAL_REPRESENTATIVE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['legalRepName']\"  name=\"legalRepName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.COMPANY_SIZE' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['companySize']\" name=\"companySize\"\n                            name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.TAX_CODE' | translate}}  <i class=\"required\"></i>:</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['taxCode']\" name=\"taxCode\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                    <div *ngIf=\"orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.TAXCODE_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.BILLING_ADDRESS' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['address']\" name=\"address\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           autocomplete=\"off\" type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input name=\"street\" [formControl]=\"orgInfoForm.controls['street']\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['country']\" name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeCountry($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.countryCode ? orgInfo.officeAddress.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country['code']\" [attr.data-uuid]=\"country.uuid\">{{country.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['province']\" name=\"province\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeProvince($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.provinceCode ? orgInfo.officeAddress.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province['code']\" [attr.data-uuid]=\"province.uuid\">{{province.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['district']\" name=\"district\" class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.districtCode ? orgInfo.officeAddress.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district['code']\">{{district.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.PHONE' | translate}} :</label>\n                <div class=\"col-sm-3 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryPhone']\" name=\"primaryPhone\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"64\"/>\n                </div>\n\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-4 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryEmail']\" name=\"primaryEmail\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched}\"\n                           type=\"email\" maxlength=\"64\"/>\n                    <div *ngIf=\"orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.ORGANIZATION.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.WEBSITE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['website']\" name=\"website\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.DESCRIPTION' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <textarea [formControl]=\"orgInfoForm.controls['description']\" name=\"description\" style=\"resize: none\" rows=\"2\"\n                              class=\"form-control form-control-sm col-xs-12 col-sm-12\"></textarea>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
            }] }
];
/** @nocollapse */
OrganizationGeneralInformationComponent.ctorParameters = () => [
    { type: Location },
    { type: OrganizationService },
    { type: FormBuilder },
    { type: LocationService },
    { type: DictionaryService },
    { type: TranslateService }
];
OrganizationGeneralInformationComponent.propDecorators = {
    orgInfo: [{ type: Input }],
    editable: [{ type: Input }],
    onValidate: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfo;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.editable;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfoForm;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.link;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.langs;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.countries;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.provinces;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.districts;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.companySizeCodes;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.industries;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.countryCode;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.provinceCode;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.onValidate;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.locationService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.dictionaryService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxXQUFXLEVBQWEsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQWUsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLE1BQU0sT0FBTyx1Q0FBdUM7Ozs7Ozs7OztJQWtCaEQsWUFBb0IsUUFBa0IsRUFDbEIsVUFBK0IsRUFDL0IsRUFBZSxFQUNmLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxTQUEyQjtRQUwzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQXRCdEMsWUFBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLGFBQVEsR0FBSSxLQUFLLENBQUM7UUFHM0IsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFDMUIsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFFM0IscUJBQWdCLEdBQWUsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFakIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsZ0JBQVcsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQVEvRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFFcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQzdCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2pDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFDakcsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUNyQixZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzFCLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDekIsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzlCLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3JCLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDekIsV0FBVyxFQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDcEIsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUN0QixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQ3pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQWUsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUEsT0FBTyxDQUFDLEdBQWlCOztjQUNoQixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1FBQzFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFOUQsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7Ozs7SUFFRCxPQUFPOztjQUNHLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7O2NBQ3BDLElBQUksR0FBRztZQUNULElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSztZQUM1QixXQUFXLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUs7WUFDMUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSztZQUNwRCxRQUFRLEVBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUs7WUFDbkMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLO1lBQzVDLFdBQVcsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSztZQUMxQyxPQUFPLEVBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUs7WUFDbkMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLO1lBQ2xDLFlBQVksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSztZQUM1QyxZQUFZLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUs7WUFDNUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLO1lBQ2xDLFdBQVcsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSztTQUM3QztRQUNELElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNsRTtRQUNELElBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN0RTtRQUNELElBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN4RTtRQUNELElBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN4RTtRQUVELHlCQUFXLElBQUksQ0FBQyxPQUFPLEVBQUssSUFBSSxFQUFFO0lBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQk8sV0FBVztRQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsSUFBa0IsRUFBRSxFQUFFO1lBQ2hFLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUNsQyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2RSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTt3QkFDeEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDNUc7aUJBQ0o7YUFDSjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsV0FBbUI7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxJQUFrQixFQUFFLEVBQUU7WUFDeEYsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7YUFDckM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxXQUFtQixFQUFFLFlBQW9CO1FBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLElBQWtCLEVBQUUsRUFBRTtZQUMvRixJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzthQUNyQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsTUFBVzs7Y0FDakIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNO1FBQzdCLHFGQUFxRjtRQUNyRixJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsTUFBVzs7Y0FDbEIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNO1FBQzdCLHNGQUFzRjtRQUN0RixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBdkxKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCx3bFpBQWdFO2FBQ25FOzs7O1lBVk8sUUFBUTtZQUdSLG1CQUFtQjtZQUxuQixXQUFXO1lBTVgsZUFBZTtZQUVmLGlCQUFpQjtZQVBqQixnQkFBZ0I7OztzQkFjbkIsS0FBSzt1QkFDTCxLQUFLO3lCQWFMLE1BQU07Ozs7SUFkUCwwREFBb0Q7O0lBQ3BELDJEQUEyQjs7SUFDM0IsOERBQXVCOztJQUN2Qix1REFBYTs7SUFDYix3REFBMEI7O0lBQzFCLDREQUEyQjs7SUFDM0IsNERBQTJCOztJQUMzQiw0REFBMkI7O0lBRTNCLG1FQUFrQzs7SUFDbEMsNkRBQTRCOzs7OztJQUU1Qiw4REFBMkI7Ozs7O0lBQzNCLCtEQUE2Qjs7SUFDN0IsNkRBQTBDOzs7OztJQUMxQyw4REFBK0Q7Ozs7O0lBRW5ELDJEQUEwQjs7Ozs7SUFDMUIsNkRBQXVDOzs7OztJQUN2QyxxREFBdUI7Ozs7O0lBQ3ZCLGtFQUF3Qzs7Ozs7SUFDeEMsb0VBQTRDOzs7OztJQUM1Qyw0REFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIFJlc3BvbnNlRGF0YX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQge09yZ2FuaXphdGlvblNlcnZpY2V9IGZyb20gJy4uL29yZ2FuaXphdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7TG9jYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JnYW5pemF0aW9ufSBmcm9tIFwiLi4vLi4vbW9kZWwvb3JnYW5pemF0aW9uXCI7XG5pbXBvcnQge0RpY3Rpb25hcnlTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpY3Rpb25hcnkuc2VydmljZVwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmdhbml6YXRpb24tZ2VuZXJhbC1pbmZvcm1hdGlvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uR2VuZXJhbEluZm9ybWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBvcmdJbmZvOiBPcmdhbml6YXRpb24gPSBuZXcgT3JnYW5pemF0aW9uKCk7XG4gICAgQElucHV0KCkgZWRpdGFibGUgPSAgZmFsc2U7XG4gICAgb3JnSW5mb0Zvcm06IEZvcm1Hcm91cDtcbiAgICBsaW5rOiBzdHJpbmc7XG4gICAgbGFuZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjb3VudHJpZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcm92aW5jZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBkaXN0cmljdHM6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIGNvbXBhbnlTaXplQ29kZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBpbmR1c3RyaWVzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBwcml2YXRlIGNvdW50cnlDb2RlID0gJ1ZOJztcbiAgICBwcml2YXRlIHByb3ZpbmNlQ29kZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvblZhbGlkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHByaXZhdGUgZm9ybUNoYW5nZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvcmdTZXJ2aWNlOiBPcmdhbml6YXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbG9jYXRpb25TZXJ2aWNlOiBMb2NhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkaWN0aW9uYXJ5U2VydmljZTogRGljdGlvbmFyeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sYW5ncyA9IHRoaXMudHJhbnNsYXRlLmdldExhbmdzKCk7IC8vIExhbmd1YWdlc1xuXG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZWQuZGVib3VuY2VUaW1lKDI1MCkuZGlzdGluY3RVbnRpbENoYW5nZWQoKS5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGUuZW1pdCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcmdJbmZvRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgbmFtZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcHJpbWFyeUVtYWlsOiBbbnVsbCwgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeXFxcXHcrKFtcXFxcLi1dP1xcXFx3KykqQFxcXFx3KyhbXFxcXC4tXT9cXFxcdyspKihcXFxcLlxcXFx3ezIsM30pKyQnKV0sXG4gICAgICAgICAgICBhZGRyZXNzOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBwcmltYXJ5UGhvbmU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGZvcmVpZ25OYW1lOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBhYmJyZXZpYXRpb25OYW1lOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBsZWdhbFJlcE5hbWU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHRheENvZGU6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGluZHVzdHJ5OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICB3ZWJzaXRlOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgY29tcGFueVNpemU6ICBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBjb3VudHJ5OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBzdHJlZXQ6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGRpc3RyaWN0OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBwcm92aW5jZTogW251bGwsIG51bGxdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3JnSW5mb0Zvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodjogT3JnYW5pemF0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1DaGFuZ2VkLm5leHQodGhpcy5vcmdJbmZvRm9ybS52YWxpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZEFkZHJlc3MoKTtcbiAgICAgICAgLy8gdGhpcy5sb2FkRGljdGlvbmFyeSgpO1xuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5vcmdJbmZvKTtcbiAgICB9XG5cbiAgICAgc2V0RGF0YShvcmc6IE9yZ2FuaXphdGlvbil7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gdGhpcy5vcmdJbmZvRm9ybS5jb250cm9scztcbiAgICAgICAgY29udHJvbHNbJ25hbWUnXS5zZXRWYWx1ZShvcmcubmFtZSk7XG4gICAgICAgIGNvbnRyb2xzWydmb3JlaWduTmFtZSddLnNldFZhbHVlKG9yZy5mb3JlaWduTmFtZSk7XG4gICAgICAgIGNvbnRyb2xzWydhYmJyZXZpYXRpb25OYW1lJ10uc2V0VmFsdWUob3JnLmFiYnJldmlhdGlvbk5hbWUpO1xuICAgICAgICBjb250cm9sc1snaW5kdXN0cnknXS5zZXRWYWx1ZShvcmcuaW5kdXN0cnkpO1xuICAgICAgICBjb250cm9sc1snbGVnYWxSZXBOYW1lJ10uc2V0VmFsdWUob3JnLmxlZ2FsUmVwTmFtZSk7XG4gICAgICAgIGNvbnRyb2xzWydjb21wYW55U2l6ZSddLnNldFZhbHVlKG9yZy5jb21wYW55U2l6ZSk7XG4gICAgICAgIGNvbnRyb2xzWyd0YXhDb2RlJ10uc2V0VmFsdWUob3JnLnRheENvZGUpO1xuICAgICAgICBjb250cm9sc1snYWRkcmVzcyddLnNldFZhbHVlKG9yZy5hZGRyZXNzKTtcbiAgICAgICAgY29udHJvbHNbJ3ByaW1hcnlQaG9uZSddLnNldFZhbHVlKG9yZy5wcmltYXJ5UGhvbmUpO1xuICAgICAgICBjb250cm9sc1sncHJpbWFyeUVtYWlsJ10uc2V0VmFsdWUob3JnLnByaW1hcnlFbWFpbCk7XG4gICAgICAgIGNvbnRyb2xzWyd3ZWJzaXRlJ10uc2V0VmFsdWUob3JnLndlYnNpdGUpO1xuICAgICAgICBjb250cm9sc1snZGVzY3JpcHRpb24nXS5zZXRWYWx1ZShvcmcuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGNvbnRyb2xzWydzdHJlZXQnXS5zZXRWYWx1ZShvcmcub2ZmaWNlQWRkcmVzcy5hZGRyZXNzKTtcbiAgICAgICAgY29udHJvbHNbJ2NvdW50cnknXS5zZXRWYWx1ZShvcmcub2ZmaWNlQWRkcmVzcy5jb3VudHJ5Q29kZSk7XG4gICAgICAgIGNvbnRyb2xzWydwcm92aW5jZSddLnNldFZhbHVlKG9yZy5vZmZpY2VBZGRyZXNzLnByb3ZpbmNlQ29kZSk7XG4gICAgICAgIGNvbnRyb2xzWydkaXN0cmljdCddLnNldFZhbHVlKG9yZy5vZmZpY2VBZGRyZXNzLmRpc3RyaWN0Q29kZSk7XG5cbiAgICAgICAgaWYodGhpcy5lZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvRm9ybS5lbmFibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3JnSW5mb0Zvcm0uZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGF0YSgpOiBPcmdhbml6YXRpb24ge1xuICAgICAgICBjb25zdCBjb250cm9scyA9IHRoaXMub3JnSW5mb0Zvcm0uY29udHJvbHM7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBjb250cm9sc1snbmFtZSddLnZhbHVlLFxuICAgICAgICAgICAgZm9yZWlnbk5hbWU6IGNvbnRyb2xzWydmb3JlaWduTmFtZSddLnZhbHVlLFxuICAgICAgICAgICAgYWJicmV2aWF0aW9uTmFtZTogY29udHJvbHNbJ2FiYnJldmlhdGlvbk5hbWUnXS52YWx1ZSxcbiAgICAgICAgICAgIGluZHVzdHJ5OmNvbnRyb2xzWydpbmR1c3RyeSddLnZhbHVlLFxuICAgICAgICAgICAgbGVnYWxSZXBOYW1lOiBjb250cm9sc1snbGVnYWxSZXBOYW1lJ10udmFsdWUsXG4gICAgICAgICAgICBjb21wYW55U2l6ZTogY29udHJvbHNbJ2NvbXBhbnlTaXplJ10udmFsdWUsXG4gICAgICAgICAgICB0YXhDb2RlOiAgY29udHJvbHNbJ3RheENvZGUnXS52YWx1ZSxcbiAgICAgICAgICAgIGFkZHJlc3M6IGNvbnRyb2xzWydhZGRyZXNzJ10udmFsdWUsXG4gICAgICAgICAgICBwcmltYXJ5UGhvbmU6IGNvbnRyb2xzWydwcmltYXJ5UGhvbmUnXS52YWx1ZSxcbiAgICAgICAgICAgIHByaW1hcnlFbWFpbDogY29udHJvbHNbJ3ByaW1hcnlFbWFpbCddLnZhbHVlLFxuICAgICAgICAgICAgd2Vic2l0ZTogY29udHJvbHNbJ3dlYnNpdGUnXS52YWx1ZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjb250cm9sc1snZGVzY3JpcHRpb24nXS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYoY29udHJvbHNbJ3N0cmVldCddLnZhbHVlKXtcbiAgICAgICAgICAgIHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLmFkZHJlc3MgPSAgY29udHJvbHNbJ3N0cmVldCddLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbnRyb2xzWydjb3VudHJ5J10udmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLmNvdW50cnlDb2RlID0gY29udHJvbHNbJ2NvdW50cnknXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb250cm9sc1sncHJvdmluY2UnXS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MucHJvdmluY2VDb2RlID0gY29udHJvbHNbJ3Byb3ZpbmNlJ10udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udHJvbHNbJ2Rpc3RyaWN0J10udmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLmRpc3RyaWN0Q29kZSA9IGNvbnRyb2xzWydkaXN0cmljdCddLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsuLi50aGlzLm9yZ0luZm8sIC4uLmRhdGF9O1xuICAgIH1cbiAgICAvKlxuICAgIHByaXZhdGUgbG9hZERpY3Rpb25hcnkgKCkge1xuICAgICAgICB0aGlzLmRpY3Rpb25hcnlTZXJ2aWNlLmZpbmRCeUtleXMoJ0lORFVTVFJZO0NPTVBBTllfU0laRScpLnN1YnNjcmliZSgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSByZXNwb25zZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaW5kdXN0cnk6ICcscmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHtkYXRhfSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHtJTkRVU1RSWSwgQ09NUEFOWV9TSVpFfSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmR1c3RyaWVzID0gSU5EVVNUUlk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYW55U2l6ZUNvZGVzID0gQ09NUEFOWV9TSVpFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgKi9cblxuICAgIHByaXZhdGUgbG9hZEFkZHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmxpc3RDb3VudHJ5KCkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLmNvdW50cnlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFByb3ZpbmNlQnlDb3VudHJ5Q29kZSh0aGlzLm9yZ0luZm8ub2ZmaWNlQWRkcmVzcy5jb3VudHJ5Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLnByb3ZpbmNlQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGlzdHJpY3RCeUNvZGUodGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MuY291bnRyeUNvZGUsIHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLnByb3ZpbmNlQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZTtcbiAgICAgICAgdGhpcy5wcm92aW5jZUNvZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3RyaWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5nZXRQcm92aW5jZUJ5Q291bnRyeUNvZGUoY291bnRyeUNvZGUpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmluY2VzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGU6IHN0cmluZywgcHJvdmluY2VDb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wcm92aW5jZUNvZGUgPSBwcm92aW5jZUNvZGU7XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmdldERpc3RyaWN0QnlDb2RlKGNvdW50cnlDb2RlLCBwcm92aW5jZUNvZGUpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzdHJpY3RzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VDb3VudHJ5KCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCQgPSAkZXZlbnQudGFyZ2V0O1xuICAgICAgICAvL2NvbnN0IGNvdW50cnlJZCA9IHRhcmdldCQub3B0aW9uc1t0YXJnZXQkLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS11dWlkJyk7XG4gICAgICAgIHRoaXMubG9hZFByb3ZpbmNlQnlDb3VudHJ5Q29kZSh0YXJnZXQkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZVByb3ZpbmNlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCQgPSAkZXZlbnQudGFyZ2V0O1xuICAgICAgICAvLyBjb25zdCBjb3VudHJ5SWQgPSB0YXJnZXQkLm9wdGlvbnNbdGFyZ2V0JC5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcpO1xuICAgICAgICB0aGlzLmxvYWREaXN0cmljdEJ5Q29kZSh0aGlzLmNvdW50cnlDb2RlLCB0YXJnZXQkLnZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==