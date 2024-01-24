import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @Input() hint: string = '';

  constructor(
    protected injector: Injector,
  ) { }

  public value?: string = '';
  public hide: boolean = true;

  
  onChange!: ((value: string) => void);
  onTouched!: (() => void);

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void){
  this.onChange = fn
  }

  public registerOnTouched(fn: () => void){
  this.onTouched = fn
  }

  public toggleVisibility(): void {
    this.hide = !this.hide;
  }

  public clearInput(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
  }

}
