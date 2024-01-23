import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PType } from './Enums/password-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren('indicator') indicators!: QueryList<ElementRef>;

  public passwordInput = new FormControl<string>('', Validators.minLength(8));
  public hide = true;
  private currentPasswordType: string = '';

  private digitsRegexp = /[0-9]/;
  private lettersRegexp = /[a-zA-Z]/;
  private sumbolsRegexp = /[^\w\d]/;

  private gray = 'rgb(204, 204, 204)';
  private green = 'rgb(120, 234, 0)';
  private warning = 'rgb(255, 238, 0)';
  private danger = 'rgb(234, 120, 0)';

  private inputChangesSubscription = new Subscription();


  inputPassword = new FormControl('initial input');

  get hint() {
    return this.passwordInput.invalid
    ? '8 sumbols require'
    : this.currentPasswordType === PType[1] 
      ? 'easy' 
      :  this.currentPasswordType === PType[2]
        ? 'medium' : 'strong';
  }

  ngOnInit(): void {
    this.inputPassword.valueChanges
      .subscribe(val => {
        console.log(val)
      })


    this.inputChangesSubscription = this.passwordInput.valueChanges
      .subscribe(value => {
        
        if (value) {
          const indicatorElements = this.indicators.toArray() as ElementRef[]
          const less8 = this.passwordInput.invalid;
          const digitInclude = this.digitsRegexp.test(value?.toString());
          const letterInclude = this.lettersRegexp.test(value?.toString());
          const sumbolInclude = this.sumbolsRegexp.test(value?.toString());

          const passwordType = (() => {
            let truesCount = 0;
            [digitInclude, letterInclude, sumbolInclude].forEach((incl: boolean) => {
              incl && truesCount ++;
            });

            this.currentPasswordType = PType[truesCount]
            return this.currentPasswordType
          })();

          indicatorElements[0].nativeElement.style.backgroundColor = 
            less8 || passwordType === PType[1] 
              ? this.danger 
              : passwordType === PType[2] 
                ? this.warning
                : passwordType === PType[3]
                  ? this.green : this.gray;

          indicatorElements[1].nativeElement.style.backgroundColor = 
            less8 
              ? this.danger 
              : passwordType === PType[2] 
                ? this.warning
                : passwordType === PType[3]
                  ? this.green : this.gray

          indicatorElements[2].nativeElement.style.backgroundColor = 
            less8 
              ? this.danger 
              : passwordType === PType[3]
                ? this.green : this.gray

        } else {
          this.indicators.forEach(el => {
            el.nativeElement.style.backgroundColor = this.gray;
          })
        }

      })
    
  }

  ngOnDestroy(): void {
    this.inputChangesSubscription.unsubscribe();
  }

}