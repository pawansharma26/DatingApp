import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
baseURL='https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  login(model:any)
  {
    return this.http.post(this.baseURL + 'account/login', model);
  }
}
