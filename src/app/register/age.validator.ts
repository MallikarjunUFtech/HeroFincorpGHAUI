import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class AgeValidator {
    static ageLimit(control: AbstractControl) : ValidationErrors | null {

        if((control.value as number) >70 || (control.value as number)<0.3){
        return {ageLimit: true}
        }
  	   return null;
    }
}