import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// esto es para poder hacer peticiones a una api y todo lo que se importe pues lo podemos utilizar (ve a gifs.service.ts para ver el constructor )
import { HttpClientModule } from '@angular/common/http';

import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    GifsModule,
    SharedModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
