import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(public booksService:BooksService,
              public userService: UserService,
              public router: Router,
              private toastr: ToastrService){

  }

  anadirLibro(title:string, type:string, author:string, price:number, photo: string){
      console.log( this.userService.user.id_user);
      
      if (title && type && author && price && photo){
      let bookData:Book = new Book(title, type, author, price, photo)
      bookData.id_user = this.userService.user.id_user
      
      this.booksService.add(bookData).subscribe((res:Respuesta) =>{
        if(!res.error) {
          this.toastr.success(res.mensaje, 'Éxito')
          this.router.navigate(['/books'])
        } else {
          this.toastr.error(`${res.mensaje}`, 'Error')
        }
      })
    } else {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
    }
  }
}

