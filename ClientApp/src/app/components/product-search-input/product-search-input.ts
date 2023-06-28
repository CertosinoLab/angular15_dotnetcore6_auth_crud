import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommonModule } from "@angular/common";
import { Product } from '../../models/entity-models'; // Assuming the Product model exists
import { ProductsService } from '../../services/products.service'; // Assuming the ProductsService exists
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-product-search-input',
  standalone: true,
  templateUrl: './product-search-input.html',
  styleUrls: ['./product-search-input.css'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductSearchInput {
  @Input() orderId: number | undefined;
  @Input() dialogType: string = '';
  @Output() selectOption = new EventEmitter<number>();

  orderDetailsProducts: Product[] = [];
  productsCtrl: FormControl = new FormControl();
  productsFilterCtrl: FormControl = new FormControl();
  filteredProducts: ReplaySubject<Product[]> = new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  protected _onDestroy = new Subject();

  constructor(private productsService: ProductsService, private ordersService: OrdersService) { }

  async getProductsOrder() {
    this.ordersService.getProductsOrder(this.orderId!).then(res => {
      if (res.Products.length > 0) {
        this.productsCtrl.setValue(res.Products[0]);
      };
    })
  }

  async ngOnInit() {
    this.productsService.getProducts().then(async (res) => {
      this.orderDetailsProducts = res;
      this.productsCtrl.setValue(this.orderDetailsProducts[0]);
      this.filteredProducts.next(this.orderDetailsProducts.slice());
      this.selectOption.emit(this.productsCtrl.value?.id);

      if (this.dialogType === 'edit') {
        await this.getProductsOrder();
      }

      this.productsFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.selectOption.emit(this.productsCtrl.value?.id);
          this.filterProducts();
        });
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next(undefined);
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredProducts
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Product, b: Product) => a && b && a.id === b.id;
      });
  }

  protected filterProducts() {
    if (!this.orderDetailsProducts) {
      return;
    }
    let search = this.productsFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.orderDetailsProducts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredProducts.next(
      this.orderDetailsProducts.filter(product => product.name!.toLowerCase().indexOf(search) > -1)
    );
  }
}
