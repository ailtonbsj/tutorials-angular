import { Component } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from 'src/app/service/product.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-sorting-and-layout',
  templateUrl: './sorting-and-layout.component.html',
  styleUrls: ['./sorting-and-layout.component.scss']
})
export class SortingAndLayoutComponent {

  layout: 'list' | 'grid' = 'grid';
  sortOptions: SelectItem[] = [];
  sortOrder!: number;
  sortField!: string;

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
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

  getSeverity(product: Product): string | undefined {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return undefined;
    }
  };

}
