import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrl: './adress-form.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AdressFormComponent implements OnInit, OnDestroy {
  parentContainer = inject(ControlContainer);
  @Input() public controlKey = '';

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.fb.group({
        address1: this.fb.control(null, [Validators.required]),
        address2: this.fb.control(null),
        city: this.fb.control(null, [Validators.required]),
        postcode: this.fb.control(null, [Validators.required]),
        county: this.fb.control(null),
        country: this.fb.control(null, [Validators.required]),
      })
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
