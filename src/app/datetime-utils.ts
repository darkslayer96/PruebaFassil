/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import * as moment from 'moment';

export class DateTimeUtils {

  public static GetNextMonth(): string {
    var duration = moment.duration({ months: 1 });
    const nextMonth: string | null = moment().add(duration).toLocaleString();
    return nextMonth;
  }

  public static GetToday(): string {
    const today: string | null = moment().toLocaleString();
    return today;
  }

  public static UtcDate(date: any): Date {
    const tempDate = new Date(date);
    var dateWithUtc = moment.parseZone(tempDate, moment.ISO_8601).utc(true).format();
    return new Date(dateWithUtc);
  }

  public static GetTodayWithHourMore(hour: number ): string {
    const today: string | null = moment().add(hour, 'hours').toLocaleString();
    return today;
  }

}
