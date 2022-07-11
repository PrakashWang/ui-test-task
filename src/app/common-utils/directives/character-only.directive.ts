import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[charater-only]'
})

export class CharacterOnlyDirective {
    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z \s]*/g, '');
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}