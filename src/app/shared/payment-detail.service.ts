import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url = environment.apiBaseUrl+'/PaymentDetail';
  list: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  refreshList() {
    this.http.get(this.url).subscribe({
      next: res => {
        console.log(res);
        this.list =  res as PaymentDetail[]
      },
      error: err => {
        console.log('This is the Error', err);
      }
    })
  }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData)
  }

  putPaymentDetail() {
    return this.http.put(this.url + '/' + this.formData.paymentDetailID, this.formData)
  }

  deleteRecord(id: any) {
    return this.http.delete(this.url + '/' + id)
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }

  openNotification(message: string, action: string) {
    this.snackbar.open(message, action);
  }
}
