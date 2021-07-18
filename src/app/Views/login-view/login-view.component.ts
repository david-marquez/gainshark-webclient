import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

// Interfaces imports
import { IUser } from '../../Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';

// Models imports
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';

// Services imports
import { ApiService } from '../../Services/api-service/api-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  private isNewUser: boolean = false;
  user: IUser = new User();
  loginAlertMessage: string;

  constructor(private api: ApiService, 
    private router: Router,
    private userHandoff: UserHandoffService,
    private authorization: AuthorizationService) { }

  ngOnInit(): void {

  }

  buildUser(data) {
    let nameSplit = data.value.name.split(" ");

    this.user.FirstName = nameSplit[0];
    this.user.LastName = nameSplit[1];
    this.user.Email = data.value.email;
    this.user.UserName = data.value.userName;
    this.user.Password = data.value.password;
  }

  demoLogin() {
    this.user.UserName = 'GainShark';
    this.user.Password = 'GainShark!';

    this.authorization.login(this.user.UserName, this.user.Password);
    this.router.navigate([`portal/${this.user.UserName}/programs`]);
  }

  login(data) {
    this.buildUser(data);

    this.authorization.login(this.user.UserName, this.user.Password);
    this.router.navigate([`portal/${this.user.UserName}/programs`]);
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

      // Do sign up stuff
      this.api.addUser(this.user)
        .subscribe(response => {
          if(response.status == 409) {
            this.loginAlertMessage = 'Account already exists';
            console.log(this.loginAlertMessage);
          }
          else {
            this.router.navigate([`portal/${this.user.UserName}/programs`]);
          }
        });
    }
  }

}
