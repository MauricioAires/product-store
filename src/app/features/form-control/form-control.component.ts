import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
})
export class FormControlComponent {
  searchControl = new FormControl('', {
    nonNullable: true,
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        filter((value) => !!value),
        debounceTime(500)
      )
      .subscribe({
        next: (value) => {
          console.log('value', value);
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
