import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Token } from '../token.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  private name: string;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.reset();
  }
  registerUser(){
    if (this.user._id === undefined) {
      if (this.user.password === this.user.retypePassword) {
        this.userService.user = this.user;
        this.userService.addUser(this.user).subscribe((data) => {
          this.router.navigate(['/login']);
        },(error) => {});
      } else {
        alert('Password did not match');
      }
    } else {
      if (this.user.password === this.user.retypePassword) {
        this.userService.updateUser().subscribe((data) => {
          this.userService.ticket = data as Token;
          alert(this.userService.ticket.msg);
          this.router.navigate(['/home']);
        }, (error) => {});
      } else {
        alert('Password did not match');
      }
    }
  }
  reset() {
    if (this.userService.user) {
      this.user = this.userService.user;
      this.name = 'Update';
      this.user.password = '';
      this.user.retypePassword = '';
    } else {
      this.user = { email: '', password: '', retypePassword: ''};
      this.name = 'Register';
    }
  }
}
