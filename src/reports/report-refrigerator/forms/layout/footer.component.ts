import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ho-footer',
    template: `<footer id="ho-footer" class="ho-footer"><div class="container"><ng-content></ng-content></div></footer>`,
    styleUrls: ['footer.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent { }
