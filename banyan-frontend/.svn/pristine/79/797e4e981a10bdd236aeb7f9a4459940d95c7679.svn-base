import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InboxComponent} from "./pages/inbox/inbox.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: InboxComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
