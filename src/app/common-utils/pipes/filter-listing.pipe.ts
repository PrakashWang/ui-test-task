import { Pipe, PipeTransform } from "@angular/core";
import { DateFormatUpdate, DateToMilliSeconds } from "../utils/common-functions";

@Pipe({
    name: 'filterListing',
    pure: false
})

export class FitlerListingPipe implements PipeTransform {
    transform(values: any[], filterValues?: any) {
        let filterData = Object.values(filterValues).filter(v => v != '')
        if (!filterData.length) {
            return values
        }
        return values.filter(v => {
            let isValidValue = true;
            if (filterValues.name) {
                isValidValue = !(!v.firstName.toLowerCase().includes(filterValues.name.toLowerCase()) && !v.lastName.toLowerCase().includes(filterValues.name.toLowerCase()));
            }
            if (filterValues.jobTitle && v.jobTitle.toLowerCase() != filterValues.jobTitle.toLowerCase()) {
                isValidValue = false;
            }
            if (filterValues.age && v.age != filterValues.age) {
                isValidValue = false;
            }

            if (filterValues.startDate && DateToMilliSeconds(filterValues.startDate) > DateToMilliSeconds(v.startDate)) {
                isValidValue = false;
            }

            if (filterValues.endDate) {
                let lastCompareDate = v.currentlyWorking ? DateToMilliSeconds(DateFormatUpdate()) : DateToMilliSeconds(v.endDate)
                if (lastCompareDate > DateToMilliSeconds(filterValues.endDate)) {
                    isValidValue = false
                }
            }
            

            return isValidValue
        });
    }
}