import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    data: any[] = [
        {outletName: 'NKKN', headcount: 15},
        {outletName: 'ĐBP', headcount: 20},
        {outletName: 'CMT8', headcount: 30},
        {outletName: 'LHP', headcount: 45},
        {outletName: 'TQT', headcount: 10},
        
    ];

    @ViewChild('barChart') private chartContainer: ElementRef;
    margin = { top: 20, right: 20, bottom: 30, left: 40 };

    constructor(
        element: ElementRef,
        protected commonService: CommonService
    ) {
        super(commonService);
    }

    ngOnInit() {
        this.createChart();
    }

    private createChart(): void {
        d3.select('svg').remove();
    
        const element = this.chartContainer.nativeElement;
        const data = this.data;
    
        const svg = d3.select(element).append('svg')
          .attr('width', element.offsetWidth)
          .attr('height', element.offsetHeight);
    
        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
    
        const x = d3
          .scaleBand()
          .rangeRound([0, contentWidth])
          .padding(0.1)
          .domain(data.map(d => d.outletName));
    
        const y = d3
          .scaleLinear()
          .rangeRound([contentHeight, 0])
          .domain([0, d3.max(data, d => d.headcount)]);
    
        const g = svg.append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
        g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + contentHeight + ')')
          .call(d3.axisBottom(x));
    
        g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y).ticks(10, '%'))
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Frequency');
    
        g.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.outletName))
          .attr('y', d => y(d.headcount))
          .attr('width', x.bandwidth())
          .attr('height', d => contentHeight - y(d.headcount));
      }

}