import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemsComponent } from './list-items/list-items.component';
import { ShowItemComponent } from './show-item/show-item.component';

const routes: Routes = [
  {
    path: '',
    component: ListItemsComponent,
  },
  {
    path: ':id',
    component: ShowItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
