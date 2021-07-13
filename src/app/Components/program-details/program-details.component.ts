import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from 'src/app/Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';
import { Program } from 'src/app/Models/Program';
import { ApiService } from 'src/app/Services/api-service/api-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';

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
    private userrHandoff: UserHandoffService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.program.Id = params['programid'];
    });

    this.userrHandoff.currentUser.subscribe(data => {
      this.user = data;
    });

    // API call for program details
    this.api.getProgram(this.program.Id, 
      this.user.UserName, 
      this.user.Password).subscribe(response => {
        this.program = response.body;
      });
    
  }

}
