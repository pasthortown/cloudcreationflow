import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-left-section',
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.scss']
})
export class LeftSectionComponent implements OnInit{

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    sessionStorage.clear();
    this.activateRoute.queryParams
      .subscribe(params => {
        sessionStorage.setItem('params', JSON.stringify(params));
      }
    );
  }

  login() {
    sessionStorage.setItem('user', 'luis.salazar@kfc.com.ec');
    this.router.navigate(['/main']);
  }
}
