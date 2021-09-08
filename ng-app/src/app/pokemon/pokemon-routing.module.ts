import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PokemonListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: PokemonFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/edit',
        component: PokemonFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
