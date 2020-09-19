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

  constructor(public service: PaymentDetailService) { }
  
  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
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
