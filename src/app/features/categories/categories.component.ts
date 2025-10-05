import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TermPipe } from '../../shared/pipes/term-pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [TermPipe , FormsModule , RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)

    categoriesList: Category[] = [];

    text:string = ''
  

    ngOnInit(): void {
        this.getAllCategoriesData()
    }

    getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        console.log(res.data);
        
      },
    });
  }



}
