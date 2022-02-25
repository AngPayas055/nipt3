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
                <div class="menu-category">Menu : </div>
                <div class="menu-items" *ngFor="let item of sideNavItems">
                    <a routerLink="{{item.link}}" (click)="removeId()" routerLinkActive="router-link-exact-active">{{item.name}} </a>
                </div>
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

    adminSidNavItems: any[] = [
        {name: 'Sales/ Marketing', link: '/application/applicant-list'},
        {name: 'Yard Management', link: '/application/users'},
        {name: 'Receiving', link: '/application/applicant-list'},
        {name: 'Storage', link: '/application/users'},
        {name: 'Dispatching', link: '/application/applicant-list'},
        {name: 'Administration', link: '/application/users'},
    ]

    applicantSideNavItems: any[] = [
        {name: 'Profile', link: '/applicant/applicant-information'},
    ]

    sideNavItems: any [] = this.applicantSideNavItems;

    scrollable = true;

    user_type: any = localStorage.getItem('user_type');

    constructor(private el: ElementRef,private router: Router,) {
        if(this.user_type == "Office") this.sideNavItems = this.adminSidNavItems;
    }

    removeId() {
        localStorage.removeItem('applicant_id');
    }
}
