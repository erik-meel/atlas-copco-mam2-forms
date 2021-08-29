import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-header',
    template: `<header id="ho-header" class="ho-header"><div class="container"><ng-content></ng-content></div></header>`,
    styleUrls: ['header.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent { }
