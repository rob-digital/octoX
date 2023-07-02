import { MyBillService } from 'src/app/services/my-bill.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss']
})
export class DialogResultComponent {

  passedStartDate: string = '';
  results: any = [];
  totalSum: number = 0;
  totalKWh: number = 0;

  constructor(private bill: MyBillService) {}

  ngOnInit(): void {
    this.results = this.bill.getDataFromResults();
    console.log('this.results2:', this.results.value);

    // this.CalculateTotal();
  }

  // CalculateTotal() {
  //   for (let sum of this.results.)
  // }
}
