import { MatDialog } from '@angular/material/dialog';
import { MyBillService } from './../../services/my-bill.service';
import { Component , Pipe} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AllProductsService } from 'src/app/services/all-products.service';
import {FormControl, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';
import { DataBetweenComponentsService } from 'src/app/services/data-between-components.service';
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
              public dialog: MatDialog,
              private data: DataBetweenComponentsService) {
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
formatDate(date:any) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
EvaluateDated() {
  // let day = this.range.value.start?.getDate();
  // let month = this.range.value.start?.getMonth();
  // let year = this.range.value.start?.getFullYear();

  
  // console.log(this.formatDate(this.range.value.start));
  // console.log((this.range.value.start?.toLocaleString("en-UK")));
  // console.log((this.range.value.start?.getDate()));
  // console.log((this.range.value.start?.getMonth()));
  // console.log((this.range.value.start?.getFullYear()));
  // console.log((this.range.value.start?.toLocaleTimeString()));
  // console.log((this.range.value.start?.toLocaleDateString()));
  // console.log('==========================');
  // console.log(JSON.stringify(this.range.value.start?.toLocaleString("en-UK")));
  // let theDate = JSON.stringify(this.range.value.start?.toLocaleString("en-US")
  //                             .replaceAll('/', '-')
  //                             .replaceAll(', ', 'T'));
  // console.log('theDate1 :', theDate);
  // theDate.replace('/', '-')
  // console.log('theDate 2:', theDate.replaceAll('/', '-'));
  // console.log(JSON.stringify(this.range.value.start?.toLocaleTimeString()));

  let presentableStartDate = this.range.value.start?.toLocaleDateString("en-UK");
  console.log('presentableStartDate :', presentableStartDate);
  let presentableEndtDate = this.range.value.end?.toLocaleDateString("en-UK");
  this.data.addPresentableStartDate(presentableStartDate);
  this.data.addPresentableEndDate(presentableEndtDate);

  let staringDate = this.formatDate(this.range.value.start);
  console.log('staringDate :', staringDate);
  staringDate += 'T00:00';
  this.startDate = staringDate;
  console.log('this.startDate :', this.startDate);

  let endindDate = this.formatDate(this.range.value.end);
  endindDate += 'T23:59';
  this.endDate = endindDate;
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
