import { Component, OnInit } from '@angular/core';

import { IUser } from 'src/app/Interfaces/IUser';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';

@Component({
  selector: 'app-programs-panel',
  templateUrl: './programs-panel.component.html',
  styleUrls: ['./programs-panel.component.scss']
})
export class ProgramsPanelComponent implements OnInit {

  user: IUser;

  constructor(private userHandoff: UserHandoffService) { }

  ngOnInit(): void {
    this.userHandoff.currentUser.subscribe(data => {
      this.user = data;
    });
  }

}
