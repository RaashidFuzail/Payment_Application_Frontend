import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {

  constructor(public paymentSer: PaymentDetailService) { }

  onSubmit(form: NgForm) {
    this.paymentSer.formSubmitted = true
    if (form.valid) {
      if (this.paymentSer.formData.paymentDetailID === 0) {
        this.insertRecord(form);
        this.paymentSer.openNotification('Payment Detail Created', 'Close');
      } else {
        this.paymentSer.openNotification('Payment Detail Updated', 'Close');
        this.updateRecord(form)
      }
    }
  }

  insertRecord(form: NgForm) {
    this.paymentSer.postPaymentDetail().subscribe({
      next: res => {
        console.log(res);
        this.paymentSer.list = res as PaymentDetail[]
        this.paymentSer.resetForm(form)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  updateRecord(form: NgForm) {
    this.paymentSer.putPaymentDetail().subscribe({
      next: res => {
        console.log(res);
        this.paymentSer.list = res as PaymentDetail[]
        this.paymentSer.resetForm(form)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
