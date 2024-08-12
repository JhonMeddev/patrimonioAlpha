import { ProdutoResp } from '../model/ProdutoResp';
import { Produto } from '../model/CreateProduto';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { LoginAuth } from '../model/LoginAuth';

import { environment } from 'src/environments/environment.prod';
import { ListaProdutos } from '../model/ListaProdutos';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  login : Login = new Login();
  loginAuth: LoginAuth = new LoginAuth()
  listaPrudutos: ListaProdutos = new ListaProdutos();

  produto: ProdutoResp = new ProdutoResp();
  produtoId : string;
  produtoName: string;
  idProdutoApagado : number;

  postProduto: Produto = new Produto();

  constructor(
    public auth: AuthService,
    public produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(environment.token == ''){
      console.log("Desconectado");
    }

    this.auth.refreshToken();
    this.getProdutos();

  }

  getProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: ListaProdutos) => {
      this.listaPrudutos = resp;
    } )
  }

  getProdutoById(id : number){
    this.produtoService.getProdutoById(id).subscribe((resp: ProdutoResp) => {
      this.produto = resp;
    } )
  }

  postProduct() {
    this.produtoService.postProduto(this.postProduto).subscribe((resp: ListaProdutos) => {
      console.log('Produto salvo com sucesso:', resp);
      this.getProdutos();
      this.resetForm();
      $("#adicionarProdutoModal").modal('hide');
      this.showAlertSucess();
    }, error => {
      console.error('Erro ao salvar produto:', error);
      this.showAlertError();

    });
  }

  editarProduto(id : number ){
    this.getProdutoById(id);

    setTimeout(() => {
      if (this.produto.data.product.id != null) {
        console.log("Produto Resp : ")
        console.log(this.produto);
        $('#editarProdutoModal').modal('show');
      }
    }, 1000);
  }

  editarConfirm(id : number){

      const name = $("#editProdutoNome").val() as string;
      const description = $("#editProdutoDescricao").val() as string;
      const price = parseInt($("#editProdutoPreco").val() as string, 10);
      const stock = parseInt($("#editProdutoEstoque").val() as string, 10);

      console.log("novo preço : " + price)


      this.postProduto.name = name || this.postProduto.name;
      this.postProduto.description = description || this.postProduto.description;
      this.postProduto.price = !isNaN(price) ? price : this.postProduto.price;
      this.postProduto.stock = !isNaN(stock) ? stock : this.postProduto.stock;

    this.produtoService.editProduto(id, this.postProduto).subscribe((resp: ListaProdutos) => {
      console.log('Produto salvo com sucesso:', resp);
      this.getProdutos();
      this.resetForm();
      $("#editarProdutoModal").modal('hide');
      this.showAlertSucess();
    }, error => {
      console.error('Erro ao salvar produto:', error);
      this.showAlertError();

    });
  }

  verificarApagar(id : number){
    this.getProdutoById(id);
    const modalLabel = document.getElementById("apagarModalLabel");
    const modalBody = document.getElementById("apagarModalBody");

    setTimeout(() => {
      if (modalLabel && modalBody) {
        modalLabel.innerText = "Apagar Produto #" + this.produto.data.product.id + " ?";
        modalBody.innerText = this.produto.data.product.name;
        this.idProdutoApagado = this.produto.data.product.id;
        console.log("Produto Resp : ")
        console.log(this.produto);
      }
    }, 1000);

  }


  apagarProduto(id : number){
    setTimeout(() => {
      this.deletarProduto(id);
    }, 1000);

  }

  deletarProduto(id: number) {
    this.produtoService.deleteProdutoByid(id).subscribe({
      next: () => {
        console.log('Produto excluído com sucesso.');
        this.getProdutos();
        this.showAlertSucess();
      },
      error: (err) => {
        console.log('Erro ao excluir o produto: ' + err.message);
        this.showAlertError();

      }
    });
  }

  resetForm() {
    this.postProduto = new Produto();
  }

  showAlertError() {
    Swal.fire({
      title: 'Erro!',
      text: 'Verifique os campos e tente novamente !',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showAlertSucess() {
    Swal.fire({
      title: 'Sucesso!',
      text: 'sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }


}

