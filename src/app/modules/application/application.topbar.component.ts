import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <a class="menu-button" (click)="onMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>
            <div class="">
                Warehouse # - {{ dateToday | date:'fullDate' }}
            </div>
            <ul #topbarMenu class="topbar-menu">
                <li><a>{{ user_type }}</a></li>
                <li><a (click)="logout()">Logout</a></li>
            </ul>
        </div>
    `,
})
export class AppTopBarComponent implements OnInit {

    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('topbarMenu') topbarMenu!: ElementRef;

    user_email: any = localStorage.getItem('email');
    dateToday: any = localStorage.getItem('dateToday');
    user_type: any = localStorage.getItem('user_type');

    constructor(private router: Router) { }

    logout() {
        localStorage.clear();
        location.reload();
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }
    ngOnInit() { }
}
