import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PokemonService } from '../../core/services/pokemon.service';
import { NotificationService } from '../../core/services/notification.service';
import { Pokemon } from '../../core/models/pokemon';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { HeadToolbarService } from 'src/app/core/services/head-toolbar.service';
@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  dataSource!: PokemonDataSource;
  displayedColumns = [
    'id',
    'number',
    'name',
    'type1',
    'type2',
    'total',
    'hp',
    'attack',
    'defense',
    'sp_atk',
    'sp_def',
    'speed',
    'generation',
    'legendary',
    'actions',
  ];
  filterControl = new FormControl();
  searchControl = new FormControl();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private pokemonService: PokemonService,
    private notificationService: NotificationService,
    private headToolbarService: HeadToolbarService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.headToolbarService.show();
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getAll().subscribe(
      (pokemon) => {
        this.dataSource = new PokemonDataSource(
          pokemon,
          this.paginator
          // this.sort
        );
      },
      (err) => {
        this.notificationService.showMessage(
          'Error al cargar lista de pokemon'
        );
      }
    );
  }
  /****** DELETE ITEM ******/
  delete(id: string): void {
    this.notificationService
      .showConfirmDialog('¿Esta seguro que desea eliminar este pokemon?')
      .subscribe((result) => {
        if (result) {
          this.pokemonService.delete(id).subscribe((e) => {
            this.notificationService.showMessage(
              'Pokemon eliminado correctamente...'
            );
            this.loadPokemon();
          });
        }
      });
  }

  search(event: any) {
    let value = event.target.value;
    let field = this.filterControl.value || 'name';
    console.log(field);
    this.pokemonService.getAll(field, value).subscribe(
      (pokemon) => {
        this.dataSource = new PokemonDataSource(pokemon, this.paginator);
      },
      (err) => {
        this.dataSource = new PokemonDataSource([], this.paginator);
        this.notificationService.showMessage('Busqueda inválida');
      }
    );
  }

  applyFilter() {
    let value = this.searchControl.value || '';
    this.search({ target: { value: value } });
  }
}

export class PokemonDataSource extends DataSource<Pokemon[]> {
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  constructor(private pokemon: Pokemon[], private _matPaginator: MatPaginator) {
    super();

    this.filteredData = this.pokemon;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    // tslint:disable-next-line: typedef
    const displayDataChanges = [this._matPaginator.page, this._filterChange];
    return merge(...displayDataChanges).pipe(
      map(() => {
        let data = this.pokemon.slice();
        this.filteredData = [...data];
        const startIndex =
          this._matPaginator.pageIndex * this._matPaginator.pageSize;
        return data.splice(startIndex, this._matPaginator.pageSize);
      })
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Disconnect
   */
  disconnect(): void {}
}
