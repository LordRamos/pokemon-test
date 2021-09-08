import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HeadToolbarComponent } from './head-toolbar.component';

@NgModule({
  imports: [SharedModule],
  exports: [HeadToolbarComponent],
  declarations: [HeadToolbarComponent],
  providers: [],
})
export class HeadToolbarModule {}
