import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

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
  matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  onEdit(product: Product): void {
    this.router.navigate(['edit-product', product.id]);
  }
  onDelete(product: Product): void {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
      });
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Excluir produto</h2>
    <mat-dialog-content class="mat-typography">
      <h3>Essa ação não poderá ser desfeita</h3>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {}
