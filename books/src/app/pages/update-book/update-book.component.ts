import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  constructor(public booksService: BooksService,
              public userService: UserService,
              public router: Router,
              private toastr: ToastrService){
  }

  modificarLibro(id_book: number, title:string, type:string, author:string, price:number, photo: string){
    
    if (id_book && title && type && author && price && photo){

      let bookData = {
                      title: title,
                      type: type,
                      author: author,
                      price: price,
                      photo: photo,
                      id_book : id_book,
                      id_user: this.userService.user.id_user}

      this.booksService.edit(bookData).subscribe((res:Respuesta) => {
        if(res.error == false){
          this.toastr.success(res.mensaje, 'Éxito')
          this.router.navigate(['/books'])
        } else {
          this.toastr.error(res.mensaje, 'Error')
        }
      })
    } else {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
    }
}}
