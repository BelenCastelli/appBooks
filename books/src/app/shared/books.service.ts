import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BooksService {


  private url:string;
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/books"
  }

  public getAll(id_user:number):Observable<object>{
    return this.http.get(this.url + '/' + id_user);
  }

  public getOne(id_user:number, id_book:number): Observable<Object>{
    return this.http.get(this.url + '/' + id_user + '/' + id_book) 
  }

  public add(bookData:Book): Observable<object>{
    return this.http.post(this.url, bookData );
  }

  public edit(bookData: object): Observable<object>{
  return this.http.put(this.url, bookData)
  }

  public delete(id_book:number): Observable<object>{
    return this.http.delete(this.url, {body: {id_book: id_book}})
  }
}