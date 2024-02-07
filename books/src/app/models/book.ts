export class Book {

    public title: string;
    public type: string;
    public author: string;
    public price: number;
    public photo: string; 
    public id_book:number;
    public id_user:number;

    constructor(title:string, author:string, price:number, photo:string, id_book?:number, id_user?:number){
        this.title = title;
        this.author = author;
        this.price = price;
        this.photo = photo;
        this.id_book = id_book || 0;
        this.id_user = id_user || 0;
    }
}

