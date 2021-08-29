import {Component, ElementRef, Renderer, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'ho-checkbox',
  template: `<input #checkbox id="checkbox-id" type="checkbox" value="{{ _value }}"><label for="checkbox-id"></label>`,
  styleUrls: ['checkbox.component.css']
})
export class CheckboxComponent {
  @ViewChild('checkbox') checkboxRef: ElementRef;

  private _checked: boolean = false;
  private _disabled: boolean = false;
  private _value: string = 'none';

  constructor(public renderer: Renderer) {
  }

  @Input('checked') set checked(isChecked: string) {
    this._checked = isChecked == '' ? false : true;
    this._checked = isChecked == 'true' ? true : false;

    if (this._checked) {
      this.renderer.setElementClass(this.checkboxRef.nativeElement, 'checked', true);
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'checked', 'checked');
    } else {
      this.renderer.setElementClass(this.checkboxRef.nativeElement, 'checked', false);
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'checked', null);
    }
  }

  @Input('disabled') set disabled(isDisabled: string) {
    this._disabled = isDisabled == 'false' ? false : true;

    if (this._disabled) {
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'disabled', 'disabled');
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'readonly', 'readonly');
    } else {
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'disabled', null);
      this.renderer.setElementAttribute(this.checkboxRef.nativeElement, 'readonly', null);
    }
  }

  @Input('value') set value(inputValue: string) {
    this._value = inputValue;
  }
}
