import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  confirmationDialog = inject(ConfirmationDialogService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  onEdit(product: Product): void {
    this.router.navigate(['edit-product', product.id]);
  }
  onDelete(product: Product): void {
    this.confirmationDialog
      .openDialog()
      .pipe(filter((answer) => answer))
      .subscribe({
        next: () => {
          this.productsService.delete(product.id).subscribe(() => {
            this.getAllProducts();
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
