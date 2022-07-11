import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CharacterOnlyDirective } from "./character-only.directive";
import { NumberOnlyDirective } from "./number-only.directive";

@NgModule({
    declarations: [
        CharacterOnlyDirective,
        NumberOnlyDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CharacterOnlyDirective,
        NumberOnlyDirective
    ]
})

export class CustomDirectiveModule { }