import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  /**
   *
   * - get - uma instancias
   * - get all - uma lista (não precisa colocar products
   * porque já está dentro de um contexto)
   *
   */
  getAll() {
    return this.httpClient.get<Product[]>('api/products');
  }
}
