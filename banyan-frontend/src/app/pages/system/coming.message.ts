import { Component, OnInit } from '@angular/core';
import { CoreService } from 'inet-core';
import { CloudTranslateService } from 'inet-ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coming-message',
  templateUrl: './coming.message.html'
})
export class ComingMessageComponent implements OnInit {

  constructor(
    protected coreService: CoreService,
    protected cloudTranslateService: CloudTranslateService,
    protected translate: TranslateService
  ) {}

  ngOnInit() {

    // console.log(iNet);
    // console.log(this.translateService.getCurrentLang());
  }
}