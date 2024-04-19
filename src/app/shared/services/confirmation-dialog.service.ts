import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private matDialog = inject(MatDialog);

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmDialogComponent).afterClosed();
    // .pipe(filter((answer) => answer));
    // o filter ... filtra se a condição for falsa
    // o observable não chega no subscribe ( ele ;e finalizado)
  }
}
