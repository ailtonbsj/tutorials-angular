import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from 'src/domain/product';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceProducts!: Product[];
  targetProducts!: Product[];

  constructor(
    private carService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carService.getProductsSmall().then(products => {
        this.sourceProducts = products;
        this.cdr.markForCheck();
    });
    this.targetProducts = [];
  }
}
