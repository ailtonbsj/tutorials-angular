import { ProductService } from './../../service/product.service';
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/domain/product';

@Component({
  selector: 'app-true-list-and-filter',
  templateUrl: './true-list-and-filter.component.html',
  styleUrls: ['./true-list-and-filter.component.scss']
})
export class TrueListAndFilterComponent {

  products: Product[] = [];

  layout: 'list' | 'grid' = 'list';
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField!: string;

  constructor(private productService: ProductService) {

    this.sortOptions = [
      { label: 'Maior preço', value: '!price' },
      { label: 'Menor preço', value: 'price' }
    ];

    this.productService.getProducts().then((data) => (this.products = data.slice(0, 8)));

  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

}
