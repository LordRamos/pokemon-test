import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { ConfirmDialogModule } from '../core/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [PokemonRoutingModule, SharedModule, ConfirmDialogModule],
  declarations: [PokemonListComponent, PokemonFormComponent],
  providers: [],
})
export class PokemonModule {}
