import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PType } from './Enums/password-type.enum';
import { Subscription } from 'rxjs';
import { PasswordMultiplicityService } from './Services/password-multiplicity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private passwordMultiplicityService: PasswordMultiplicityService,
  ) {}

  get formValid() {
    return this.passwordInput.valid;
  }

  get errors() {
    return this.passwordInput.errors;
  }

  private inputChangesSubscription = new Subscription();
  private multiplicityTypeSubscription = new Subscription();

  public passwordInput = new FormControl<string>('', Validators.minLength(8));
  public hint: string | any = ''

  ngOnInit(): void {

    this.inputChangesSubscription = this.passwordInput.valueChanges
      .subscribe(value => {
        this.passwordMultiplicityService.changeInputValueValidity(value?.toString(), this.formValid);
      })

    this.multiplicityTypeSubscription = this.passwordMultiplicityService.passwordMultiplicityType$
      .subscribe(passType => {
        this.hint = this.formValid ? PType[passType].toString() : JSON.stringify(this.errors);
      })
  }

  ngOnDestroy(): void {
    this.inputChangesSubscription.unsubscribe();
    this.multiplicityTypeSubscription.unsubscribe();
  }

}