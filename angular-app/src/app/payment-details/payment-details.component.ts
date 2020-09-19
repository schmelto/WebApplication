import { PaymentDetailService } from './../shared/payment-detail.service';
import {PaymentDetail} from './../shared/payment-detail.model';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  CardNumber: string;
  Name: number;
  ExpirationDate: number;
  Delete: string;
}



@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})

export class PaymentDetailsComponent implements OnInit {

list$ = [];

  constructor(public service: PaymentDetailService) { }

  ELEMENT_DATA: PaymentDetail[] = null;
  displayedColumns: string[] = ['CardOwnerName', 'CardNumber', 'ExpirationDate', 'Delete'];
  dataSource = this.ELEMENT_DATA;

  ngOnInit() {
    this.service.refreshList();
    this.list$ = this.service.getList();
    console.log(this.list$)
    
  }


  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    console.log(this.service.list);
  }

  onDelete(PMId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(PMId)
        .subscribe(res => {
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }

}
