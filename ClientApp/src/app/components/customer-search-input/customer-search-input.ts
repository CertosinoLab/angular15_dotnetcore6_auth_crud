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
import { Customer } from '../../models/entity-models';
import { CustomersService } from '../../services/customers.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-customer-search-input',
  standalone: true,
  templateUrl: './customer-search-input.html',
  styleUrls: ['./customer-search-input.css'],
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
export class CustomerSearchInput {
  @Input() orderId: number | undefined;
  @Input() dialogType: string = '';
  @Output() selectOption = new EventEmitter<number>();

  orderDetailsCustomers: Customer[] = [];
  customersCtrl: FormControl = new FormControl();
  customersFilterCtrl: FormControl = new FormControl();
  filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  protected _onDestroy = new Subject();

  constructor(private customersService: CustomersService, private ordersService: OrdersService) { }

  async getCustomerOrder() {
    this.ordersService.getCustomerOder(this.orderId!).then(res => {
      this.customersCtrl.setValue(res);
    })
  }

  async ngOnInit() {
    this.customersService.getCustomers().then(async (res) => {
      this.orderDetailsCustomers = res;
      this.customersCtrl.setValue(this.orderDetailsCustomers[0]);
      this.filteredCustomers.next(this.orderDetailsCustomers.slice());
      this.selectOption.emit(this.customersCtrl.value?.id);

      if (this.dialogType === 'edit') {
        await this.getCustomerOrder();
      }

      this.customersFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.selectOption.emit(this.customersCtrl.value?.id);
          this.filterCustomers();
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
    this.filteredCustomers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Customer, b: Customer) => a && b && a.id === b.id;
      });
  }

  protected filterCustomers() {
    if (!this.orderDetailsCustomers) {
      return;
    }

    let search = this.customersFilterCtrl.value;
    if (!search) {
      this.filteredCustomers.next(this.orderDetailsCustomers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCustomers.next(
      this.orderDetailsCustomers.filter(customer => customer.fullName!.toLowerCase().indexOf(search) > -1)
    );
  }
}
