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
  product: Product = {};
  submitted: boolean = false;
  productDialog: boolean = false;
  statuses: any = [];
  inventoryStatus: any;

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.statuses = [
      { label: 'Disponível', value: 'INSTOCK' },
      { label: 'Estoque Baixo', value: 'LOWSTOCK' },
      { label: 'Indisponível', value: 'OUTOFSTOCK' }
    ];

    this.productService.index().subscribe({
      next: products => this.products = products
    });
  }

  getSeverity(inventoryStatus: string): string {
    switch (inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      default:
        return 'danger';
    }
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar <strong>' + product.name + '</strong>?',
      header: 'Alerta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto removido', life: 3000 });
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
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = [];
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto removidos', life: 3000 });
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.inventoryStatus = 'INSTOCK';
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
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto criado', life: 3000 });
      }
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
