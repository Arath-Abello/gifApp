import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
// onInit es para el ciclo de vida de un componente. por lo que entiendo si una variable o metodo no se ejecuta entonces mostrará un mensaje de error
export class CardComponent implements OnInit {

  @Input()
  // el interrogacion quiere decir que siempre tendrá un valor
  public gif!: Gif;


  // para ocupar OnInit se necesita hacer el codigo predeterminado de onInit. Tienes que combinar las teclas control + punto encima del nombre del componente
  ngOnInit(): void {
    // si el valor de la variable gif es undefined entonces que entregue un mensaje de error
   if(!this.gif) throw new Error('gif property is required.');

  }

}
