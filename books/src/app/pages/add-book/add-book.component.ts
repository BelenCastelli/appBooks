import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(public booksService:BooksService,
              public router: Router,
              private toastr: ToastrService){

  }

    anadirLibro(titulo:string, autor:string, precio:number,ref:number, foto: string){
      if (titulo && autor && precio && ref && foto){
      let book = new Book(titulo, autor, precio, foto, ref)

      this.booksService.add(book).subscribe((res:Respuesta) =>{
        if(res.error == false){
          this.toastr.success('Libro añadido correctamente', 'Éxito', {positionClass: 'toast-center-center',
                                                                          closeButton:true})
          this.router.navigate(['/books'])
        } else {
          this.toastr.error(`${res.mensaje}`, 'Error', {positionClass: 'toast-center-center',
                                                        closeButton:true})
        }
      })
    } else {
      this.toastr.error('Todos los campos son obligatorios', 'Error', 
                        {positionClass: 'toast-center-center',
                        closeButton:true})
    }
  }
}

