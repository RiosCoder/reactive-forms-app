import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country-interface';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = this.countryService.regions;
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  //para limpiar los campos cuando cambiamos de componente
  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      console.log('limpiado');
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap(
          (
            region //crea un nuevo observable
          ) => this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        //aqui sale la respuesta del nuevo obsevable
        console.log(countries);

        this.countriesByRegion.set(countries);
      });
  }
}
