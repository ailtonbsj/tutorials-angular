import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  products: Product[] = [];
  selectedProducts: Product[] = [];
  product: Product = <Product>{};
  submitted: boolean = false;
  productDialog: boolean = false;
  statuses: any = [];
  inventoryStatus: any;

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.statuses = [
      { label: 'Disponível', value: 'DISPONIVEL' },
      { label: 'Indisponível', value: 'INDISPONIVEL' }
    ];
    this.listProducts();
  }

  getSeverity(inventoryStatus: string): string {
    switch (inventoryStatus) {
      case 'DISPONIVEL':
        return 'success';
      default:
        return 'danger';
    }
  }

  listProducts() {
    this.productService.index().subscribe({
      next: products => this.products = products
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar <strong>' + product.name + '</strong>?',
      header: 'Alerta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.destroy(product.id).subscribe({
          next: () => {
            this.product = <Product>{};
            this.listProducts();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto removido', life: 3000 });
          }
        });
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar os produtos selecionados?',
      header: 'Alerta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.destroyBulk(this.selectedProducts.map(p => p.id)).subscribe({
          next: () => {
            this.selectedProducts = [];
            this.listProducts();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto removidos', life: 3000 });
          }
        });
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    });
  }

  openNew() {
    this.product = <Product>{};
    this.submitted = false;
    this.inventoryStatus = 'DISPONIVEL';
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
    this.inventoryStatus = product.inventoryStatus;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      this.product.inventoryStatus = this.inventoryStatus;
      if (this.product.id) {
        this.productService.update(this.product).subscribe({
          next: id => {
            this.product = <Product>{};
            this.listProducts();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado', life: 3000 });
          }
        });
      } else {
        this.productService.store(this.product).subscribe({
          next: id => {
            this.product = <Product>{};
            this.listProducts();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto criado', life: 3000 });
          }
        });
      }
      this.productDialog = false;
    }
  }
}
