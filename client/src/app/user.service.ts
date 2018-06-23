import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
import { Token } from './token.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  ticket:Token;
  readonly URL = 'http://www.createhybrid.com:3000/user';
  private header: HttpHeaders;

  constructor(private http:HttpClient) { }

  getUser(){
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('ticket'));
    return this.http.get(this.URL,{headers:this.header});
  }
  addUser(user: User){
    return this.http.post(this.URL,user);
  }
  authUser(user: User){
    return this.http.post(this.URL+'/login',user);
  }
  updateUser(){
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('ticket'));
    return this.http.put(this.URL+'/'+this.user._id,this.user,{headers:this.header});
  }
  deleteUser(){
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('ticket'));
    return this.http.delete(this.URL+'/'+this.user._id,{headers:this.header});
  }
}
