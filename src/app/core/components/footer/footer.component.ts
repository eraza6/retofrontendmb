import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../models/routers';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  router = inject(Router);

  goToCalculator() {
    this.router.navigate([
      ROUTES.APP.CALCULATOR.FULL_PATH
    ]).then(() => {
      window.location.reload();
    });
  }
}
