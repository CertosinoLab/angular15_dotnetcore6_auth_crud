import { Component, OnInit } from '@angular/core';
import { DatatableConverterService } from 'src/app/services/datatable-converter.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  constructor(private datatableConverterService: DatatableConverterService) {}

  ngOnInit(): void {
    this.getResults();
  }

  async getResults(): Promise<void> {
    
  }
}
