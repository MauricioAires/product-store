import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/product-payload.interface';

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

  get(id: string) {
    return this.httpClient.get<Product>(`api/products/${id}`);
  }

  create(payload: ProductPayload) {
    return this.httpClient.post('api/products', payload);
  }

  update(id: string, payload: ProductPayload) {
    return this.httpClient.put(`api/products/${id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete<Product>(`api/products/${id}`);
  }
}
