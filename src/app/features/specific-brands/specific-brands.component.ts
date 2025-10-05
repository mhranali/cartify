import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { CardComponent } from "../../shared/components/card/card.component";
import { Brand } from '../wishlist/models/whishlist.interface';

@Component({
  selector: 'app-specific-brands',
  imports: [NgxPaginationModule, SearchPipe, CardComponent],
  templateUrl: './specific-brands.component.html',
  styleUrl: './specific-brands.component.css'
})
export class SpecificBrandsComponent implements OnInit {

   private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productsList: Product[] = [];

  pageSize!: number;
  p!: number;
  total!: number;

  text: string = '';

  name!: string | null;

  ngOnInit(): void {
    this.getProductId();
        this.getAllProductsData();
  }

  getAllProductsData(pageNumber: number = 1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        console.log(this.productsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.name = urlParams.get('slug');
        console.log(this.name);
      },
    });
  }
}
