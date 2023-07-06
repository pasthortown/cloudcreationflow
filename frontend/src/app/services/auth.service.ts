import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  ldap_auth(email: string, password: string): Promise<any> {
    const data = {email: email + '@kfc.com.ec', password: password};
    return this.http.post(environment.api_auth + 'ldap_auth', JSON.stringify(data)).toPromise();
  }
}
