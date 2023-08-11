import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from './courses.component';
import {RouterModule} from '@angular/router';
import {coursesRoutes} from './courses.routing';

@NgModule({
  declarations: [
      CoursesComponent
  ],
  imports: [
      RouterModule.forChild(coursesRoutes),
      CommonModule
  ]
})
export class CoursesModule { }
