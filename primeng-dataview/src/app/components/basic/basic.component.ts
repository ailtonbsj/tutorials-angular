import { Component } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {

  products: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data.slice(0, 8)));
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
