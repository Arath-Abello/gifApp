import { Injectable } from '@angular/core';
// httpParams es para poder ordenar la peticion ya que el link es muy largo
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  // almacenar todo lo que la persona busca como un array de string
  private _tagsHistory: string[] = [];

  // api de gifs
  private apiKey: string = 'C3YR9ONhjAiE8utrdrPOnwfPzcrcJ3zx';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private oranizeHistory(tag: string){
    tag = tag.toLowerCase();

    // si el tag ya existe en la busqueda entonces que elimine el antiguo
    if(this.tagsHistory.includes(tag)){
      this._tagsHistory = this.tagsHistory.filter((oldTag)=>oldTag !== tag)
    }

    // y el existente lo ponga de los primeros de la lista
    this._tagsHistory.unshift(tag);

    //lo limitamos a 10 busquedas solamente
    this._tagsHistory = this.tagsHistory.splice(0, 10);

    // llamamos el local storage
    this.saveLocalStorage();
  }

  // funcion privada que no regresara nada
  private saveLocalStorage(): void{
    // local storage para que al momento de recargar la página no me borre los gifs buscados
    // .setItem para insertar un nuevo item llamado history y tendrá como valor el historial de lo que el usaurio busca
    // saldra error con esto entonces el objeto lo convertiremos a un objeto json de tipo string
    // localStorage.setItem('history', this.tagsHistory)
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));

  }

  // obtener el valor y cargar localstorage
  private loadLocalStorage(): void{
    // si no hay datos entonces que no devuelva nada
    if(!localStorage.getItem('history')) return;

    // el objeto convertido antes en un objeto de strings ahora recuperamos su tipo de dato original
    // nos marcara un error pero ponemos el signo de ! para decir que siempre vendra un dato
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // si no hay datos en tagHistory pues que no devuelva nada
    if(this.tagsHistory.length === 0) return;

    // pero si hay mas de un elemento entonces buscamos el primer elemento posicionado en el indice 0
    this.searhTag(this.tagsHistory[0]);


  }

  searhTag(tag: string):void{

    // si la longitud de las palabras es igual a cero entonces que no devuelva nada y no se muestre nada en el sidebar
    if(tag.length === 0) return;

    this.oranizeHistory(tag);
    /* esto se ve mejor facil, pero más abajo hay otra forma
    //* peticion a la api mediante get con angular
    //* this.http para usar el httpClient y ponemos el link que modificamos en postman
    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=C3YR9ONhjAiE8utrdrPOnwfPzcrcJ3zx&q=valorant&limit=10')
    //* para escuchar y recibir la respuesta subscribe es un observable para que lo leas en el pdf
    .subscribe(resp => {
      console.log(resp);
    })*/

    // segunda forma
    const params = new HttpParams()
    //
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    // el tipo de dato generico que tendra será los que hemos especificado en la interfaz
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(respuesta => {
      this.gifList = respuesta.data;
      console.log({gifs: this.gifList});
    })

  }

}
