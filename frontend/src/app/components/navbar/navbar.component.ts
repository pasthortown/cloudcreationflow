import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input('user') user: string = '';

  constructor(private router: Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
