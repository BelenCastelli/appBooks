import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url: string;
    public user: User;
    public logueado: boolean = false;
    
    constructor(private http: HttpClient) {
   }

  register(user:User):Observable<Object>{
    this.url = "http://localhost:3000/register"
    return this.http.post(this.url, user)
  }

  login(user:User):Observable<object>{
    this.url = "http://localhost:3000/login"
    return this.http.post(this.url, user)
  }

  edit(usuario:User):Observable<object>{
    this.url = "http://localhost:3000/usuarios"
    console.log(usuario);
    
    return this.http.put(this.url, usuario)
  }
}
