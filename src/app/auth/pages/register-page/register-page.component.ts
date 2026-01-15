import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.namePattern)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.formUtils.notOnlySpacesPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  /**
   * name -> obligatorio
   * email -> obligatorio y un email (Vaidators.email?)
   * username -> obligatorio, minLength 6
   * password -> obligatorio, minLength 6
   * password2 -> obligatorio (confirmPassword seria un mejor nombre)
   */

  onSave() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
    //this.myForm.reset();
  }
}
