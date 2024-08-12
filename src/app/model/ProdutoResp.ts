
import { Produto } from './CreateProduto';
export class ProdutoResp {
  public success: boolean;
  public message: string;
  public data: ProdutoR;
}

export class ProdutoR {
  public product: Produto;
}

