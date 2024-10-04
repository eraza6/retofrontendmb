import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../core/models/routers';
import { IDataResultCredit } from '../../../../core/models/credit-result.interface';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  @Input() data!: IDataResultCredit;

  constructor(
    private router: Router,
  ) { }

  goWelcome() {
    this.router.navigate([
      ROUTES.APP.WELCOME.FULL_PATH
    ]).then(() => {
      // Forzar recarga de la página para que recargue otra vez los valores
      window.location.reload();
    });
  }
}