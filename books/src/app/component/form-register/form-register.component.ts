import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  public registerForm: FormGroup

  constructor(public userService:UserService ,private formBuilder: FormBuilder,
              private router: Router,
              private toastr:ToastrService){
   this.buildForm()
  }

  private buildForm(){

    let minPassLength: number = 8

    this.registerForm = this.formBuilder.group({
      name: ['',Validators.required],
      last_name: ['', Validators.required],
      email:['',[Validators.email, Validators.required]],
      password: [null,[Validators.required, Validators.minLength(minPassLength)]],
      contraseña2: [null,[Validators.required, this.check]]
    });
  }

  private check(control:AbstractControl){
    let resultado = {noMatch: true}
      if(control.parent?.value.password == control.value){
        resultado = null
      } else {
        console.log('Contraseñas no coinciden');
        
      }

    return resultado
  }

  public register(){

    if(!this.registerForm.invalid){
      const user = this.registerForm.value
      this.userService.register(user).subscribe(
        (res: Respuesta) => {
          if(!res.error){
            this.registerForm.reset();
            this.toastr.success(res.mensaje, 'Exito');
            this.router.navigate(['/login']);
          } 
          else this.toastr.error(res.mensaje, 'Error')
          
        }
      );
    } else  {
      this.toastr.error('Registro fallido, faltan datos', 'Fallo');
    }
  }

}
