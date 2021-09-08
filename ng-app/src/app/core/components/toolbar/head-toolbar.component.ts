import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'head-toolbar',
  templateUrl: './head-toolbar.component.html',
  styleUrls: ['./head-toolbar.component.scss'],
})
export class HeadToolbarComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
