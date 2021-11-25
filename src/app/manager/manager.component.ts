import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  loggedUserName: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loggedUserName=localStorage.getItem("username")
  }

  //Logout
  logout(){
    this.authService.logOut();
    this.router.navigateByUrl('login');
   }
}
