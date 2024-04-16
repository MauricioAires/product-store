import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ProductsService } from '../../shared/services/products.service';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product): void {
    const { title } = product;

    this.productService
      .create({
        title: title!,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto cadastrado com sucesso!', 'OK');

        this.router.navigateByUrl('/');
      });
  }
}
