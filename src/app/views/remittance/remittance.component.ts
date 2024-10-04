import { Component } from '@angular/core';

@Component({
  selector: 'app-remittance',
  standalone: true,
  imports: [],
  templateUrl: './remittance.component.html',
  styleUrl: './remittance.component.scss'
})
export class RemittanceComponent {


  downloadPdfCost() {
    window.open('https://drive.google.com/file/d/14DFIGx98PT7DK2guvvSdOktyTKIzhL4n/view?usp=sharing', '_blank', 'noopener');
  }

}
