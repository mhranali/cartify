import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  addProducrItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.countNumber.set(res.numOfCartItems);

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'CARTIFY');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProducrItemToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res.data.length);

        // this.cartService.countNumber.set(res.numOfCartItems);
        this.wishlistService.countNumber.set(res.data.length)

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'CARTIFY');
        }
      },
    });
  }
}
