import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  //Get an User by password
  getUserByPassword(user: User): Observable<any> {
    console.log(user.UserName);
    console.log(user.Userpassword);
    //https://localhost:44340/api/login/getuser/Sanjay/san@123
    return this.httpClient.get(environment.apiUrl + "/api/login/getuser/"
      + user.UserName + "/" + user.Userpassword);
  }

  //Authorize return token with roleId ans usernamwe
  public loginVerify(user: User) {
    // calling webservice url and passing username and password
    console.log("Attempt authenticate and authorize ::");
    console.log(user);
    return this.httpClient.get(environment.apiUrl + "/api/login/"+ user.UserName + "/" + user.Userpassword);
    // "uName": "Sanjay",
    //  "rId": 1,
    //  "token"
  }

  //LogOut
  public logOut(){
    localStorage.removeItem('username');
    localStorage.removeItem('ACCESS_ROLE');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('jwtToken');
  }
}
