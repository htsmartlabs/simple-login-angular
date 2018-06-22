import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { Token } from '../token.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user:User;
  private ticket:Token;
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.reset();
  }
  checkUser(){
    this.userService.authUser(this.user).subscribe((data)=>{
      this.ticket = data as Token;
      if(this.ticket.status){
        this.ticket.token = 'Jwt '+this.ticket.token;
        localStorage.setItem('ticket',this.ticket.token);
        this.router.navigate(['/home']);
      }else{
        alert(this.ticket.msg);
      }
    },(error)=>{});
  }
  reset() {
    if (this.userService.user) {
      this.user = this.userService.user;
    } else {
      this.user = { email: '', password: ''};
    }
  }
}
