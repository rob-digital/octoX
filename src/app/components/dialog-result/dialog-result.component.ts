import { MyBillService } from 'src/app/services/my-bill.service';
import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {NgIf, NgFor, CommonModule, DecimalPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { DataBetweenComponentsService } from 'src/app/services/data-between-components.service';
// import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss'],  
  standalone: true,
  imports: [CanvasJSAngularChartsModule,
     MatDialogModule, 
     MatDividerModule,
     MatButtonModule,
     NgIf,
     DecimalPipe
    ],
})

// @Pipe({name : 'number'})

export class DialogResultComponent implements OnInit, AfterViewInit {

  @ViewChild('billingDialog') bill_dialog!: ElementRef;

  passedStartDate: string = '';
  results: any = [];
  billData: any = [];
  totalCost: number = 0;
  totalKWh: number = 0;
  retrivedStartDate: any = '';
  retrivedEndDate: any = '';

  chartOptions = {
	  title: {
		  text: "Angular Column Chart with Index Labels"
	  },
	  animationEnabled: true,
	  axisY: {
      includeZero: false,
      minimum: 0
	  },
    axisX: {
      minimum: 0
    },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		indexLabel: "", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: [
			{ x: 0, y: 0 },
			// { x: 20, y: 55 },
			// { x: 30, y: 50 },
			// { x: 40, y: 65 },
			// { x: 50, y: 71 },
			// { x: 60, y: 92, indexLabel: "Highest\u2191" },
			// { x: 70, y: 68 },
			// { x: 80, y: 38, indexLabel: "Lowest\u2193"  },
			// { x: 90, y: 54 },
			// { x: 100, y: 60 }
		]
	  }]
	}


  constructor(private bill: MyBillService, 
              private data: DataBetweenComponentsService,
             private myElement: ElementRef) {
    this.myElement.nativeElement
  }

  ngOnInit(): void {
    this.results = this.bill.getDataFromResults();
    console.log('this.results2:', this.results.value);
    this.billData = this.results.value;

    this.retrivedStartDate = this.data.getDataFromPresentableStartDate();
    this.retrivedEndDate = this.data.getDataFromPresentableEndDate();

    this.chartOptions.data[0].dataPoints.length = 0;
    this.billData.length <= 12 ? this.chartOptions.data[0].indexLabel = "{y}" : null;

    for (let i = 0; i < this.billData.length; i++) {
      this.chartOptions.data[0].dataPoints.push({ x: i, y: this.billData[i].totalElectCost })
    }
    console.log("Chart...", this.chartOptions.data[0].dataPoints);

    this.totalCost = this.billData.reduce((acumulator: number, b: any) =>  acumulator + b.totalElectCost , 0)
    console.log('this.totalCost :', this.totalCost);
  }

  ngAfterViewInit(): void {
      // let billDialog = this.bill_dialog.nativeElement
      // billDialog.style.width = '80vw'
      // console.log('billDialog 2:', this.bill_dialog.nativeElement);
      // let billDialog2 = document.getElementById('billingDioalog');
      // console.log('billDialog4 :', billDialog2);
  }
  // CalculateTotal() {
  //   for (let sum of this.results.)
  // }
}
