import {
  Component, ElementRef, ViewChild, Input, Inject, NgZone, ViewEncapsulation, Renderer2, Output, EventEmitter,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FormService} from "../form.service";

declare var SignaturePad: any;


@Component({
  selector: 'ho-signature',
  templateUrl: 'signature.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['signature.component.css']
})
export class SignatureComponent {
  @ViewChild("image") public signaturePadImage: ElementRef;
  @ViewChild("signatureCanvas") public signaturePadCanvas: ElementRef;
  @ViewChild("signatureCanvasResized") public signaturePadCanvasResized: ElementRef;
  @ViewChild("dialog") public dialog: ElementRef;

  @Output() onEnd: EventEmitter<string> = new EventEmitter<string>();

  @Input() width: string = '220px';
  @Input() height: string = '90px';

  @Input() title = '';
  @Input() text = '';

  @Input() okButtonText = 'Ok';
  @Input() cancelButtonText = 'Cancel';

  blockButtons = false;

  closeDelayInMillis = 0;

  signatureData: Array<any> = [];
  signatureURL: SafeUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  visible = false;
  showCancelButton: boolean = true;
  $body: any;

  _signaturePad: any = null;
  // for more options check on: https://github.com/szimek/signature_pad
  options: Object = {
      dotSize: 5,
      minWidth: 1.5,
      maxWidth: 7.5,
      penColor: "black"
  };

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
              private sanitizer: DomSanitizer, private formService: FormService,
              private context: NgZone) {
  }

  ngAfterViewInit(): void {
    this.$body = document.querySelector('body');
    this.renderer.setAttribute(this.signaturePadImage.nativeElement, "width", this.width);
    this.renderer.setAttribute(this.signaturePadImage.nativeElement, "height", this.height);
    this.renderer.setAttribute(this.signaturePadCanvasResized.nativeElement, "width", this.width);
    this.renderer.setAttribute(this.signaturePadCanvasResized.nativeElement, "height", this.height);
    this._signaturePad = new SignaturePad(this.signaturePadCanvas.nativeElement, this.options);
    this.formService.isSavingToMel$.subscribe(isSaving => {
      this.blockButtons = isSaving;
    });
  }

  onClickSignature(): void {
    this.showSignPad();
  }

  showSignPad() {
    let padding = 30;
    let border = 8;
    let canvasWidth = this.dialog.nativeElement.clientWidth - padding - border;
    let canvasHeight = canvasWidth * this.getAspectRatio();
    this.renderer.setAttribute(this.signaturePadCanvas.nativeElement, "width", canvasWidth + 'px');
    this.renderer.setAttribute(this.signaturePadCanvas.nativeElement, "height", canvasHeight + 'px');
    if (this.signatureData) {
      this._signaturePad.fromData(this.signatureData);
    }
    this.$body.classList.add('modal-open');
    this.addBackdrop();
    this.visible = true;
  }

  getAspectRatio(): number {
    let height = Number(this.height.substring(0, this.height.length - 2));
    let width = Number(this.width.substring(0, this.width.length - 2));
    return height / width;
  }

  onClearButton(): void {
    if (!this.blockButtons) {
      this._signaturePad.clear();
    }
  }

  onClick(id: string) {
    switch (id) {
      case 'OK':
        if (!this.blockButtons) {
          this.signatureURL = this.toDataURLResized();
          this.formService.saveHtmlToMel$()
            .subscribe(() => { },
              e => console.error(e),
              () => {
                let hideModal = () => {
                  this.visible = false;
                  this.removeBackdrop();
                  this.$body.classList.remove('modal-open');
                  this.onEnd.next(this.signatureURL.toString())
                };
                if (this.closeDelayInMillis) {
                  setTimeout(() => {
                    this.context.run(hideModal);
                  }, this.closeDelayInMillis);
                } else {
                  hideModal()
                }
              });
        }
        break;
      case 'CANCEL':
      default:
        this.visible = false;
        this.removeBackdrop();
        this.$body.classList.remove('modal-open');
        break;
    }
  }

  addBackdrop() {
    let backdropDiv: any = document.createElement('div');
    backdropDiv.classList.add('modal-backdrop');
    backdropDiv.classList.add('ho-no-print');
    // backdropDiv.classList.add('fade'); //Start animated style for bootstrap
    backdropDiv.classList.add('in'); //End animated style for bootstrap
    this.$body.appendChild(backdropDiv);
  }

  removeBackdrop() {
    this.$body.removeChild(document.querySelector('div.modal-backdrop'));
  }

  private toDataURLResized(): SafeUrl {
    let originalCanvas: HTMLCanvasElement = this.signaturePadCanvas.nativeElement;
    let resizeCanvas: HTMLCanvasElement = this.signaturePadCanvasResized.nativeElement;
    let resizeContext = resizeCanvas.getContext('2d');
    resizeContext.clearRect(0, 0, resizeCanvas.width, resizeCanvas.height);
    let widhtInPixels: number = this.getPixels(this.width);
    let heightInPixels: number = this.getPixels(this.height);
    resizeContext.drawImage(originalCanvas, 0, 0, widhtInPixels, heightInPixels);
    return this.sanitizer.bypassSecurityTrustResourceUrl(resizeCanvas.toDataURL());
  }

  private getPixels(size: string): number {
    let length = size.length;
    let unit = size.substr(length - 2, 2);
    let pixels = size.substr(0, length - 2);
    if (unit != 'px') {
      console.warn('Expected unit for resize is px got: ' + unit);
    }
    return Number(pixels);
  }

}
