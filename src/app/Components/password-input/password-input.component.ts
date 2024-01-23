import { Component, forwardRef, HostBinding, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true     
    }   
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

  constructor(
    protected injector: Injector,
  ) { }

  public value?: string;
  ngControl?: NgControl | null;

  get isValid() {
    return this.ngControl?.valid
  }
  
  onChange!: ((value: string) => void);
  onTouched!: (() => void);

  public writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void){
  this.onChange = fn
  }

  registerOnTouched(fn: () => void){
  this.onTouched = fn
  }

  ngAfterViewInit() {
    this.ngControl = this.injector.get(NgControl, null);
  
    this.ngControl?.valueChanges
      ?.subscribe(val => {
        console.log(val, this.ngControl?.validator)
      })
  }

}
