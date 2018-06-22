import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { Token } from '../token.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private users:User[];
  private ticket;
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getUser().subscribe(data=>{
      this.users = data as User[];
    },error=>{});
  }

  updateUser(user){
    this.userService.user = user;
    this.router.navigate(['/register']);
  }

  deleteUser(user){
    this.userService.user = user;
    this.userService.deleteUser().subscribe(data =>{
      this.ticket = data as Token;
      alert(this.ticket.msg);
      this.getAllUsers();
    },error=>{});
  }

}
