import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PType } from '../Enums/password-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PasswordMultiplicityService {

  constructor() { }

  public passwordMultiplicityType$ = new BehaviorSubject<PType>(PType.default);

  private digitsRegexp = /[0-9]/;
  private lettersRegexp = /[a-zA-Z]/;
  private sumbolsRegexp = /[^\w\d]/;

  changeInputValueValidity(value: string = '', controlValid: boolean) {
    this.passwordMultiplicityType$.next(this.returnPasswordType(value, controlValid));
  }

  returnPasswordType(password: string, controlValid: boolean): PType  {
    const digitInclude = this.digitsRegexp.test(password);
    const letterInclude = this.lettersRegexp.test(password);
    const sumbolInclude = this.sumbolsRegexp.test(password);

      let truesCount = 0;
      [digitInclude, letterInclude, sumbolInclude].forEach((incl: boolean) => {
        incl && truesCount ++;
      });

      if(!controlValid) {
        truesCount = PType.invalid;
      }

      return truesCount as PType;
  }
}
