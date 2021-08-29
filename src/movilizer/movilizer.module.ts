import {NgModule} from '@angular/core';

import {MovilizerService} from './movilizer.service';

@NgModule({
  providers: [
    { provide: 'Window',  useValue: window },
    MovilizerService,
  ]
})
export class MovilizerModule {
}
