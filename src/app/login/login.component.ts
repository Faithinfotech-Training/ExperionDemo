import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
import { Jwtresponse } from '../shared/jwtresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm!: FormGroup;
  isSubmitted=false;
  loginUser: User = new User();
  error='';
  jwtResponse: any=new Jwtresponse();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
   
    //FormGroup
    this.loginForm=this.formBuilder.group(
      {
        UserName: ['',[Validators.required, Validators.minLength(2)]],
        Userpassword: ['',[Validators.required]]
      }
    );
  }

  //Get controls
  get formControls(){
    return this.loginForm.controls;
  }


  //login Verify credentials
  loginCredentials(){
      
      this.isSubmitted=true;
      console.log(this.loginForm.value);
      
      // invalid 
      if(this.loginForm.invalid)
        return;

      //#region Valid Form
      //valid
      if(this.loginForm.valid){

        //calling method from AuthService   - Authenticate and authorize
        this.authService.loginVerify(this.loginForm.value)
        .subscribe(data=>{
          console.log(data);
          //token with roleid and name
          this.jwtResponse=data;

          //either local/session
          sessionStorage.setItem("jwtToken", this.jwtResponse.token);

         
          //Check the Role---based on TRoleId, it redirects to the respective component
          if(this.jwtResponse.rId===1){
            //logged as Admin
            console.log("ADMIN");
            //storing in localStaorage/sessionStorage
            localStorage.setItem("username",this.jwtResponse.uName);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username",this.jwtResponse.uName);

            this.router.navigateByUrl('/admin');
          }
          else if(this.jwtResponse.rId===2){
            //logged as Manager
            console.log("MANAGER");
            localStorage.setItem("username",this.jwtResponse.uName);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username",this.jwtResponse.uName);
            this.router.navigateByUrl('/manager');

          }
          else if(this.jwtResponse.rId===3){
            //logged as User
            console.log("USER");
            localStorage.setItem("username",this.jwtResponse.uName);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username",this.jwtResponse.uName);
            this.router.navigateByUrl('/employee');

          }
          else{
            this.error="Sorry! NOT allowed to access... Invalid authorization"
          }
          
        },
        error=>{
          this.error="Invalid username or password. Try again"
        }
       
        );
        
      }


      //Logout 
 
  }

  //LoginVerify Test
  loginVerifyTest(){
    if(this.loginForm.valid){
      this.authService.getUserByPassword(this.loginForm.value)
      .subscribe(
        (data)=>{
          console.log(data);
        },
        (error)=>{
          console.log(error);
        }
      );
    }
  }
}
