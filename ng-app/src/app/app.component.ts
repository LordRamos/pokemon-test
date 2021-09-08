import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeadToolbarService } from './core/services/head-toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isToolbarVisible$!: BehaviorSubject<boolean>;
  constructor(private headToolbarService: HeadToolbarService) {}
  ngOnInit(): void {
    this.isToolbarVisible$ = this.headToolbarService.visible;
  }
  title = 'ng-app';
}
