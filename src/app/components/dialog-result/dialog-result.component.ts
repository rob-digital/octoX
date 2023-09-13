import { MyBillService } from 'src/app/services/my-bill.service';
import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {NgIf, NgFor, CommonModule, DecimalPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { DataBetweenComponentsService } from 'src/app/services/data-between-components.service';
import {MatChipsModule} from '@angular/material/chips';
import { ChipColour } from 'src/app/interfaces/chipColour';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
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
     NgFor,
     CommonModule,
     DecimalPipe,
     MatChipsModule,
     MatSlideToggleModule,
     FormsModule,
     MatBottomSheetModule,
     MatInputModule,
     MatSelectModule,
     MatFormFieldModule
    ],
})

// @Pipe({name : 'number'})

export class DialogResultComponent implements OnInit, AfterViewInit {

  @ViewChild('billingDialog') bill_dialog!: ElementRef;

  passedStartDate: string = '';
  results: any = [];
  billData: any = [];
  totalCost: number = 0;
  totalKW: number = 0;
  retrivedStartDate: any = '';
  retrivedEndDate: any = '';
  KW_chosen: boolean = false;
  timeout:any = null;
  chart: any;
  selectedGraph: string = ''
  typesOfGraphs: string[] = ['column', 'bar', 'line', 'pie', 'area', 'funnel'];
  graphName: any = '';

  chartOptions = {
	  title: {
		  text: ""
	  },
    zoomEnabled: true,
	  animationEnabled: true,
	  axisY: {
      includeZero: false,
      minimum: 0,
      suffix: "",
      prefix: "£"
	  },
    axisX: {
      // minimum: 0
      title: "Date",
    },
	  data: [{
		type: 'column', //change type to bar, line, area, pie, etc
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
	  }],
	}

  availableColors: ChipColour[] = [
    {name: 'none', color: undefined},
    {name: 'Primary', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'},
  ];

  constructor(private bill: MyBillService,
              private data: DataBetweenComponentsService,
             private myElement: ElementRef,
             private _bottomSheet: MatBottomSheet
             ) {
    this.myElement.nativeElement
  }

  ngOnInit(): void {
    this.results = this.bill.getDataFromResults();
    this.billData = this.results.value;
    console.log('this.billData:', this.billData)

    this.retrivedStartDate = this.data.getDataFromPresentableStartDate();
    this.retrivedEndDate = this.data.getDataFromPresentableEndDate();
    // this.graphName = this.data.getNewGraphName().subscribe({next: res => res});

    // this.chartOptions.data[0].dataPoints.length = 0;
    this.billData.length <= 12 ? this.chartOptions.data[0].indexLabel = "{y}" : null;

    this.totalCost = this.billData.reduce((acumulator: number, b: any) =>  acumulator + b.dailyAmountBilled , 0)
    this.totalKW = this.billData.reduce((acumulator: number, b: any) =>  acumulator + b.totalKWh , 0)

    //get value from BehaviorSubjects
    this.data.getNewGraphName().subscribe( value => {
      this.graphName = value;
    })

    this.chartOptions.data[0].dataPoints.length = 0;
    // this.chartOptions.axisX.minimum = Number(this.billData[0].date[2]);
    for (let i = 0; i < this.billData.length; i++) {
      this.chartOptions.data[0].dataPoints.push({ x: Number(this.billData[i].date[2]), y: this.billData[i].dailyAmountBilled })
    }

  }


  getChartInstance(chart: object) {
    console.log('chart:', chart)
    this.chart = chart;
    // setTimeout(this.updateChart, 1000);
    // this.chart.render()
  }

	updateChart = (e: any) => {
		this.chartOptions.data[0].dataPoints = [];

    setTimeout(() => {
      if (e.checked) {
        this.chartOptions.axisY.suffix = 'KW'
        this.chartOptions.axisY.prefix = ''
      } else {
        this.chartOptions.axisY.prefix = '£'
        this.chartOptions.axisY.suffix = ''
      }

      for (let i = 0; i < this.billData.length; i++) {
        this.chartOptions.data[0].dataPoints.push({ x: Number(this.billData[i].date[2]), y: e.checked ? this.billData[i].totalKWh : this.billData[i].dailyAmountBilled })
      }
      this.chart.render();
    }, 500);
	}


  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  changeGraph() {
    this.data.addNewGraphName(this.selectedGraph);
    this.chartOptions.data[0].type = this.selectedGraph;

    this.data.getNewGraphName().subscribe( value => {
      this.graphName = value;
    })
    console.log(this.graphName);
    setTimeout(() => {
      this.chart.render();
    }, 500);
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
