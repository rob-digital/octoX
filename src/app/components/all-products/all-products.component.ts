import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AllProductsService } from 'src/app/services/all-products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
  allProducts: Product[] = [];

  constructor(private products: AllProductsService) { }

  ngOnInit(): void {
    this.products.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.results;
        console.log('this.allProducts:', this.allProducts);
      },
      error:  (err) => {
        console.log('Error from All Products', err);
      }
    });

    // subscribe(

    //   (response) => {
    //     console.log('RES: ', response);
    //     this.allProducts = response.results;
    //     console.log('this.allProducts:', this.allProducts);
    //   },
    //   (err) => {
    //     console.log('Error from All Products', err);
    //   }

    // );
  }
}
