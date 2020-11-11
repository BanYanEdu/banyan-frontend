import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[numericInputOnly]'
})
export class NumericOnlyDirective {
  private _regexstr: string = '^[0-9]$';
  @Input("numericInputOnly") set regexstr(value) {
    if (value) this._regexstr = value;
  }

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyPress(event) {
    // Left / Up / Right / Down Arrow, Delete, Tab keys
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40
      || event.keyCode == 8 || event.keyCode == 9) {
      return;
    }
    if (!new RegExp(this._regexstr).test(event.key)) {
      event.preventDefault();
      return false;
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}