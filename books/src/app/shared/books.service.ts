import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private books: Book[] = [
    new Book ("1984", "George Orwell", 8.50, "https://imagessl4.casadellibro.com/a/l/s7/44/9788499890944.webp",100),
      new Book("Un mundo feliz", "Aldous Huxley", 10.40, "https://imagessl7.casadellibro.com/a/l/s7/57/9788497594257.webp",101),
      new Book ("Fahrenheit 451", "Ray Bradbury", 10.40, "https://imagessl8.casadellibro.com/a/l/s7/08/9788466345408.webp",102),
      new Book ("Orgullo y prejuicio", "Jane Austen", 11.95, "https://imagessl2.casadellibro.com/a/l/s7/42/9788467045642.webp",103),

  ]
  private url = "http://localhost:3000/books"
  constructor(private http: HttpClient) { 
  }

  public getAll():Observable<object>{
    return this.http.get(this.url);
  }

  public getOne(id_book:number): Observable<Object>{
    return this.http.get(this.url + "/" + id_book) 
  }

  public add(book:Book): Observable<object>{
    return this.http.post(this.url, book)

  }

  public edit(book: Book): Observable<object>{
  return this.http.put(this.url, book)

  }

  public delete(id_book:number): Observable<object>{
 
    return this.http.delete(this.url, {body: {id_book: id_book}})
  }
}