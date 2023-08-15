import { Route } from '@angular/router';
import {CoursesComponent} from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {CoursesDetailComponent} from "./courses-detail/courses-detail.component";

export const coursesRoutes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        children : [
            {
                path     : '',
                component: CoursesListComponent,
                pathMatch: 'full'
            },
            {
                path     : ':id',
                component: CoursesDetailComponent
            }
        ]
    },
];
