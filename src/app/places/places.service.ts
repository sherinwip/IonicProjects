import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import {take,map,tap,delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
private _places=new BehaviorSubject<Place[]>(
  [
    new Place('P1','Ganesh Heritage','Prime location','https://teja10.kuikr.com///r1/20160627/ak_865_1100151679-1467045517_700x700.jpeg',1000.00,
    new Date('2019-01-01'),
    new Date('2020-01-01'),'abc'),
    new Place('P2','Kalewadi house','Near Amenties location','https://scontent.fpnq2-1.fna.fbcdn.net/v/t1.0-9/39252976_2293055027387992_2293250233821298688_n.jpg?_nc_cat=101&_nc_sid=6e5ad9&_nc_oc=AQnIHq_J5Y_6VGliai3DA4TaF7pLwRT8IQqZ2zXHZrvSbe1eiTtK2QUQ0BYYZABa2Zs&_nc_ht=scontent.fpnq2-1.fna&oh=fcbe49bada408fcf8ce6cda01cdd1ee9&oe=5ED8582D',2000.00
    ,
    new Date('2019-01-01'),
    new Date('2020-01-01'),'xyz'),
    new Place('P3','Kavalam  mansion','Near lake location','https://www.malayalivartha.com/assets/coverphotos/w657/153008_1577532662.jpg',500.00,
    new Date('2019-01-01'),
    new Date('2020-01-01'),'abc'
    )
    
    ]

);
get places(){
  return this._places.asObservable();
}
  constructor(private authService:AuthService) { }

  getPlaces(id:string){
    return this.places.pipe(take(1),map(places => {
      return {...places.find(p=>p.id===id)};

    }));
  }

  addPlaces(title:string,description:string,price:number,dateFrom:Date,dateTo:Date){
    const newPlace = new Place(Math.random.toString(),title,description,'https://teja10.kuikr.com///r1/20160627/ak_865_1100151679-1467045517_700x700.jpeg',price,dateFrom,dateTo,this.authService.getUserId);
    return this.places.pipe(take(1),delay(1000),tap(places => {
      this._places.next(places.concat(newPlace));
      })
      );

  }

  updatePlace(placeId:string,title:string , description:string){
    return this.places.pipe(take(1),delay(1000),tap(places =>{
      const updatedPlaceIndex = places.findIndex(pl =>  pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.dateFrom,
        oldPlace.dateTo,
        oldPlace.userId
      );
      this._places.next(updatedPlaces);
    }));
  }
}
