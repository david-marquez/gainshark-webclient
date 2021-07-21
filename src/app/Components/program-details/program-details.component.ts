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
import { IExercise } from 'src/app/Interfaces/IExercise';

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

  deleteExercise(exercise: IExercise) {
    let index = this.program.Exercises.findIndex(item => 
      item.Position == exercise.Position
    );

    this.program.Exercises.splice(index, 1);
  }

  deleteProgram() {
    this.api.deleteProgram(this.program.Id).subscribe(() => {
      window.alert(`'${this.program.Name}' program deleted`);
      this.router.navigate([`/portal/${this.user.UserName}/programs`])
        .then(() => {
          window.location.reload();
        });
    });
  }

  updateProgram() {
    // Set the sets, reps, and weight for exercises
    let exercises = document.getElementsByClassName('program-exercise');

    for(let i = 0; i < exercises.length; i++) {
      // Retrieve exercise sets value
      let sets = (exercises[i]
        .children
          .namedItem('exercise-sets') as HTMLInputElement)
            .value;

      // Retrieved exercise reps value
      let reps = (exercises[i].
        children
          .namedItem('exercise-reps') as HTMLInputElement)
            .value;

      // Retrieve exercise weight value
      let weight = (exercises[i]
        .children
          .namedItem('exercise-weight') as HTMLInputElement)
            .value;
      
      // Set exercise sets, reps, and weight values
      this.program.Exercises[i].Sets = parseInt(sets);
      this.program.Exercises[i].Reps = parseInt(reps);
      this.program.Exercises[i].Weight = parseInt(weight);
    }

    // Set the position of included program exercises
    for(let i = 0; i < this.program.Exercises.length; i++) {
      this.program.Exercises[i].Position = (i+1);
    }

    console.log(this.program);
    this.api.updateProgram(this.program).subscribe(() => {
      window.alert(`'${this.program.Name}' program updated`);
      location.reload();
    });
  }

}
