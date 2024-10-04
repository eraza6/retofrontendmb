import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IDataResultCredit } from '../../core/models/credit-result.interface';
import { ResultComponent } from '../shared/components/result/result.component';
import { Router } from '@angular/router';
import { DATA } from '../shared/data';
import { ROUTES } from '../../core/models/routers';
import { excludeDni } from '../shared/validators/exclude-dni.validator';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, ResultComponent,
    RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  dataProgress!: IDataResultCredit;
  resultView: number = 0;
  resultShowView: boolean = false;
  data = DATA;
 

  welcomeForm = new FormGroup({
    numDoc: new FormControl('', [Validators.required, excludeDni('00000000'),  Validators.minLength(8), Validators.maxLength(8)]),
    names: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(100), Validators.max(2000) ]),
    checkboxTerms: new FormControl('', [Validators.required]),

  })

  router = inject(Router);
  
  onSubmit() {
    if (this.welcomeForm.invalid) {
      this.welcomeForm.markAllAsTouched(); // Marca todos los campos como tocados
    }
    const dni = this.welcomeForm.get('numDoc')!.value;
    const isData = this.data.filter(data => data.dni == dni);

    //this.resultView = isData.length > 0 ? 1 : 2;

    if (isData.length > 0) {
      this.dataResult(isData[0].name, 1);
    } else {
      this.dataResult("Hola", 2);
    }

    this.resultShowView = true;
    console.log("isData", isData[0])
    console.log("dni", dni)
    console.log("resultView", this.resultView)

  }

  dataResult(name: string, resultType: number) {
    this.dataProgress = {
      name: name,
      resultType: resultType,
    }
  }

  goWelcome() {
    this.router.navigate([
      ROUTES.APP.WELCOME.FULL_PATH
    ]);
  }
}
