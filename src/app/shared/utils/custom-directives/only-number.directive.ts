import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

    // if (this._el.nativeElement.value.length === 4) {
    //   this._el.nativeElement.value = this._el.nativeElement.value.replace(/^(\d{2})(\d{2}).*/, '$1:$2');
    // }
  }

}