import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

// Interfaces imports
import { IExercise } from 'src/app/Interfaces/IExercise';
import { IProgram } from 'src/app/Interfaces/IProgram';
import { IUser } from 'src/app/Interfaces/IUser';
import { IMuscleGroup } from 'src/app/Interfaces/IMuscleGroup';

// Models imports
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
  availableExercises: IExercise[] = new Array<IExercise>();
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
    
    let format = 'yyyy-MM-dd hh:mm:ss';
    let currentDate = new Date();
    let locale = 'en-US';

    let formattedDate = formatDate(currentDate, format, locale);
    this.program.DateCreated = formattedDate;

    // Set the sets, reps, and weight for exercises
    let exercises = document.getElementsByClassName('program-exercise');

    for(let i = 0; i < exercises.length; i++) {
      // Retrieve exercise sets value
      let sets = (exercises[i]
        .children
          .namedItem('exercise-sets') as HTMLInputElement)
            .value;

      // Retrieved exercise reps value
      let reps = (exercises[i]
        .children
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

    // Program validation checks
    if(this.program.Name == '') {
      window.alert('Please enter a program name')
    }
    else if(this.program.Exercises.length == 0) {
      window.alert('This program must have at least one exercise')
    }
    else {
      // POST the user via the program api request
      this.api.addProgram(this.program).subscribe(() => {
        window.alert(`'${this.program.Name}' program created`);
        this.router.navigate([`/portal/${this.user.UserName}/programs`])
          .then(() => {
            window.location.reload();
          });
      });
    }

  }

  buildExercise(exercise: IExercise) {
    let newExercise: IExercise = new Exercise();

    newExercise.Id = exercise.Id;
    newExercise.Name = exercise.Name;
    newExercise.Description = '';
    newExercise.MuscleGroups = new Array<IMuscleGroup>();
    newExercise.Sets = exercise.Sets;
    newExercise.Reps = exercise.Reps;
    newExercise.Weight = exercise.Weight;
    newExercise.Position = exercise.Position;
    newExercise.Duration = exercise.Duration;

    return newExercise;
  }

  addExercise(exercise: IExercise) {
    // Create and set the new exercise
    let addedExercise = this.buildExercise(exercise);

    // Set the new exercise position and push to exercises array
    addedExercise.Position = (this.program.Exercises.length + 1);
    //console.log(exercise);
    this.program.Exercises.push(addedExercise);

    // Hide the exercise search container and un-hide the program details panel
    document.getElementById('search-container').hidden = true;
    document.getElementById('program-details').hidden = false;

    // Reset exercise search bar
    (document.getElementById('exercise-search') as HTMLInputElement).value = '';
    this.exerciseFilter = '';
  }

  deleteExercise(exercise: IExercise) {
    let index = this.program.Exercises.findIndex(item => 
      item.Position == exercise.Position
    );

    this.program.Exercises.splice(index, 1);
  }

  showExerciseList() {
    // Hide the program details panel and un-hide the exercise search container
    document.getElementById('program-details').hidden = true;
    document.getElementById('search-container').hidden = false;
  }

}