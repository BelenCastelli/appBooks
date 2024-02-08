import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books:Book[];
  booksFilter: Book[] | undefined

  constructor(public booksService:BooksService,
              public userService: UserService,
              private toastr:ToastrService){}

  getAll(){
    this.booksFilter = undefined
    this.booksService.getAll(this.userService.user.id_user).subscribe((res:Respuesta) =>{
      if(!res.error){
        // los datos estaban anidados y accediendo de [0] daba error.
        // aplana el resultado en una nueva matriz
        this.books = res.data.flatMap(item => item);
      } else {
        this.toastr.error('No se han encontrado libros', 'Error')
      }
    })
  }
  ngOnInit(): void {
    this.getAll()
  }
  
  buscar(id_book:number){
  this.booksService.getOne(this.userService.user.id_user,id_book).subscribe((res: Respuesta) => {
    if(!res.error){
      this.books = res.data.flatMap(item => item);
    } else {
      this.toastr.error('No se ha encontrado el libro', 'Error')
      this.getAll()
      }
    })
  }

  eliminaLibro(id_book:number){
    console.log(id_book);
    this.booksService.delete(id_book).subscribe((res:Respuesta) =>{
      if(!res.error){
        this.booksFilter = undefined
         this.getAll()
        this.toastr.success('Libro eliminado correctamente','Éxito')
      } else {
        this.toastr.error(`${res.mensaje}`, 'Error')
      }
    })
  }
  
}

