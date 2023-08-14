import { Route } from '@angular/router';
import {CoursesComponent} from './courses.component';
import {FileManagerListComponent} from "../apps/file-manager/list/list.component";
import {
    FileManagerFolderResolver,
    FileManagerItemResolver,
    FileManagerItemsResolver
} from "../apps/file-manager/file-manager.resolvers";
import {FileManagerDetailsComponent} from "../apps/file-manager/details/details.component";
import {CanDeactivateFileManagerDetails} from "../apps/file-manager/file-manager.guards";

export const coursesRoutes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        // children : [
        //     {
        //         path     : 'folders/:folderId',
        //         component: FileManagerListComponent,
        //         children : [
        //             {
        //                 path         : 'details/:id',
        //                 component    : FileManagerDetailsComponent
        //             }
        //         ]
        //     },
        //     {
        //         path     : '',
        //         component: FileManagerListComponent
        //     }
        // ]
    },
];
