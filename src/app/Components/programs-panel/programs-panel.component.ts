import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from 'src/app/Interfaces/IUser';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';

@Component({
  selector: 'app-programs-panel',
  templateUrl: './programs-panel.component.html',
  styleUrls: ['./programs-panel.component.scss']
})
export class ProgramsPanelComponent implements OnInit {

  user: IUser;

  constructor(private userHandoff: UserHandoffService,
    private authorization: AuthorizationService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.authorization.isLoggedIn) {
      window.alert('Session expired. Returning to login');
      this.router.navigate(['/login']);
    }
    else {
      this.loadResources();
    }
  }

  loadResources() {
    this.userHandoff.currentUser.subscribe(data => {
      this.user = data;
    });
  }z

}
