import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                const role = localStorage.getItem('roleUser') ?? null;
                const menu = cloneDeep(this._defaultNavigation);
                let menuNew: any[];
                if (role !== 'ADMIN') {
                    menuNew = this.loadUserNavigation(menu);
                } else {
                    menuNew = this._defaultNavigation;
                }

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(menuNew),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }

    loadUserNavigation(listMenu: any): any[] {
        listMenu.forEach(menu => {
            if (menu.id === 'dashboards') {
                menu.children.splice(1, 1);
            }
        })
        let arrInfo = {
            id: 'hrmManagement',
            title: 'hrm-info.title',
            type: 'group',
            icon: 'heroicons_outline:home',
            link: '/hrm-info',
            children: [
                {
                    id: 'profile',
                    title: 'profile.title',
                    type: 'basic',
                    icon: 'heroicons_outline:user',
                    link: '/hrm-info/profile-management',
                },
                {
                    id: 'diagram',
                    title: 'hrm-management.diagram.title',
                    type: 'basic',
                    icon: 'heroicons_outline:icon_diagram',
                    link: '/hrm-info/diagram-management',
                },
            ],
        }
        return listMenu;
    }
}
