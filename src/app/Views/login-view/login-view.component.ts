import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

// Interfaces imports
import { IUser } from '../../Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';

// Models imports
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';

// Services imports
import { ApiService } from '../../Services/api-service/api-service.service';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  private isNewUser: boolean = false;
  user: IUser = new User();

  constructor(private api: ApiService, 
    private router: Router,
    private authorization: AuthorizationService) { }

  ngOnInit(): void {
    
  }

  buildUser(data) {
    let nameSplit: string[] = data.value.name.split(" ");

    if(nameSplit[0]) {
      this.user.FirstName = nameSplit[0];
    }
    else {
      this.user.FirstName = '';
    }

    if(nameSplit[1]) {
      this.user.LastName = nameSplit[1];
    }
    else {
      this.user.LastName = '';
    }

    this.user.Email = data.value.email;
    this.user.UserName = data.value.userName;
    this.user.Password = btoa(data.value.password);
  }

  demoLogin() {
    this.user.FirstName = null;
    this.user.LastName = null;
    this.user.Email = null;
    this.user.UserName = 'demo_user';
    this.user.Password = 'R2ExbiRoYXJrRDNtMFBhc3N3MHJkIQ==';

    this.login();
  }

  login(data?) {
    if(data) {
      this.buildUser(data)
    }

    if(!this.user.UserName || !this.user.Password) {
      window.alert('Please enter a username and password');
    }
    else {
      this.authorization.login(this.user.UserName, this.user.Password).subscribe(
        () => {
            this.router.navigate([`portal/${this.user.UserName}/programs`]);
        }
      )
    }
    
  }

  signUp(data) {
    if(!this.isNewUser) {
      document.getElementById("name-container").hidden = false;
      document.getElementById("email-container").hidden = false;
      this.isNewUser = true;
    }
    else {
      this.buildUser(data);

      this.user.Role = new Role();
      this.user.Role.Id = 1;

      this.user.Programs = new Array<IProgram>();
      
      if(!this.user.UserName || !this.user.Password || !this.user.Email) {
        window.alert('Please enter a username, password, and email address');
      }
      else{
        // Do sign up stuff
        this.api.addUser(this.user)
          .subscribe(() => {
            this.login();
          });
      }
      
    }
  }

}
