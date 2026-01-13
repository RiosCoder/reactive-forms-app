import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formsUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ],
      Validators.minLength(3)
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  //


  getFieldError11(formArray:FormArray,fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor minimo de ${errors['min'].min}`
      }
    }
    return null;
  }
}
