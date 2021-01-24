import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3Component } from './d3/d3.component';

const routes: Routes = [
    { path: '', redirectTo: 'd3', pathMatch: 'full' },
    { path: 'd3', component: D3Component },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestingRoutingModule {
}