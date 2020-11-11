import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputCharacterMask]'
})
export class InputCharacterMaskDirective{
  private _regexstr:string = '^[a-zA-Z0-9_.-]*$';
  @Input("appInputCharacterMask") set regexstr(value){ 
    if(value) this._regexstr = value;
  }

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyPress(event) {
    if(!new RegExp(this._regexstr).test(event.key)){
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