import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginViewComponent } from './Views/login-view/login-view.component';
import { PortalViewComponent } from './Views/portal-view/portal-view.component';
import { ProgramsPanelComponent } from './Components/programs-panel/programs-panel.component';
import { ProgramDetailsComponent } from './Components/program-details/program-details.component';
import { AddProgramComponent } from './Components/add-program/add-program.component';

import { GenericFilterPipe } from './Pipes/generic-filter.pipe';
import { WildcardViewComponent } from './Views/wildcard-view/wildcard-view.component';

import { AuthenticateInterceptor } from './Interceptors/authentication/authenticate.interceptor';
import { HttpErrorInterceptor } from './Interceptors/http-error/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    PortalViewComponent,
    ProgramsPanelComponent,
    ProgramDetailsComponent,
    AddProgramComponent,
    GenericFilterPipe,
    WildcardViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
