import { Component } from '@angular/core';
import {User} from "src/app/models/user";
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


 public user:User
 public isHidden:boolean
 public isHidden2: boolean
 public color: string
 
  constructor(public userService: UserService){
    this.user = userService.user
    this.isHidden = true;
    this.isHidden2 = true
    this.color;
  }


// *NOTE - NECESITO EN EL BACK UN PUT
  modificarDatos(newName:string, newLastaName:string, newEmail:string,newPhoto:string){

    this.user.name = newName === "" ?  this.user.name : newName;

    this.user.last_name = newLastaName == "" ? this.user.last_name : newLastaName;
 
    this.user.email = newEmail == "" ? this.user.email : newEmail;
  
    this.user.photo = newPhoto == "" ? this.user.photo : newPhoto;

    if(newName == "" && newLastaName == "" && newEmail == "" && newPhoto ==""){
      this.isHidden2 = false;
      this.isHidden = true;
      this.color = "rojo"
    } else
    {
      this.isHidden = false;
      this.isHidden2 = true
      this.color = "verde"
    }

    // Simplificado
    
    // modificarDatos(newName: string, newLastaName: string, newEmail: string, newPhoto: string) {
    //   this.user.name = newName || this.user.name;
    //   this.user.last_name = newLastaName || this.user.last_name;
    //   this.user.email = newEmail || this.user.email;
    //   this.user.photo = newPhoto || this.user.photo;
    
    //   if (!newName && !newLastaName && !newEmail && !newPhoto) {
    //     this.isHidden2 = false;
    //     this.isHidden = true;
    //     this.color = "rojo";
    //   } else {
    //     this.isHidden = false;
    //     this.isHidden2 = true;
    //     this.color = "verde";
    //   }
    // }

  }


}