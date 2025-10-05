import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {
  
  private readonly httpClient = inject(HttpClient)

  id:string | null = null

  getUserOrders(id:string | null):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`)
  }
}
