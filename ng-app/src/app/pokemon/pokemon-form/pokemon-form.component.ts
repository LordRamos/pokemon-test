import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, combineLatest, of, EMPTY } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon';
import { HeadToolbarService } from 'src/app/core/services/head-toolbar.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonFormComponent implements OnInit {
  pokemon!: Pokemon;
  userForm!: FormGroup;
  isEditMode!: boolean;
  formErrors = new Map([['required', 'Este campo es requerido']]);
  private _unsubscribeAll: Subject<any>;

  constructor(
    private pokemonService: PokemonService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private headToolbarService: HeadToolbarService
  ) {
    this._unsubscribeAll = new Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.headToolbarService.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    if (this.isEditMode) {
      this.pokemonService.get(id ? parseInt(id) : 0).subscribe(
        (p) => {
          this.pokemon = p;
          this.userForm = this.createUserForm();
        },
        (err) => {
          this.notificationService.showMessage(
            'Error al realizar la operación'
          );
        }
      );
    } else {
      this.userForm = this.createUserForm();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create product form
   *
   * @returns {FormGroup}
   */
  createUserForm(): FormGroup {
    return this.formBuilder.group({
      number: [this.pokemon?.number, Validators.required],
      name: [this.pokemon?.name, Validators.required],
      type1: [this.pokemon?.type1, Validators.required],
      type2: [this.pokemon?.type2],
      total: [this.pokemon?.total, Validators.required],
      hp: [this.pokemon?.hp, Validators.required],
      attack: [this.pokemon?.attack, Validators.required],
      defense: [this.pokemon?.defense, Validators.required],
      sp_atk: [this.pokemon?.sp_atk, Validators.required],
      sp_def: [this.pokemon?.sp_def, Validators.required],
      speed: [this.pokemon?.speed, Validators.required],
      generation: [this.pokemon?.generation, Validators.required],
      legendary: [this.pokemon?.legendary, Validators.required],
    });
  }

  save() {
    const { type2, ...rest } = this.userForm.getRawValue();
    let data = type2 ? { ...rest, type2 } : rest;
    debugger;
    let response$ = this.isEditMode
      ? this.pokemonService.update(this.pokemon.id, data)
      : this.pokemonService.add(data);
    response$.subscribe(
      (r) => {
        this.notificationService.showMessage(
          this.isEditMode
            ? 'Pokemon actualizado correctamente...'
            : 'Pokemon guardado correctamente...'
        );
        this.router.navigate(['/pokemon']);
      },
      (err) => {
        this.notificationService.showMessage(
          'Error al cargar datos de pokemon'
        );
      }
    );
  }

  getErrorMessage(fieldName: string) {
    const errors = this.userForm.get(fieldName)?.errors;
    let message = '';
    if (errors) {
      message = Object.keys(errors)
        .map((k) => this.formErrors.get(k))
        .toString();
    }
    return message?.toString();
  }
}
