import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement
    console.log('Esta imagen revento >', this.elHost)
    // elNative.src = 'https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso.jpg'
    elNative.src = this.customImg
  }

  constructor(private elHost: ElementRef) {
    console.log(this.elHost)
   }

}
