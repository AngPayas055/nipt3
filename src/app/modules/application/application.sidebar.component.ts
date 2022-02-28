import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'active': active}">
            <a routerLink="#" class="logo">
                <img alt="logo" src="../../../assets/images/berben.png"/>
            </a>
            <div class="layout-menu">
                <div class="menu-category">Main Menu : </div>
                
                    <div class="menu-items">
                        <a routerLink="/Sales" routerLinkActive="router-link-exact-active">Sales / Marketing</a>
                        <a routerLink="/yard" routerLinkActive="router-link-exact-active">Yard Management</a>
                        <a routerLink="/receiving" routerLinkActive="router-link-exact-active">Receving Management</a>
                        <a routerLink="/storage" routerLinkActive="router-link-exact-active">Storage Management</a>
                        <a routerLink="/dispatching" routerLinkActive="router-link-exact-active">Dispatching Management</a>
                        <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/administration')">Administration</a>
                        <div [@submenu]="isSubmenuActive('/administration') ? 'visible': 'hidden'">
                            <ul>
                                <li><a routerLink="/application/user" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Modules</a></li>
                                <li><a routerLink="/application/user" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Users</a></li>
                                <li><a routerLink="/application/user"routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Companies</a></li>
                                <li><a routerLink="/application/user" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Branches</a></li>
                            </ul>
                        </div>
                    </div>

               <!-- <div class="menu-category">Main Menu : </div>
                    <div class="menu-items" *ngFor="let item of sideNavItems">
                        <a routerLink="{{item.link}}" routerLinkActive="router-link-exact-active">{{item.name}}</a>
                    </div>
                <div class="menu-category">Administration : </div>
                    <div class="menu-items" *ngFor="let item of sideNavSubItems">
                        <a routerLink="{{item.link}}" routerLinkActive="router-link-exact-active">{{item.name}} </a>
                    </div> -->
            </div>
        </div>
    `,
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden',
                opacity: 0,
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        ])
    ]
})
export class AppMenuComponent {

    @Input() active!: boolean;

    activeSubmenus: {[key: string]: boolean} = {};

    adminSidNavItems: any[] = [
        {name: 'Sales/ Marketing', link: '/application/sales'},
        {name: 'Yard Management', link: '/application/yard'},
        {name: 'Receiving Management', link: '/application/receiving'},
        {name: 'Storage Management', link: '/application/storage'},
        {name: 'Dispatching Management', link: '/application/dispatching'},
    ]

    adminSidNavSubItems: any[] = [
        {name: 'Modules', link: '/application/modules'},
        {name: 'Users', link: '/application/users'},
        {name: 'Companies', link: '/application/companies'},
        {name: 'Branches', link: '/application/branches'},
    ]

    userSideNavItems: any[] = [
        // {name: 'Profile', link: '/applicant/applicant-information'},
    ]

    userSideNavSubItems: any[] = [
        {name: '', link: ''},
    ]

    sideNavItems: any [] = this.userSideNavItems;
    sideNavSubItems: any [] = this.userSideNavSubItems;

    scrollable = true;

    user_type: any = localStorage.getItem('user_type');

    constructor(private el: ElementRef,private router: Router,) {
        if(this.user_type == "Admin") this.sideNavItems = this.adminSidNavItems; this.sideNavSubItems = this.adminSidNavSubItems;
    }

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenuActive(name: string) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }
    
}
