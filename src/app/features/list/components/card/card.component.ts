import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  /**
   * Sempre utilizar signal ??
   * Sempre utilizar computed ??
   */
  product = input.required<Product>();
  onEdit = output<void>();
  onDelete = output<void>();

  productTitle = computed(() => this.product().title);
}
