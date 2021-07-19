import { Component, OnInit } from '@angular/core';

// Models imports
import { IExercise } from 'src/app/Interfaces/IExercise';
import { IProgram } from 'src/app/Interfaces/IProgram';
import { IUser } from 'src/app/Interfaces/IUser';
import { Exercise } from 'src/app/Models/Exercise';
import { Program } from 'src/app/Models/Program';
import { Router } from '@angular/router';


// Services imports
import { ApiService } from 'src/app/Services/api-service/api-service.service';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';
import { AuthorizationService } from 'src/app/Services/authorization-service/authorization-service.service';

// Pipes imports
import { GenericFilterPipe } from 'src/app/Pipes/generic-filter.pipe';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  program: IProgram = new Program();
  availableExercises: IExercise[] = new Array<Exercise>();
  user: IUser;
  exerciseFilter: any = '';

  constructor(private api: ApiService,
    private userHandoff: UserHandoffService,
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
    // Fetch exercises and set on init
    this.api.getExercises().subscribe(response => {
      this.availableExercises = response.body;
    });

    // Set the current user context to the logged in user
    this.userHandoff.currentUser.subscribe(data => {
      this.user = data;
    });
  }

  createProgram() {
    // Fetch HTML values for program creation
    this.program.Name = (document.getElementById('Name') as HTMLInputElement).value;
    this.program.UserId = this.user.Id;
    this.program.Description = (document.getElementById('Description') as HTMLInputElement).value;

    // Set the sets, reps, and weight for exercises
    let exercises = document.getElementsByClassName('program-exercise');

    for(let i = 0; i < exercises.length; i++) {
      let sets = (exercises[i].childNodes[1] as HTMLInputElement).value;
      let reps = (exercises[i].childNodes[2] as HTMLInputElement).value;
      let weight = (exercises[i].childNodes[3] as HTMLInputElement).value;
      
      this.program.Exercises[i].Sets = parseInt(sets);
      this.program.Exercises[i].Reps = parseInt(reps);
      this.program.Exercises[i].Weight = parseInt(weight);
    }

    // Set the position of included program exercises
    for(let i = 0; i < this.program.Exercises.length; i++) {
      this.program.Exercises[i].Position = (i+1);
    }

    // POST the user via the program api request
    console.log(this.program);
    this.api.addProgram(this.program).subscribe(response => {
      console.log(response.body);
    });
  }

  addExercise(exercise: IExercise) {
    // Push exercise to program exercises array
    this.program.Exercises.push(exercise);

    // Hide the exercise search container 
    // and un-hide the prorgram details panel
    document.getElementById('search-container').hidden = true;
    document.getElementById('program-details').hidden = false;

    // Reset exercise search bar
    (document.getElementById('exercise-search') as HTMLInputElement).value = '';
    this.exerciseFilter = '';
  }

  removeExercise(exercise: IExercise) {
    console.log(exercise.Position);
  }

  showExerciseList() {
    // Hide the program details panel 
    // and un-hide the exercise search container
    document.getElementById('program-details').hidden = true;
    document.getElementById('search-container').hidden = false;
  }

}