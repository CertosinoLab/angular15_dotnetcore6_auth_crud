import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DatatableConverterService } from 'src/app/services/datatable-converter.service';
import { Utils } from 'src/app/utils/utils';
import { GenericTableDialog } from '../generic-table-dialog/generic-table-dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
import { GenericTableResults } from '../../models/table-models';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading: boolean = true;
  private authSubscription: Subscription = new Subscription;
  isAdmin: boolean = false;

  @Input() tableType: string = '';

  convertedResult: GenericTableResults = {
    CurrentPage: 0,
    PageSize: 0,
    RecordFrom: 0,
    RecordTo: 0,
    Records: [],
    TotalCount: 0,
    TotalPages: 0
  }

  displayedColumns: string[] = [];

  pagesArray: number[] = [];
  pagesArraySize: number[] = [5, 10, 15, 20];
  selectedPage = 1;
  selectedPageSize = 10;

  sortField: string = 'Id';
  sortDirection: string = 'asc';

  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService,
    private datatableConverterService: DatatableConverterService,
    public dialog: MatDialog) {}

  getUserAndGenerateColumns() {
    this.authSubscription = this.authService.user().subscribe(
      result => {
        if (result[2].value === "Admin") this.isAdmin = true;
        else this.isAdmin = false;

        if (this.tableType === 'Products') {
          this.displayedColumns = ['id', 'name', 'weight', 'createDate', 'description', 'price', 'sku', 'stock'];
        }
        if (this.tableType === 'Customers') {
          this.displayedColumns = ['id', 'email', 'password', 'fullName', 'billingAddress', 'defaultShippingAddress',
            'country', 'phone'];
        }
        if (this.tableType === 'Orders') {
          this.displayedColumns = ['id', 'amount', 'customer', 'shippingAddress', 'orderAddress', 'orderDate', 'orderStatus'];
        }
        if (this.tableType === 'Employees') {
          this.displayedColumns = ['id', 'fullName', 'address', 'phone', 'job', 'role', 'salary'];
        }

        if (this.isAdmin) {
          this.displayedColumns.push('actions');
        }

        this.getPaginatedResults(true);
      });
  }

  ngOnInit(): void {
    this.getUserAndGenerateColumns();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  changePage(): void {
    this.getPaginatedResults(false);
  }

  private async getPaginatedResults(isFirstLoad: boolean): Promise<void> {
    if (isFirstLoad) {
      this.isLoading = true;
      this.dataSource.data = [];
    }
    this.convertedResult = await this.datatableConverterService.dataConverter(this.tableType, this.selectedPage,
      this.selectedPageSize, this.sortField, this.sortDirection);

     this.pagesArray = [];
     this.dataSource.data = this.convertedResult.Records;

     for (let i = 1; i <= this.convertedResult.TotalPages; i++) {
       this.pagesArray.push(i);
    }
    this.isLoading = false;
  }

  handlePageEvent(type: string): void {
    if(type == "next") {
     this.selectedPage = this.selectedPage + 1;
    } else if (type=="back") {
      this.selectedPage = this.selectedPage - 1;
    } else if (type=="first") {
      this.selectedPage = 1;
    } else if (type=="last") {
      this.selectedPage = this.convertedResult.TotalPages;
    }

    if(this.selectedPage > this.convertedResult.TotalPages) {
      this.selectedPage = this.convertedResult.TotalPages;
    }
    if (this.selectedPage <= 0) {
      this.selectedPage = 1;
    }

    this.changePage();
  }

  changePageSize(): void {
    this.selectedPage = 1;
    this.getPaginatedResults(false);
  }

  changeOrderField(field: string, direction: string): void {
    if(field !== 'actions') {
      if(field.toUpperCase() === this.sortField.toLocaleUpperCase()) {
        if(direction === "asc") this.sortDirection = 'desc';
        if(direction === "desc") this.sortDirection = 'asc';
      } else {
        this.sortField = Utils.capitalizeFirstLetter(field);
        this.sortDirection = 'asc';
      }
      this.getPaginatedResults(false);
    }
  }

  checkIfIsObject(column: any): boolean {
    if(typeof column === 'object' && column !== null) {
      return true;
    } else {
      return false;
    }
  }

  openDialog(dialogType: string,column: string, objectColumn: any): void {
    let currentTableType = this.tableType;
    const dialogRef = this.dialog.open(GenericTableDialog, {
      data: {dialogType, currentTableType, column, objectColumn},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.getPaginatedResults(true);
    });
  }

  async deleteElement(element: any): Promise<void> {
    await this.datatableConverterService.deleteOperation(this.tableType, element.id);
    this.getPaginatedResults(true);
  }
}
