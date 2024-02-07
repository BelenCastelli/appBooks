import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books:Book[] 
  booksFilter: Book[] | undefined
  buscarLibro:boolean = false

  constructor(public booksService:BooksService,
              private toastr:ToastrService){}

  getAll(){
    this.booksFilter = undefined
    this.booksService.getAll().subscribe((res:Respuesta) =>{
      if(!res.error){
        this.books = res.data
        console.log(res.data);
        
      } else {
        this.toastr.error('No se han encontrado libros', 'Error')
      }
    })
  }
  ngOnInit(): void {
    this.getAll()
  }
  
  buscar(id_book:number){
  this.booksService.getOne(id_book).subscribe((res: Respuesta) => {
    if(!res.error){
      this.books = res.data
    } else {
      this.toastr.error('No se ha encontrado el libro', 
                        'Error', {positionClass: 'toast-center-center',
                                 closeButton: true})
      this.getAll()
      }
    })
  }

  // * Creando otra variable para almacenar el libro filtrado
  // buscar(id_book:number){

  //   this.booksService.getOne(id_book).subscribe((res: Respuesta) => {

  //     if(res.error == false){
  //       this.booksFilter = res.data
  //       console.log(this.booksFilter);
  //     } else {
  //       this.toastr.error('No se ha encontrado el libro', 
  //                         'Error', {positionClass: 'toast-center-center',
  //                                  closeButton: true})
  //       this.getAll()
  //     }
  //   })
  // }

  eliminaLibro(id_book:number){
    console.log(id_book);
    this.booksService.delete(id_book).subscribe((res:Respuesta) =>{
      if(!res.error){
        this.booksFilter = undefined
        this.books = res.data
        this.toastr.success('Libro eliminado correctamente',
                             'Éxito', {positionClass: 'toast-center-center',
                                      closeButton:true})
      } else {
        this.toastr.error(`${res.mensaje}`, 'Error',
                          {positionClass: 'toast-center-center',
                          closeButton:true})
      }
    })
  }
  
}

