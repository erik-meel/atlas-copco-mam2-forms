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
  private productFamilies = {};
  private rangeValue = '';
  private rangeHeight = '';
  private selectedRangeIndex = 0;

  constructor(private formService: FormService, private context: NgZone) {
  }

  ngOnInit() {
    
    this.loadProductFamilies();
    this.selectedRangeIndex = 1;
    this.formService.saveHtmlToMel();
    this.formService.getInput().subscribe((formInput: MelVariable) => {
        this.context.run(() => {
          this.INPUT = formInput;
          this.language = 'CQK_ZH'; //this.INPUT.get('LANG') ? this.INPUT.get('LANG') : currentLanguage;
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
    this.customerSignatureDate = (new Date()).toLocaleString('zh_CN');
    this.formService.saveHtmlToMel();
  }

  onCustomerSignatureClear(): void {
    this.customerSignatureDate = '';
    this.formService.saveHtmlToMel();
  }

  onTechSignatureEnd(): void {
    this.techSignatureDate = (new Date()).toLocaleString('zh_CN');
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
  {'name': 'ADBDCDXD', 'description': 'AD BD CD XD', 'size': '40em' },
  {'name': 'AQ', 'description': 'AQ' },
  {'name': 'FFXFD', 'description': 'F FX FD' },
  {'name': 'IATGGA', 'description': 'IAT G GA' },
  {'name': 'L', 'description': 'LF LF+ LFR' },
  {'name': 'LCNAIRCUBE', 'description': 'LCN Aircube' },
  {'name': 'MDND', 'description': 'MDND' },
  {'name': 'MEDICAL', 'description': 'Medical' },
  {'name': 'NGP', 'description': 'NGP' },
  {'name': 'OFAGGA', 'description': 'OFA G GA' },
  {'name': 'PET', 'description': 'PET' },
  {'name': 'SF', 'description': 'SF' },
  {'name': 'ZB', 'description': 'ZB' },
  {'name': 'ZEZA', 'description': 'ZE ZA' },
  {'name': 'ZH', 'description': 'ZH' },
  {'name': 'ZM', 'description': 'ZM' },
  {'name': 'ZRZT', 'description': 'ZR ZT' },
  {'name': 'ZS', 'description': 'ZS' }
    ]}
  }

  onRangeSelect(selection: any): void {
    this.rangeValue = selection.target.value;
    let range = this.productFamilies['Ranges'].find((range:any)=>range.name==this.rangeValue);
    this.rangeHeight = range.size;
    let rangeTextArea = document.getElementsByName(this.rangeValue);
    //let selRange = <HTMLSelectElement>document.getElementById("selRange");
    this.selectedRangeIndex = selection.currentTarget.selectedIndex;

    this.formService.saveHtmlToMel();

  }

  onSettingValue(val: any): void {
    this.formService.saveHtmlToMel();
  }

}
