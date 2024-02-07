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
      // console.log(this.indice);
      this.eventoElimina.emit(this.idLibro)
      console.log(this.idLibro)
    }
}