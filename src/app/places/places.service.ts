import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
private _places:Place[]=[
new Place('P1','Ganesh Heritage','Prime location','https://teja10.kuikr.com///r1/20160627/ak_865_1100151679-1467045517_700x700.jpeg',1000.00),
new Place('P2','Kalewadi house','Near Amenties location','https://scontent.fpnq2-1.fna.fbcdn.net/v/t1.0-9/39252976_2293055027387992_2293250233821298688_n.jpg?_nc_cat=101&_nc_sid=6e5ad9&_nc_oc=AQnIHq_J5Y_6VGliai3DA4TaF7pLwRT8IQqZ2zXHZrvSbe1eiTtK2QUQ0BYYZABa2Zs&_nc_ht=scontent.fpnq2-1.fna&oh=fcbe49bada408fcf8ce6cda01cdd1ee9&oe=5ED8582D',2000.00),
new Place('P3','Kavalam  mansion','Near lake location','https://www.malayalivartha.com/assets/coverphotos/w657/153008_1577532662.jpg',500.00)

];
get places(){
  return [...this._places];
}
  constructor() { }

  getPlaces(id:string){
    return {...this._places.find(p=>p.id===id)};
  }
}
