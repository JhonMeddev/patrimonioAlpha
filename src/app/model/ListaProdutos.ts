import { Produto } from './CreateProduto';
export class ListaProdutos {
  public success: boolean;
  public message: string;
  public data: Produtos;
}

export class Produtos {
  public products: Produto[];
}
