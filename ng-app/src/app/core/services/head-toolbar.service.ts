import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeadToolbarService {
  visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}
  show() {
    setTimeout(() => {
      this.visible.next(true);
    });
  }
  hide() {
    setTimeout(() => {
      this.visible.next(false);
    });
  }
}
