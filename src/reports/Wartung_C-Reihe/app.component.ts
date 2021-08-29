import {Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormService} from '../../forms';
import {MelVariable} from '../../movilizer';
import {textLiterals, currentLanguage} from "../shared/text-literals";

@Component({
  selector: 'my-form',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private INPUT: MelVariable = new MelVariable({});
  private allowSave: Boolean = true;
  private customerSignatureName = '';
  private customerSignatureDate = '';
  private techSignatureDate = '';
  private dateMask = '';
  private language = currentLanguage;

  private STATIC: MelVariable = new MelVariable({
      'MEASUREMENT_POINTS_ENTRIES': {
        '00': {
            'COUNTER': 'Omgevingstemperatuur ',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '01': {
            'COUNTER': 'Atmosferisch dauwpunt ',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '02': {
            'COUNTER': 'Droger verdampertemp. uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': '',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '03': {
            'COUNTER': 'LAT',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': false,
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'true',
            'OK':'false'
        },
        '04': {
            'COUNTER': 'Droger persluchttemp. in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '05': {
            'COUNTER': 'Droger persluchttemp. uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '06': {
            'COUNTER': 'Droger condensortemp. in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '07': {
            'COUNTER': 'Droger condensortemp. uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '08': {
            'COUNTER': 'Koelwater in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '09': {
            'COUNTER': 'Koelwater uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '10': {
            'COUNTER': 'Drukdauwpunt',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '11': {
            'COUNTER': '"R" verdamper in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '12': {
            'COUNTER': '"R" vloeistofvanger in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '13': {
            'COUNTER': '"R" Koelcompressor in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '14': {
            'COUNTER': '"R" Koelcompressor uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '74',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '15': {
            'COUNTER': '"R" Condensor in',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '13',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '16': {
            'COUNTER': '"R" Condensor uit',
            'READ_AFTER': '',
            'READ_UNIT': '°C',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '17': {
            'COUNTER': 'Werkdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '18': {
            'COUNTER': 'Droger inlaatdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '19': {
            'COUNTER': 'Droger uitlaatdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '20': {
            'COUNTER': 'Verschildruk voorfilter',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '21': {
            'COUNTER': 'Verschildruk nafilter',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '22': {
            'COUNTER': 'Koelcompressor zuigdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '23': {
            'COUNTER': 'Koelcompressor persdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '24': {
            'COUNTER': 'Verdamperdruk',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '25': {
            'COUNTER': 'Inschakeldruk fan',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '26': {
            'COUNTER': 'Uitschakeldruk fan',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '27': {
            'COUNTER': 'Minimum druk beveiliging',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '28': {
            'COUNTER': 'Maximum drukbeveiliging',
            'READ_AFTER': '',
            'READ_UNIT': 'Bar',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '29': {
            'COUNTER': 'Freon bijgevuld in kg',
            'READ_AFTER': '',
            'READ_UNIT': 'Kg',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '30': {
            'COUNTER': 'Freon afgezogen in kg',
            'READ_AFTER': '',
            'READ_UNIT': 'Kg',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        },
        '31': {
            'COUNTER': 'Lekkage verholpen',
            'READ_AFTER': '',
            'READ_UNIT': '',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
            'INSPECTED': 'false',
            'REPAIRED': 'false',
            'CLEANED':'false',
            'REPLACED':'false',
            'OK':'false'
        }
    },
    'MEASUREMENT_POINTS_ENTRIES_EXTRA': {
        '00': {
            'COUNTER': 'Belastingsgraad ',
            'READ_AFTER': '',
            'READ_UNIT': '%',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '01': {
            'COUNTER': 'Spanning onbelast L1 - L2 - L3',
            'READ_AFTER': '0',
            'READ_UNIT': 'V.',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '02': {
            'COUNTER': 'Spanning belast L1 - L2 - L3',
            'READ_AFTER': '',
            'READ_UNIT': 'V.',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '03': {
            'COUNTER': 'I . . Koelcompressor L1 - L2 - L3',
            'READ_AFTER': '',
            'READ_UNIT': 'A.',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '04': {
            'COUNTER': 'I . . Koelcompressor + fan L1 - L2 - L3',
            'READ_AFTER': '',
            'READ_UNIT': 'A.',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '05': {
            'COUNTER': 'Logboek ingevuld',
            'READ_AFTER': '',
            'READ_UNIT': 'Ja',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '06': {
            'COUNTER': 'Machinekaart ingevuld',
            'READ_AFTER': '',
            'READ_UNIT': 'Nee',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '07': {
            'COUNTER': 'CFK monteur nodig',
            'READ_AFTER': '',
            'READ_UNIT': 'Nee',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '08': {
            'COUNTER': 'CFK reparatie gemeld bij planning',
            'READ_AFTER': '',
            'READ_UNIT': 'Nee',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '09': {
            'COUNTER': 'Type lektester',
            'READ_AFTER': '',
            'READ_UNIT': 'refco',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '10': {
            'COUNTER': 'Serienummer',
            'READ_AFTER': '',
            'READ_UNIT': '',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        },
        '11': {
            'COUNTER': 'Certificaat nummer',
            'READ_AFTER': '',
            'READ_UNIT': '',
            'READ_BEFORE': '',
            'READ_LAST_VISIT': '',
        }
    }
  });

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;
          this.customerSignatureName = this.INPUT.get('CUST_CONTACT');
          let that = this;
            Observable.timer(200).subscribe(
              () => {
                that.formService.saveHtmlToMel();
              }
            );
        });
      },
      (error: any) => {
        console.log(error);
        this.formService.writeErrors(error, false);
      });
  }

  ngAfterViewInit() {
    let that = this;
    Observable.timer(500).subscribe(
      () => {
        that.formService.saveHtmlToMel();
      }
    ); // In cordova it takes to much time to render the view so we have to wait for it
  }

  onCustomerSignatureEnd(): void {
    this.customerSignatureDate = (new Date()).toLocaleString(this.language, this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.language, this.formService.dateTimeFormat);
    this.formService.saveHtmlToMel();
  }

  onTechSignatureClear(): void {
    this.techSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  saveHTML(){
    this.allowSave = false;
    this.formService.saveHtmlToMel();
  }

  text(name: string): string{
    return textLiterals["NL"][name];
  }
}
