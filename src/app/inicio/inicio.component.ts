import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Login } from './../model/Login';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/CreateProduto';
import { LoginAuth } from '../model/LoginAuth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  login : Login = new Login();
  loginAuth: LoginAuth = new LoginAuth()
  listaPrudutos : Produto[];

  constructor(
    public auth: AuthService,
    public produtos: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  entrar(){
    this.auth.entrar(this.login).subscribe({
      next: (resp: LoginAuth)=>{

        this.loginAuth = resp;
        environment.token = resp.data.token;

        this.router.navigate(['/produtos'])
        this.ngOnInit();
      },
      error: erro => {
      if(erro.status == 500){
        //this.alerts.showAlertDanger('Usuário ou senha estão incorretos')
        //console.log(this.userLogin)
      }
      if(erro.status == 401){
        //this.alerts.showAlertDanger('Usuário ou senha estão incorretos')
      }
    },
    });
  }

}

