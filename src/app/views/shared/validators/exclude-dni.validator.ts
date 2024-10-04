import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para excluir un número de DNI específico
export function excludeDni(excludedNumber: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Si el valor es igual al número que quieres excluir
    if (value === excludedNumber) {
      return { excludedNumber: true };  // Devuelve un error si coincide
    }
    return null; 
  };
}