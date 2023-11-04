import { Injectable } from '@angular/core';
import { Observable, defer, of, take } from 'rxjs';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Mocks
  dbRam: any[] = [];

  getProductsData() {
    return [
      {
        id: '1000',
        name: 'Bamboo Watch',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Produto',
        inventoryStatus: 'DISPONIVEL',
        owner: 'user'
      },
      {
        id: '1001',
        name: 'Black Watch',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Produto',
        inventoryStatus: 'INDISPONIVEL',
        owner: 'user'
      },
      {
        id: '1002',
        name: 'Blue Band',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Serviço',
        inventoryStatus: 'DISPONIVEL',
        owner: 'user'
      },
      {
        id: '1003',
        name: 'Blue T-Shirt',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Serviço / Remoto',
        inventoryStatus: 'DISPONIVEL',
        owner: 'user'
      },
      {
        id: '1004',
        name: 'Bracelet',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Produto',
        inventoryStatus: 'DISPONIVEL',
        owner: 'user'
      },
      {
        id: '1005',
        name: 'Brown Purse',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Produto',
        inventoryStatus: 'INDISPONIVEL',
        owner: 'user'
      },
      {
        id: '1006',
        name: 'Chakra Bracelet',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Produto',
        inventoryStatus: 'DISPONIVEL',
        owner: 'user'
      }
    ];
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  constructor() {
    this.dbRam = this.getProductsData();
    console.log('Database on RAM | Singleton');
  }

  // Service
  index(): Observable<Product[]> {
    return defer(() => Promise.resolve(this.dbRam));
  }

  destroy(id: string): Observable<void> {
    const promise = async () => {
      this.dbRam = this.dbRam.filter(item => item.id !== id);
    }
    return defer(promise);
  }

  destroyBulk(ids: string[]) {
    const promise = async () => {
      this.dbRam = this.dbRam.filter(item => !ids.includes(item.id));
      console.log(this.dbRam);

    }
    return defer(promise);
  }

  store(entity: Product): Observable<string> {
    const promise = async () => {
      entity.id = this.createId();
      entity.image = 'product-placeholder.svg';
      this.dbRam.push(entity);
      return entity.id;
    }
    return defer(promise);
  }

  update(entity: Product): Observable<string> {
    const promise = async () => {
     this.dbRam[this.dbRam.findIndex(item => item.id === entity.id)] = entity;
      return entity.id;      
    }
    return defer(promise);
  }
}
