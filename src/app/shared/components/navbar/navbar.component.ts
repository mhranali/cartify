import { Component, computed, inject, Input, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly id = inject(PLATFORM_ID);

  count:Signal<number> = computed(  ()=> this.cartService.countNumber())
  wishlistCount:Signal<number> = computed(()=>this.wishlistService.countNumber() )

  @Input({ required: true }) isLogin!: boolean;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart();
     
    }
  }

 

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
      },
    });
  }


  signout(): void {
    this.authService.logout();
  }
}
