import { Route } from '@angular/router';
import {CoursesComponent} from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {CoursesDetailComponent} from "./courses-detail/courses-detail.component";
import {LessonListComponent} from "./lesson-list/lesson-list.component";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

export const coursesRoutes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        children : [
            {
                path     : '',
                component: CoursesListComponent
            },
            {
                path     : ':id',
                component: CoursesDetailComponent,
            },
            {
                path     : 'unit/:id',
                component: LessonListComponent,
            },
            {
                path     : 'unit/lesson/:id',
                component: LessonDetailComponent
            }
        ]
    },
];
