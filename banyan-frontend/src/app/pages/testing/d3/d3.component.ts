import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/services/common.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import * as d3 from 'd3';

@Component({
    selector: 'app-testing-d3',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.scss']
})
export class D3Component extends BaseComponent implements OnInit {
    title = 'app';


  radius = 10;

    constructor(
        element: ElementRef,
        protected commonService: CommonService
    ) {
        super(commonService);
    }

    ngOnInit() {

    }

    clicked(event: any) {
        d3.select(event.target).append('circle')
            .attr('cx', event.x)
            .attr('cy', event.y)
            .attr('r', () => {
                return this.radius;
            })
            .attr('fill', 'blue');
    }
}