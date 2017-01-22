import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    loadEnter: boolean = false;
    loadExit: boolean = false;
    currentPath: string = '/home';

    constructor(private router: Router) {
        router.events.subscribe(event => {
            this.currentPath = this.router.url;
            if (event instanceof NavigationEnd) {
                if (this.loadEnter) { //Only activate the exit animation when the enter animation has been fired
                    this.loadExit = true;
                    setTimeout(() => this.loadExit = false, 500);
                }
                this.loadEnter = false;
            }
        })
    }

    navigateAnimated(targetPath) {
        this.loadEnter = true;
        this.currentPath = targetPath;
        setTimeout(() => this.router.navigate([targetPath]), 500);
    }
}