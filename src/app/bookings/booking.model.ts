export class Booking{

    constructor(
        private id:string,
        private placeTitle:string,
        private placeId:string,
        private guestNumber:number,
        private userId:string,
        private availableFrom:Date,
        private availableTill:Date,
        private name:string
        ){

    }

    get getId(){
        return this.id;
    }
}