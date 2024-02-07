import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  public loginForm: FormGroup

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService)
    {
    this.buildForm()
}


private buildForm(){

  let minPassLength: number = 8
  
  this.loginForm = this.formBuilder.group({
  
  email:[,[Validators.email, Validators.required]],
  password: [,[Validators.required, Validators.minLength(minPassLength)]],
  
  });
}


public login(){
  
  if(!this.loginForm.invalid){
    const user = this.loginForm.value
    console.log(user);

    this.userService.login(user).subscribe((res:Respuesta) => {
      if(!res.error){
        this.userService.user = res.usuario;
        console.log(this.userService.user);
        
        this.userService.logueado = true
        console.log(this.userService.logueado);
        
        this.toastr.success(res.mensaje,'Exito')
        this.loginForm.reset();
        this.router.navigate(['/books'])
      } 
      else this.toastr.error(res.mensaje, 'Error')
    })

  } 
  else  this.toastr.error('No se ha podido iniciar sesión, faltan datos','Fallo');
  }

}
