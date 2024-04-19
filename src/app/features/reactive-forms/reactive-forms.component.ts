import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss',
})
export class ReactiveFormsComponent {
  /**
   * Formulário angular tipado, apenas
   * na ultimas versões
   */
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      asyncValidators: [], // validações assíncronas (verificar no banco de dados)
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    console.log('submit', this.form.value.name);
  }
}

/**
 * Estudar como utilizar o viewChild, viewChildren
 */
