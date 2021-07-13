import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './Views/login-view/login-view.component';
import { PortalViewComponent } from './Views/portal-view/portal-view.component';
import { ProgramsPanelComponent } from './Components/programs-panel/programs-panel.component';
import { ProgramDetailsComponent } from './Components/program-details/program-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    PortalViewComponent,
    ProgramsPanelComponent,
    ProgramDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
