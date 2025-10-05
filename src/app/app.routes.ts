import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',component: AuthLayoutComponent,canActivate: [isLoggedGuard],
    children: [
      {path: 'login',loadComponent: () =>import('./core/auth/login/login.component').then((c) => c.LoginComponent),title: 'Login Page',},
      {path: 'register',loadComponent: () => import('./core/auth/register/register.component').then( (c) => c.RegisterComponent), title: 'Register Page',},
      {path: 'forgot',loadComponent: () =>import('./core/auth/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),title: 'ForgotPassword Page',},
    ],
  },

  {
    path: '',component: BlankLayoutComponent,canActivate: [authGuard],
    children: [
      {path: 'home', loadComponent: () =>import('./features/home/home.component').then((c) => c.HomeComponent),title: 'Home Page',},
      {path: 'cart', loadComponent: () =>import('./features/cart/cart.component').then((c) => c.CartComponent),title: 'Cart Page',},
      {path: 'wishlist', loadComponent: () =>import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),title: 'Wishlist Page',},
      {path: 'products',loadComponent: () =>import('./features/products/products.component').then((c) => c.ProductsComponent),title: 'Products Page',},
      {path: 'brands', loadComponent: () =>import('./features/brands/brands.component').then((c) => c.BrandsComponent),title: 'Brands Page',},
      {path: 'categories',loadComponent: () => import('./features/categories/categories.component').then( (c) => c.CategoriesComponent),title: 'Categories Page',},
      {path: 'allorders',loadComponent: () =>import('./features/allorders/allorders.component').then( (c) => c.AllordersComponent),title: 'All Orders Page',},
      {path: 'details/:slug/:id', loadComponent: () =>import('./features/details/details.component').then((c) => c.DetailsComponent),title: 'Details Page',},
      {path: 'details/:id',loadComponent: () =>import('./features/details/details.component').then((c) => c.DetailsComponent ), title: 'Details Page',},
      {path: 'specific-category/:slug/:id', loadComponent: () =>import('./features/specific-category/specific-category.component').then((c) => c.SpecificCategoryComponent),title: 'Category Products Page',},
      {path: 'specific-category/:id',loadComponent: () =>import('./features/specific-category/specific-category.component').then((c) => c.SpecificCategoryComponent ), title: 'Category Products Page',},
      {path: 'specific-brand/:slug/:id', loadComponent: () =>import('./features/specific-brands/specific-brands.component').then((c) => c.SpecificBrandsComponent),title: 'Brand  Page',},
      {path: 'specific-brand/:id',loadComponent: () =>import('./features/specific-brands/specific-brands.component').then((c) => c.SpecificBrandsComponent ), title: 'Brand  Page',},
      {path: 'checkout/:id',loadComponent: () => import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),title: 'Checkout Page', },
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];
