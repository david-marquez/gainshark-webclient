import { 
  ChangeDetectionStrategy,
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  SimpleChanges} from '@angular/core';

// Interfaces imports
import { IProgram } from 'src/app/Interfaces/IProgram';
import { IExercise } from 'src/app/Interfaces/IExercise';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.scss']
})
export class ProgramItemComponent implements OnInit {

  @Input() program: IProgram;
  @Output() deleteExerciseEvent = new EventEmitter<IExercise>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteExercise(exercise: IExercise) {
    //console.log(exercise);
    this.deleteExerciseEvent.emit(exercise);
  }

}
