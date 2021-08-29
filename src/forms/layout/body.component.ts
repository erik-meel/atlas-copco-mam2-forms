import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-body',
    template: `<div class="ho-body"><div class="container"><ng-content></ng-content></div></div>`,
    styleUrls: ['body.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BodyComponent { }
