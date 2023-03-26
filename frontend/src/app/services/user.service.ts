import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5555"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateProfile(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/bank/users/update-profile`, data);
  }

  getUserById(userId: String): Observable<any> {
    return this.http.get(`${baseUrl}/bank/users/${userId}`);
  }

  addPayee(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/bank/users/add-payee`, data);
  }
  
  getAllUserPayees(payerId: String): Observable<any> {
    return this.http.get(`${baseUrl}/bank/users/getPayees/${payerId}`);
  }

  getPayeeById(payeeId: String): Observable<any> {
    return this.http.get(`${baseUrl}/bank/users/payee/${payeeId}`);
  }

  createTransaction(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/bank/users/make-transaction`, data);
  }

  addBalance(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/bank/users/add-balance`, data);
  }

  getUserTransactions(payerId: String): Observable<any> {
    return this.http.get(`${baseUrl}/bank/users/get-user-transactions/${payerId}`);
  }

  getTransactionById(transactionId: String): Observable<any> {
    return this.http.get(`${baseUrl}/bank/users/transactions/${transactionId}`);
  }

}
