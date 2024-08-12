import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Login } from '../model/Login';
import { CreateUser } from '../model/CreateUser';
import { LoginAuth } from '../model/LoginAuth';
import { ListaProdutos } from '../model/ListaProdutos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${environment.token}`)
    }
  }

  entrar(login : Login): Observable<LoginAuth>{
    return this.http.post<LoginAuth>('https://interview.t-alpha.com.br/api/auth/login', login)
  }

  cadastrar(createUser : CreateUser): Observable<ListaProdutos>{
    return this.http.post<ListaProdutos>('https://interview.t-alpha.com.br/api/auth/register', createUser)
  }

  logado(){
    let ok: boolean = false;
    if(environment.token != '') {
      ok = true;
    }
    return ok
  }
}
