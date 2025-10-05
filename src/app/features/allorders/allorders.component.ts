import { Component, computed, effect, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { AllordersService } from './services/allorders.service';
import { Allorders } from './models/allorders.interface';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../shared/pipes/term-pipe';

@Component({
  selector: 'app-allorders',
  imports: [TermPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit  {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly allordersService = inject(AllordersService);

  orderList:Allorders[]=[]
  id:string | null = null

  ngOnInit(): void {

this.getUsersData()
  }
  
  getUsersData():void{
    this.allordersService.getUserOrders(this.authService.getUserId()).subscribe({
      next:(res)=>{
        console.log(res);
        this.orderList = res
      }
    })
  }



}
