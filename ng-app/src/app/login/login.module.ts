import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../core/shared/shared.module';
import { LoginComponent } from './login.component';
const routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}
