import { Component, inject, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-category',
  imports: [NgxPaginationModule, CardComponent, SearchPipe],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.css',
})
export class SpecificCategoryComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productsList: Product[] = [];

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
