import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    
    constructor(public userService: UserService,
                public router: Router,
                private toastr: ToastrService){
    }

  cerrarSesion(){
    this.userService.logueado = false
    this.toastr.info('Has cerrado Sesión')
    this.router.navigate(['/home'])
  }

}
