import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarIconAreaComponent } from './layout/sidebar-icon-area/sidebar-icon-area.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarNavComponent } from './layout/sidebar-nav/sidebar-nav.component';
import { SidebarFooterComponent } from './layout/sidebar-footer/sidebar-footer.component';
import { HomeComponent } from './home/home.component';
import { QueuesStatusComponent } from './home/cards/queues-status/queues-status.component';
import { FlotChartComponent } from './home/cards/flot-chart/flot-chart.component';
import { MessageGridFilterComponent } from './home/cards/message-grid-filter/message-grid-filter.component';
import { MessageGridComponent } from './home/cards/message-grid/message-grid.component';
import { DataTablesModule } from 'angular-datatables';
import { ExpandableRowComponent } from './home/cards/message-grid/expandable-row/expandable-row.component';
import { MessagesAlertComponent } from './home/cards/message-grid/messages-alert/messages-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from './services/messages.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { StorageServiceModule } from "ngx-webstorage-service";
import { StorageService } from './services/storage.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SidebarIconAreaComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    HomeComponent,
    QueuesStatusComponent,
    FlotChartComponent,
    MessageGridFilterComponent,
    MessageGridComponent,
    ExpandableRowComponent,
    MessagesAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    StorageServiceModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule
  ],
  providers: [
    MessagesService,
    StorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ExpandableRowComponent]
})
export class AppModule { }
