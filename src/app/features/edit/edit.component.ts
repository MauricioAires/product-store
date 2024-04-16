import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  product = inject(ActivatedRoute).snapshot.data['product'] as Product;

  onSubmit(product: Product) {
    const { title } = product;
    const { id } = this.product;

    this.productService
      .update(id, {
        title: title!,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto atualizado com sucesso!', 'OK');

        this.router.navigateByUrl('/');
      });
  }
}
