import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatButtonModule} from '@angular/material/button';
import {NgIf, NgFor} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TestChartComponent } from './components/test-chart/test-chart.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule} from '@angular/material/dialog';

import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogResultComponent } from './components/dialog-result/dialog-result.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    // TestChartComponent,
    AllProductsComponent,
    HomeComponent,
    DialogResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,

    // FormControl,
    // FormGroup,
    // FormsModule,
    ReactiveFormsModule,  // import only this

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatDatepickerInputEvent,

    MatDialogModule,
    MatProgressSpinnerModule,

    BrowserAnimationsModule,
    NgIf,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    NgFor,
    CanvasJSAngularChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  // exports: [
  //   MatInputModule
  // ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
