import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProdutosComponent } from './produtos/produtos.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MenuUserComponent } from './menu-user/menu-user.component';


// Configuração para ngx-mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CadastroComponent,
    MenuComponent,
    RodapeComponent,
    ProdutosComponent,
    MenuUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
