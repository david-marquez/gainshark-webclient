import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from 'src/app/Interfaces/IUser';
import { ApiService } from 'src/app/Services/api-service/api-service.service';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';

@Component({
  selector: 'app-portal-view',
  templateUrl: './portal-view.component.html',
  styleUrls: ['./portal-view.component.scss']
})
export class PortalViewComponent implements OnInit {

  username: string;
  user: IUser;

  constructor(private route: ActivatedRoute, 
    private api: ApiService,
    private userHandoff: UserHandoffService,
    private router: Router,
    private authorization: AuthorizationService) { }

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
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });

    this.api.getUser(this.username).subscribe(response => {
      this.user = response.body;
      this.userHandoff.changeUser(response.body);
    });
  }

  navHome() {
    this.router.navigate([`/portal/${this.username}/programs`]);
  }

  toggleDropdown() {
    let dropdownMenu: HTMLElement = document.getElementById("dropdown-menu");
    
    if(dropdownMenu.hidden) {
      dropdownMenu.hidden = false;
    }
    else {
      dropdownMenu.hidden = true;
    }
  }

  signOut() {
    this.authorization.logout();
    this.router.navigate(['/login']);
  }

  navAccount() {
    // nav to account settings page
  }

}
