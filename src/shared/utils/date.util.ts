export const locales: Intl.LocalesArgument = 'en-US';

// Months
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export class DateUtil {
  /**
   * Formats the date into human-friendly
   * @example 'Thu, August 3, 2023 at 8:12 PM'
   *
   * Omits the year if it is the same year with current year.
   */
  static format(date: Date | number): string {
    date = new Date(date);

    const outputWithYear = date.toLocaleString(locales, {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    const outputWithoutYear = date.toLocaleString(locales, {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    if (date.getFullYear() === new Date().getFullYear()) {
      return outputWithoutYear;
    }

    return outputWithYear;
  }

  static formatTime(date: Date | number): string {
    date = new Date(date);

    return date
      .toLocaleDateString(locales, {
        hour: '2-digit',
        minute: '2-digit',
      })
      .split(',')[1];
  }

  /**
   * Determines whether the given dates are exactly the same day
   * @param date1 The specified date to compare
   * @param date2 The other date to compare with. (**Defaults to current date**)
   * @returns **true** when both the is exactly the same day.
   */
  static isSameDay(date1: Date, date2 = new Date()): boolean {
    return (
      new Date(date1).setHours(0, 0, 0, 0) ===
      new Date(date2).setHours(0, 0, 0, 0)
    );
  }
}
