import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = sessionStorage.getItem('user') as string;
  }

}
