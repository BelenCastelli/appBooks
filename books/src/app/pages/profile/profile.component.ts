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
  
   let putUser = new User(this.userService.user.id_user || null, 
      name || null, last_name || null, email || null, password || null)
      putUser.photo = photo || null
 
  this.userService.edit(putUser).subscribe((res:Respuesta) => {
    if(!res.error)
      this.toastr.success(res.mensaje)
    else 
      this.toastr.error('No se han podido modificar lo datos', 'ERROR')

  })

  }


}