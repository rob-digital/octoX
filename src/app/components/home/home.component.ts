import { MatDialog } from '@angular/material/dialog';
import { MyBillService } from './../../services/my-bill.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AllProductsService } from 'src/app/services/all-products.service';
import {FormControl, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allProducts: Product[] = [];
  disableSelect = true;
  selectedProduct: string = "";
  events: string[] = [];

  startDate: string = '';
  endDate: string = '';

  tariffAndDatesSelected = false;
  dataIsLoading = false;
  attemptCalculation = false;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private products: AllProductsService,
              private dateAdapter: DateAdapter<Date>,
              private bill: MyBillService,
              public dialog: MatDialog) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  this.products.getAllProducts().subscribe({
    next: (response) => {
      this.allProducts = response.results;
      this.disableSelect = false;
      console.log('this.allProducts:', this.allProducts);
    },
    error:  (err) => {
      console.log('Error from Home Component (getAllProducts)', err);
    }
  });
}

StartDateChange(e: any) {
  // console.log(e.value);
  this.CheckButtonDisable();
}
EndDateChange(e: any) {
  // console.log(e.value);
  this.EvaluateDated();
  this.CheckButtonDisable();
}

EvaluateDated() {
  console.log(JSON.stringify(this.range.value));
  let staringDate = JSON.stringify(this.range.value.start);
  this.startDate = staringDate.substring(1, staringDate.length - 9);
  console.log('startDate:', this.startDate)

  let endindDate = JSON.stringify(this.range.value.end);
  let newTime = '23:59';
  this.endDate = endindDate.substring(1, staringDate.length - 14) + newTime;
  console.log('endDate:', this.endDate)
}

OnCLickSubmit() {
  this.attemptCalculation = true;

  if (this.attemptCalculation)
    this.dataIsLoading = true;

  this.bill.calculateBill(this.selectedProduct, this.startDate, this.endDate).subscribe({
    next: response => {
      console.log(response);
      if (response != null) {
        this.bill.addDataToResults(response);
        this.openDialog();

        this.attemptCalculation = false;

        if (!this.attemptCalculation)
          this.dataIsLoading = false;
      }
      // if (response.status == 200) {
      //   console.log("GOOD");
      // }
    },
    error:  (err) => {
      console.log('Error from Home Component (calculateBill)', err);
    }
  })
}

CheckButtonDisable() {
  if (this.startDate != '' && this.endDate != '' && this.selectedProduct != '')
    this.tariffAndDatesSelected = true;
}

openDialog() {
  const dialogRef = this.dialog.open(DialogResultComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
// export class DialogContentExampleDialog {}
