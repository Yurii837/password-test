import { AfterViewInit, Component, ElementRef, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { PasswordMultiplicityService } from '../../Services/password-multiplicity.service';
import { PType } from '../../Enums/password-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-indicators',
  templateUrl: './password-indicators.component.html',
  styleUrl: './password-indicators.component.scss'
})
export class PasswordIndicatorsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('indicator') indicators!: QueryList<ElementRef>;

  constructor(
    private passwordMultiplicityService: PasswordMultiplicityService,
  ) {}

  private _gray = 'rgb(204, 204, 204)';
  private _green = 'rgb(120, 234, 0)';
  private _warning = 'rgb(255, 238, 0)';
  private _danger = 'rgb(234, 120, 0)';

  private multiplicityTypeSubscription = new Subscription();

  ngAfterViewInit(): void {
    this.multiplicityTypeSubscription = this.passwordMultiplicityService.passwordMultiplicityType$
      .subscribe(passType  => {
        this.paintIndicators(passType);
      })
  }

  paintIndicators(passwordType: PType): void {
    const indicatorElements = this.indicators?.toArray() as ElementRef[];

    switch(passwordType) {
      case PType.simple: {
        indicatorElements[0].nativeElement.style.backgroundColor = this._danger;
        indicatorElements[1].nativeElement.style.backgroundColor = this._gray;
        indicatorElements[2].nativeElement.style.backgroundColor = this._gray;
      }
        break;
      case PType.medium: {
        indicatorElements[0].nativeElement.style.backgroundColor = this._warning;
        indicatorElements[1].nativeElement.style.backgroundColor = this._warning;
        indicatorElements[2].nativeElement.style.backgroundColor = this._gray;
      }
        break;
      case PType.strong: indicatorElements.forEach(el => el.nativeElement.style.backgroundColor = this._green);
        break;
      case PType.invalid: indicatorElements.forEach(el => el.nativeElement.style.backgroundColor = this._danger);
        break;
      default: indicatorElements.forEach(el => el.nativeElement.style.backgroundColor = this._gray);
    }
  }

  ngOnDestroy(): void {
    this.multiplicityTypeSubscription.unsubscribe();
  }

}
