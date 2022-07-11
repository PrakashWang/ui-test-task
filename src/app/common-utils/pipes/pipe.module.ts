import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FitlerListingPipe } from "./filter-listing.pipe";

@NgModule({
    declarations: [
        FitlerListingPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FitlerListingPipe
    ]
})

export class CustomPipeModule { }