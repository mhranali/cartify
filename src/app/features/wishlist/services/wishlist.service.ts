import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)

  countNumber:WritableSignal<number> = signal(0)

    addProductToWishlist(id: string): Observable<any> {
      return this.httpClient.post(environment.baseUrl + 'wishlist', {
        productId: id,
      });
    }

      getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist');
  }

    removeSpecificWoshlistItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`);
  }
}
