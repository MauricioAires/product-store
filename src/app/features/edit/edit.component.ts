import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    const { title } = this.form.value;

    this.productService
      .create({
        title: title!,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto atualizado com sucesso!', 'OK');

        this.router.navigateByUrl('/');
      });
  }
}
