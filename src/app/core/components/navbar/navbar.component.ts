import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from './../../models/routers';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  urlPath: string ="";
  showButton:boolean = false;
  constructor(
    private router: Router,
  ) { 
    this.urlPath = location.pathname;
    switch (this.urlPath) {
			case '/inicio':
				this.showButton = false
        break;
			default:
				this.showButton = true
				break;
		}
  }

  goWelcome() {
    this.router.navigate([
      ROUTES.APP.WELCOME.FULL_PATH
    ]);
  }

}
