import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3Component } from './d3/d3.component';
import { SlickgridComponent } from './slickgrid/slickgrid.component';
import { TestingHomeComponent } from './testing-home/testing-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TestingHomeComponent },
    { path: 'd3', component: D3Component },
    { path: 'slickgrid', component: SlickgridComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestingRoutingModule {
}