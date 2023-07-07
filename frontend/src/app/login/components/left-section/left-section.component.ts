import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-left-section',
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.scss']
})
export class LeftSectionComponent implements OnInit{

  email: string = '';
  password: string = '';

  constructor(private router: Router, private activateRoute: ActivatedRoute, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    sessionStorage.clear();
    this.activateRoute.queryParams
      .subscribe(params => {
        sessionStorage.setItem('params', JSON.stringify(params));
      }
    );
  }

  login() {
    this.authService.ldap_auth(this.email, this.password).then((r: any) => {
      if (r.response == 'Usuario Autorizado') {
        sessionStorage.setItem('user', r.userdata);
        sessionStorage.setItem('token', r.token);
        this.toastr.success('Usuario Autorizado');
        this.router.navigate(['/main']);
      } else {
        this.email = '';
        this.password = '';
        this.toastr.error('Credenciales Incorrectos');
      }
    }).catch( e => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
