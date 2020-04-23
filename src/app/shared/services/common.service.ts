import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  onlyRationalNumbersAllow(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    const value = event.target.value + '' + event.key;
    const length = value.substring(value.indexOf('.')).length;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      return false;
    } else if (length > 3 && value.indexOf('.') > 0) {
      return false;
    } else if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return false;
    } else if (value === '.') {
      return false;
    }
    return true;
  }

  // allow only number
  onlyNumberAllow(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  processTimeString(timeString) {
    let startDateHourString = timeString.substring(0, 2);
    const startDateMinString = timeString.substring(2, 4);
    let startDateAmPmString = 'AM';
    if (Number(startDateHourString) === 12) {
      startDateAmPmString = 'PM';
    } else if (Number(startDateHourString) > 12) {
      startDateHourString = Number(startDateHourString) - 12;
      startDateAmPmString = 'PM';
    } else if (Number(startDateHourString) > 24) {
      startDateHourString = Number(startDateHourString) - 24;
      startDateAmPmString = 'AM';
    }
    return (startDateHourString + ':' + startDateMinString + ' ' + startDateAmPmString);
  }

}
