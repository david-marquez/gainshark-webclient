import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces imports
import { IUser } from 'src/app/Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';

// Models imports
import { Program } from 'src/app/Models/Program';

// Services imports
import { ApiService } from 'src/app/Services/api-service/api-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {

  user: IUser;
  program: IProgram = new Program();

  constructor(private route: ActivatedRoute, 
    private api: ApiService,
    private userrHandoff: UserHandoffService,
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
    this.route.params.subscribe(params => {
      this.program.Id = params['programid'];
    });

    this.userrHandoff.currentUser.subscribe(data => {
      this.user = data;
    });

    // API call for program details
    this.api.getProgram(this.program.Id).subscribe(response => {
        this.program = response.body;
      });
  }

}
