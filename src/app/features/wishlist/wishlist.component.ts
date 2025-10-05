import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Whishlist } from './models/whishlist.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';
import { TermPipe } from '../../shared/pipes/term-pipe';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, TermPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  whishlistDetails: Product[] = [];

  ngOnInit(): void {
    this.getLoggedUserData();
  }



  getLoggedUserData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);

        this.whishlistDetails = res.data;
        this.wishlistService.countNumber.set(res.count)
      },
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeSpecificWoshlistItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getLoggedUserData();
        this.whishlistDetails = res.data;;
        
      },
    });
  }

  addProducrItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.countNumber.set(res.numOfCartItems);

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'CARTIFY');
        }
      },
    });
  }
}
