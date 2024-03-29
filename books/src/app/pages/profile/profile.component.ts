import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';
import {User} from "src/app/models/user";
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user:User

  constructor(public userService: UserService,
              private toastr: ToastrService){
      this.user = userService.user
  }

  modificarDatos(name:string, last_name:string, email:string, password: string, photo:string){
  
   let putUser = new User(this.userService.user.id_user, 
      name || null, last_name || null, email || null, password || null)
      putUser.photo = photo || null
      
  this.userService.edit(putUser).subscribe((res:Respuesta) => {
    if(!res.error){
      this.userService.user.name = putUser.name || this.userService.user.name
      this.userService.user.last_name = putUser.last_name || this.userService.user.last_name
      this.userService.user.email = putUser.email || this.userService.user.email
      this.userService.user.password = putUser.password || this.userService.user.password
      this.userService.user.photo = putUser.photo || this.userService.user.photo
      
      this.toastr.success(res.mensaje)
  

    }else 
      this.toastr.error('No se han podido modificar los datos', 'ERROR')
  })

  }

}