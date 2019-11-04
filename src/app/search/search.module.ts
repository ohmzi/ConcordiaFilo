import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPage } from './search.page';
import { StoreModule } from '../store/store.module';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
