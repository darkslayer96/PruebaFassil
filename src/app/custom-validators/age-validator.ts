import { AbstractControl } from "@angular/forms";
import * as moment from "moment";
import { DateTimeUtils } from "../datetime-utils";


export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
   
    let dateUTC = DateTimeUtils.UtcDate(control.value)

    let age = moment().diff(dateUTC, 'years', true)

    if(age > 30){
        return {'edadInvalida': true}
    }
    return null
}