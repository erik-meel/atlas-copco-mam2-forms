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

  private customerSignatureName = '';
  private customerSignatureDate = '';
  private techSignatureDate = '';
  private dateMask = '';
  private language = currentLanguage;
  private rangeValue = '';
  private rangeImage = '';
  private productFamilies = {};
  private browserLocal = navigator.language;
  private dateOptions = {};
  private timeOptions = {};
  private selectedRangeIndex = 0;
  private Q2 = '';

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    this.loadProductFamilies();
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
          this.timeOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
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
  //   let that = this;
  //   Observable.timer(500).subscribe(
  //     () => {
  //       that.formService.saveHtmlToMel();
  //     }
  //   ); // In cordova it takes to much time to render the view so we have to wait for it
  }

  onCustomerSignatureEnd(): void {
    this.customerSignatureDate = (new Date()).toLocaleString(this.browserLocal, this.timeOptions);
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString(this.browserLocal, this.timeOptions);
    this.formService.saveHtmlToMel();
  }

  onTechSignatureClear(): void {
    this.techSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  tag(name: string): string {
    return this.INPUT.tag(name);
  }

  text(name: string): string{
    return textLiterals[this.language][name];
  }

  loadProductFamilies(): void {
    this.productFamilies = {
      'Ranges': [
  {'name': 'AQ15-55VSD', 'description': 'AQ 15-55 VSD/AQ 30-55' },
  {'name': 'BAPI12-142+', 'description': 'BAPI12-142+' },
  {'name': 'DZS100-200-400VSD+', 'description': 'DZS100-200-400VSD+' },
  {'name': 'FD5-95', 'description': 'FD5-95' },
  {'name': 'G7-15FF', 'description': 'G7-15FF' },
  {'name': 'G15L-22', 'description': 'G15L-22' },
  {'name': 'G90-355AC', 'description': 'G90-355AC' },
  {'name': 'G90-355VSDAC', 'description': 'G90-355VSDAC' },
  {'name': 'G200-250AC', 'description': 'G200-250AC' },
  {'name': 'G200-250WC', 'description': 'G200-250WC' },
  {'name': 'GA7-22VSD', 'description': 'GA7-22VSD' },
  {'name': 'GA11+-30', 'description': 'GA11+-30' },
  {'name': 'GA11-26', 'description': 'GA11-26' },
  {'name': 'GA30+-90', 'description': 'GA30+-90' },
  {'name': 'GA30-75VSD', 'description': 'GA30-75VSD' },
  {'name': 'GA75L-110VSD', 'description': 'GA75L-110VSD' },
  {'name': 'GA160+-315AC', 'description': 'GA160+-315AC' },
  {'name': 'GA160+-315FFAC', 'description': 'GA160+-315FFAC' },
  {'name': 'GA160+-315FFWC', 'description': 'GA160+-315FFWC' },
  {'name': 'GA160+-315WC', 'description': 'GA160+-315WC' },
  {'name': 'GA200-315VSDAC', 'description': 'GA200-315VSDAC' },
  {'name': 'GA200-315VSDFFAC', 'description': 'GA200-315VSDFFAC' },
  {'name': 'GA200-315VSDFFWC', 'description': 'GA200-315VSDFFWC' },
  {'name': 'GA200-315VSDWC', 'description': 'GA200-315VSDWC' },
  {'name': 'GA355-500AC', 'description': 'GA355-500AC' },
  {'name': 'GA355-500WC', 'description': 'GA355-500WC' },
  {'name': 'GAAIRCOOLED', 'description': 'GAAIRCOOLED' },
  {'name': 'GHS-VSD+', 'description': 'GHS-VSD+' },
  {'name': 'NGMS1-3', 'description': 'NGMS1-3' },
  {'name': 'NGP+', 'description': 'NGP/NGP+/OGP' },
  {'name': 'TCX4-90A', 'description': 'TCX 4-90A' },
  {'name': 'ZE3S', 'description': 'ZE3S' },
  {'name': 'ZH-2STAGE', 'description': 'ZH-2STAGE' },
  {'name': 'ZH-3STAGE', 'description': 'ZH-3STAGE' },
  {'name': 'ZL1-4', 'description': 'ZL1-4' },
  {'name': 'ZR55-90', 'description': 'ZR55-90' },
  {'name': 'ZR55-90FF', 'description': 'ZR55-90FF' },
  {'name': 'ZR55-90VSD', 'description': 'ZR75-90VSD' },
  {'name': 'ZR75-90VSDFF', 'description': 'ZR75-90VSDFF' },
  {'name': 'ZR110-275', 'description': 'ZR110-275' },
  {'name': 'ZR110-275FF', 'description': 'ZR110-275FF' },
  {'name': 'ZR132-315VSD', 'description': 'ZR132-315VSD' },
  {'name': 'ZR132-315VSDFF', 'description': 'ZR132-315VSDFF' },
  {'name': 'ZR300-750', 'description': 'ZR300-750' },
  {'name': 'ZR400-900VSD', 'description': 'ZR400-900VSD' },
  {'name': 'ZS4VSD', 'description': 'ZS4VSD' },
  {'name': 'ZS4VSD+', 'description': 'ZS4VSD+' },
  {'name': 'ZT55-90FF', 'description': 'ZT55-90FF' },
  {'name': 'ZT75-90VSDFF', 'description': 'ZT75-90VSDFF' },
  {'name': 'ZT110-275FF', 'description': 'ZT110-275FF' },
  {'name': 'ZT132-315VSDFF', 'description': 'ZT132-315VSDFF' },
  {'name': 'ZT-IFD', 'description': 'ZT-IFD' }
    ]}
  }

  onRangeSelect(selection: any): void {
    this.rangeValue = selection.target.value;
    let range = this.productFamilies['Ranges'].find((range:any)=>range.name==this.rangeValue);
    let selRange = <HTMLSelectElement>document.getElementById("selRange");
    this.selectedRangeIndex = selection.currentTarget.selectedIndex;

    this.formService.saveHtmlToMel();

  }

  onSettingValue(val: any): void {
    this.formService.saveHtmlToMel();
  }


}
