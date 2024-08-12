import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  {path:'', redirectTo:'inicio', pathMatch: 'full' },

  {path:'inicio', component: InicioComponent },
  {path:'cadastro', component: CadastroComponent },

  {path:'produtos', component: ProdutosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
