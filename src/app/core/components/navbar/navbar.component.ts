import { Component, Input } from '@angular/core';
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
    this.showButton = this.urlPath == "/inicio" ? this.showButton = false : this.showButton = true;
  }

  goWelcome() {
    this.router.navigate([
      ROUTES.APP.WELCOME.FULL_PATH
    ], { replaceUrl: true });
  }

}
