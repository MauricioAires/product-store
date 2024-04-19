import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { filter } from 'rxjs';

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
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer))
      // o filter ... filtra se a condição for falsa
      // o observable não chega no subscribe ( ele ;e finalizado)
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

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content class="mat-typography">
      <h3>Tem certeza que deseja deletar esse produto?</h3>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onDisagree()">Não</button>
      <button
        mat-raised-button
        (click)="onAgree()"
        color="primary"
        cdkFocusInitial
      >
        Sim
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onDisagree(): void {
    this.matDialogRef.close(false);
  }

  onAgree(): void {
    this.matDialogRef.close(true);
  }
}
