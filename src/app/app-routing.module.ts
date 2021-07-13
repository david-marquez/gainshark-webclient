import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginViewComponent } from './Views/login-view/login-view.component';
import { PortalViewComponent } from './Views/portal-view/portal-view.component';
import { ProgramsPanelComponent } from './Components/programs-panel/programs-panel.component';
import { ProgramDetailsComponent } from './Components/program-details/program-details.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginViewComponent 
  },
  { 
    path: 'users/:username', 
    component: PortalViewComponent,
    children: [
      {
        path: 'programs',
        component: ProgramsPanelComponent
      },
      {
        path: 'programs/:programid',
        component: ProgramDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
