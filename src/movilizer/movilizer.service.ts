import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MelVariable} from './mel-variable.model';
import {MasterdataRecord} from './masterdata-record.model';
import {Movilizer} from './cordova.plugin';
import {isNullOrUndefined} from "util";

declare var movilizer: any;

@Injectable()
export class MovilizerService {
  private movilizer: Movilizer;

  constructor() {
    console.log('Loaded movilizer plugin from cordova: ' + !(isNullOrUndefined(movilizer) || isNullOrUndefined(movilizer.readGlobalVariable)));
    this.movilizer = movilizer;
  }

  read(name: string, nameSpace: string): Observable<MelVariable> {
    return Observable.create((observer: Observer<MelVariable>) => {
      if (undefined === nameSpace || null === nameSpace || '' === nameSpace) {
        this.movilizer.readGlobalVariable(name,
          function (result: any) {
            // console.log('movilizer.readGlobalVariable: ' + JSON.stringify(result, null, 4));
            if ('OK' === result) {
              observer.error(new Error('Not valid result "OK" given by Movilizer.readGlobalVariable("' +
                name + '")'));
            } else {
              try {
                let out = new MelVariable(result);
                observer.next(out);
              } catch (e) {
                observer.error(e);
              }
            }
            observer.complete();
          },
          function (error: any) {
            console.error('movilizer.readGlobalVariable: ' + JSON.stringify(error, null, 4));
            observer.error(error);
            observer.complete();

          }
        );
      } else {
        this.movilizer.readGlobalVariableWithNamespace(name,
          function (result: any) {
            // console.log('movilizer.readGlobalVariableWithNamespace: ' + JSON.stringify(result, null, 4));
            if ('OK' === result) {
              observer.error(new Error('Not valid result "OK" given by Movilizer.readGlobalVariableWithNamespace("' +
                name + '", "' + nameSpace + '")'));
            } else {
              try {
                let out = new MelVariable(result);
                observer.next(out);
              } catch (e) {
                observer.error(e);
              }
            }
            observer.complete();
          },
          function (error: any) {
            console.error('movilizer.readGlobalVariableWithNamespace: ' + JSON.stringify(error, null, 4));
            observer.error(error);
            observer.complete();
          },
          nameSpace
        );
      }
    });
  }

  write(name: string, value: any, nameSpace: string) {
    if (undefined !== nameSpace) {
      this.movilizer.writeGlobalVariable(name, value);
    } else {
      this.movilizer.writeGlobalVariableWithNamespace(name, value, nameSpace);
    }
  }

  query(pool: number, group: string, filter: Object, returnSpec: Object): Observable<Array<MasterdataRecord>> {
    return Observable.create((observer: Observer<Array<MasterdataRecord>>) => {
      this.movilizer.queryMasterData(pool, group, filter, returnSpec,
        function (result: any) {
          console.log('movilizer.query: ' + JSON.stringify(result, null, 4));
          if ('OK' === result) {
            observer.error(new Error('Not valid result "OK" given by Movilizer.queryMasterData("' +
              pool + '", "' +
              group + '", "' +
              JSON.stringify(filter) + '", "' +
              JSON.stringify(returnSpec) + '")'));
          } else {
            try {
              let out: Array<MasterdataRecord> = [];
              for (let record in result) {
                if (result.hasOwnProperty(record)) {
                  out.push(new MasterdataRecord(result[record]));
                }
              }
              observer.next(out);
            } catch (e) {
              observer.error(e);
            }
          }
          observer.complete();
        },
        function (error: any) {
          console.error('movilizer.query: ' + JSON.stringify(error, null, 4));
          observer.error(error);
          observer.complete();
        }
      );
    });
  }
}
