/* tslint:disable:no-unused-variable */

import {async} from '@angular/core/testing';
import {MovilizerService} from './movilizer.service';
import {MelVariable} from './mel-variable.model';
import {Movilizer} from './cordova.plugin';

declare var movilizer: Movilizer;

describe('Service: Movilizer API Service', () => {
  let movilizerService: MovilizerService;

  beforeEach(() => {
    movilizer = new Movilizer();
    movilizerService = new MovilizerService();
  });

  it('should create the service', async(() => {
    expect(movilizerService).toBeTruthy();
  }));

  it(`should read 'This is a string value'`, async(() => {
    movilizer.mockResultForReadVariable('inputVar', {'myString': 'This is a string value'});

    let out = new MelVariable(null);
    movilizerService.read('inputVar', null).subscribe((result) => {
      out = result;
    });
    expect(out.tag('myString')).toEqual('This is a string value');
  }));
});
