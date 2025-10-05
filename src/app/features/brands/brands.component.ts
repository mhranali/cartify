import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Brands } from './models/brands.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsList: Brands[] = [];

  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(pageNumber: number = 1): void {
    this.brandsService.getAllBrands(pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList = res.data
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
    });
  }
}
