import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../model/CreateProduto';
import { environment } from 'src/environments/environment.prod';
import { ListaProdutos } from '../model/ListaProdutos';
import { ProdutoResp } from '../model/ProdutoResp';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getAllProdutos() : Observable<ListaProdutos>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.get<ListaProdutos>("https://interview.t-alpha.com.br/api/products/get-all-products", { headers } );
  }

  getProdutoById(id : number): Observable<ProdutoResp>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.get<ProdutoResp>(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, { headers } );
  }

  deleteProdutoByid(id : number) :  Observable<void>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.delete<void>(`https://interview.t-alpha.com.br/api/products/delete-product/${id}`, { headers } );
  }

  postProduto(produto: Produto) : Observable<ListaProdutos>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.post<ListaProdutos>(`https://interview.t-alpha.com.br/api/products/create-product`, produto, { headers } );
  }

  editProduto(id: number, produto: Produto) : Observable<ListaProdutos>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.patch<ListaProdutos>(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, produto, { headers } );
  }
}
