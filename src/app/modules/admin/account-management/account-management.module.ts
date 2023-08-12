import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountManagementComponent} from './account-management.component';
import {RouterModule} from '@angular/router';
import {accountManagementRoutes} from './account-management.routing';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from "../../../shared/shared.module";
import { AddOrEditAccountComponent } from './add-or-edit-account/add-or-edit-account.component';

@NgModule({
  declarations: [
      AccountManagementComponent,
      AddOrEditAccountComponent
  ],
  imports: [
      RouterModule.forChild(accountManagementRoutes),
      CommonModule,
      SharedModule,
  ]
})
export class AccountManagementModule { }
