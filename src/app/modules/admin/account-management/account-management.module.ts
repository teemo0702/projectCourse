import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountManagementComponent} from './account-management.component';
import {RouterModule} from '@angular/router';
import {accountManagementRoutes} from './account-management.routing';

@NgModule({
  declarations: [
      AccountManagementComponent
  ],
  imports: [
      RouterModule.forChild(accountManagementRoutes),
      CommonModule
  ]
})
export class AccountManagementModule { }
