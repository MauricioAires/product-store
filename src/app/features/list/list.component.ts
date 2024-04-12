import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

type Product = {
  id: string;
  title: string;
};

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  httpClient = inject(HttpClient);
  products: Product[] = [];

  ngOnInit(): void {
    this.httpClient.get<Product[]>('api/products').subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }
}
