import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletListComponent } from './outlet/outlet-list.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SettingsHomeComponent },
    { path: 'outlet', component: OutletListComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}