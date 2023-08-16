import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from './courses.component';
import {RouterModule} from '@angular/router';
import {coursesRoutes} from './courses.routing';
import {SharedModule} from "../../../shared/shared.module";
import { CoursesListComponent } from './courses-list/courses-list.component';
import {CoursesDetailComponent} from "./courses-detail/courses-detail.component";
import {NgxDocViewerModule} from "ngx-doc-viewer";

@NgModule({
  declarations: [
      CoursesComponent,
      CoursesListComponent,
      CoursesDetailComponent
  ],
  imports: [
      RouterModule.forChild(coursesRoutes),
      CommonModule,
      SharedModule,
      NgxDocViewerModule
  ]
})
export class CoursesModule { }
