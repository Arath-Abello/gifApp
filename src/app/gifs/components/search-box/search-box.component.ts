import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar</h5>
  <!-- evento keyUp es cuando ya dejo de presionar la tecla y el valor se mandara cuando despues de escribir hayamos apretado la tecla enter por eso combinamos keyUp.enter -->
  <!-- #txtTagInput es una referencia local que solo funcionara en el html entonces #txtTagInput sera para referenciar al input y luego obtenemos el valor  -->
  <input type="text" class="form-control" placeholder="buscar gifs" (keyup.enter)="searchTag()" #txtTagInput>
  `
})

export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  // ElementRef quiere decir que es una referencia a un elemento.
  // HTMLInputElement el elemento referenciado es un input html
  // el signo de ! quiere decir que siempre tendra un valor. en este caso siempre tendra una referencia
  public tagInput!: ElementRef<HTMLInputElement>;

  // creamos un variable y llamamos al servicio
  constructor(private gifsService: GifsService) { }

  searchTag():void{
    // obtenemos el valor del elemento nativo de la variable tagInput y lo guardamos en la variable newTag
    // luego se muestra en consola
    const newTag = this.tagInput.nativeElement.value;

    // accedemos a la variable que contiene el servicio y accedemos al metodo para darle la variable newTag como parametro
    this.gifsService.searhTag(newTag);

    // para que el input se vacie
    this.tagInput.nativeElement.value = '';
  }

}
