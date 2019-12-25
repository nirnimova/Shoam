import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: '',
              component: AppComponent,
              children: [
                  { path: '**', component: HomeComponent },
                  { path: 'home', component: HomeComponent },
              ]
          }
      ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
