import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

import {PrintService} from '../forms';
import {MovilizerService, MelVariable} from '../movilizer';
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class FormService {
    public dateTimeFormat = {
        'year': 'numeric',
        'month': 'numeric',
        'day': 'numeric',
        'hour': 'numeric',
        'minute': 'numeric',
        'second': 'numeric'
    }

    private isSavingToMel: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isSavingToMel$: Observable<boolean> = this.isSavingToMel.asObservable();

    constructor(private movilizerService: MovilizerService, private printService: PrintService) { }

    getInput() {
        return Observable.create((observer: Observer<MelVariable>) => {
                this.movilizerService.read('FORM_INPUT', null).subscribe((data: MelVariable) => {
                    observer.next(data);
                    observer.complete();
                });
        });
    }

    public saveHtmlToMel$(): Observable<string> {
      this.isSavingToMel.next(true);
      return Observable.timer(200)
        .flatMap(() => this.printService.getHTMLEmbedded())
        .do(htmlString => this.movilizerService.write('FORM_OUTPUT_HTML', htmlString, null))
        .finally(()=> this.isSavingToMel.next(false));
    }

    public saveHtmlToMel(){
      this.saveHtmlToMel$().subscribe(
        ()=> console.log('HTML print complete'),
        e => console.error(e))
    } //= throttle(this.saveHtmlToMelImmediate, 250);

    writeErrors(error: any, isProduction: boolean) {
      this.movilizerService.write('FORM_ERRORS', JSON.stringify(error, null, 4), null);
    }
}

let throttle = function(func: Function, wait: number) {
  let timeout: any, context: any, args: any, result: any;
  let previous = 0;
  let options: any = {};

  let later = function() {
    previous = options.leading === false ? 0 : dateNow();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function() {
    let now = dateNow();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  return throttled;
};

let dateNow = Date.now || function() {
  return new Date().getTime();
};
