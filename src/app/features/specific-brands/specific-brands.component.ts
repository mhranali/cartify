import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { CardComponent } from '../../shared/components/card/card.component';
import { SpecificBrandsService } from './services/specific-brands.service';
import { Brand } from './models/brand.interface';
import { TermPipe } from '../../shared/pipes/term-pipe';


@Component({
  selector: 'app-specific-brands',
  imports: [NgxPaginationModule, SearchPipe, CardComponent, TermPipe],
templateUrl: './specific-brands.component.html',
  styleUrl: './specific-brands.component.css',
})
export class SpecificBrandsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly specificBrandsService = inject(SpecificBrandsService);

  productsList: Product[] = [];

  text: string = '';

  name!: string | null;
  id!: string | null;

  brand:Brand = {} as Brand

  ngOnInit(): void {
    this.getProductSlug();
    this.getProductId()
    this.getAllProductsData();
    this.getSpecificBrand();
  }

  getAllProductsData(pageNumber: number = 1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList = res.data;
        console.log(this.productsList);
      },
    });
  }

  getProductSlug(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.name = urlParams.get('slug');
        console.log(this.name);
      },
    });
  }
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        console.log(this.id);
      },
    });
  }

  getSpecificBrand(): void {
    this.specificBrandsService.getSpecificBrand(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.brand = res.data
      },
    });
  }
}
