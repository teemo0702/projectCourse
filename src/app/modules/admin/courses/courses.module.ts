import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from './courses.component';
import {RouterModule} from '@angular/router';
import {coursesRoutes} from './courses.routing';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
      CoursesComponent
  ],
  imports: [
      RouterModule.forChild(coursesRoutes),
      CommonModule,
      SharedModule,
  ]
})
export class CoursesModule { }
