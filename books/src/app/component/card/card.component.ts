import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Input() libroPadre: Book;
@Input() odd:boolean; 
@Input() idLibro:number

@Output() eventoElimina = new EventEmitter<number>();

  constructor(){

  }

    eliminarLibro(idLibro:number) {
      this.eventoElimina.emit(idLibro)
      console.log(this.idLibro)
      console.log(this.libroPadre.title);
      console.log(this.libroPadre.id_book);
      
      
    }
}