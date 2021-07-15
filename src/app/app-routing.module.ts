import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views imports
import { LoginViewComponent } from './Views/login-view/login-view.component';
import { PortalViewComponent } from './Views/portal-view/portal-view.component';
import { WildcardViewComponent } from './Views/wildcard-view/wildcard-view.component';

// Components imports
import { ProgramsPanelComponent } from './Components/programs-panel/programs-panel.component';
import { ProgramDetailsComponent } from './Components/program-details/program-details.component';
import { AddProgramComponent } from './Components/add-program/add-program.component';

const routes: Routes = [
  { 
    path: 'login',
    pathMatch: 'full',
    component: LoginViewComponent 
  },
  { 
    path: 'portal/:username',
    component: PortalViewComponent,
    children: [
      {
        path: 'programs',
        component: ProgramsPanelComponent
      },
      {
        path: 'programs/:programid',
        component: ProgramDetailsComponent
      },
      {
        path: 'add-program',
        component: AddProgramComponent
      }
    ]
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: '**',
    component: WildcardViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
