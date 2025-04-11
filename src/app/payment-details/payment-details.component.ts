import { Component } from '@angular/core';
import { PaymentDetailFormComponent } from "./payment-detail-form/payment-detail-form.component";
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-details',
  imports: [PaymentDetailFormComponent, CommonModule],
  templateUrl: './payment-details.component.html',
  styles: ``
})
export class PaymentDetailsComponent {
  constructor(public paymentSer: PaymentDetailService){}

  ngOnInit() {
    this.paymentSer.refreshList();
  }

  populateRecord(selectedRecord: PaymentDetail) {
    this.paymentSer.formData = Object.assign({}, selectedRecord)
  }

  deleteRecord(id: any) {
    const cnf = confirm('Are you sure you want to delete ?')
    if(cnf) {
      this.paymentSer.deleteRecord(id).subscribe({
        next: res => {
          this.paymentSer.list = res as PaymentDetail[];
          this.paymentSer.openNotification('Payment Detail Deleted Successfully', 'close')
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      return;
    }
  }

}
