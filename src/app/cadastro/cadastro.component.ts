import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CreateUser } from './../model/CreateUser';
import { Component, OnInit } from '@angular/core';
import { ListaProdutos } from '../model/ListaProdutos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  newUser : CreateUser = new CreateUser();

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser(){
    this.auth.cadastrar(this.newUser).subscribe((resp: ListaProdutos) => {
      console.log('Usuario criado:');
      console.log(resp);
      this.showAlertSucess();
      this.router.navigate(['/inicio'])
    }, error => {
      console.log('Erro ao criar usuario:', error);
      this.showAlertError(error.error.message);
    })


  }

  showAlertError(err : string) {
    Swal.fire({
      title: 'Erro!',
      text: err,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showAlertSucess() {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Criado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

}
