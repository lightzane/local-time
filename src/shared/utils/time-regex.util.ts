import { months as m } from './date.util';

export class TimeRegexUtil {
  static months = [...m];

  /** All months (3-letter word) separated by `|` */
  static M = this.months.join('|');

  /**
   * Returns the following like matches:
   *
   * ```txt
   * Dec 05, 11:30PM PHT
   * Dec 25, 11:30PM IST
   * Dec 5, 11:30PM EST
   * Dec 5, 1:30PM CST
   * Dec 5, 1:30PM UTC+8
   * Dec 5, 1:30PM UTC-08
   * Dec 5, 1:30PM UTC+8:00
   * Dec 5, 1:30PM UTC-08:00
   * Dec 5, 1:30PM UTC+9:30
   * Dec 5, 1:30PM UTC-09:30
   * Dec 5, 1:30 PM UTC-09:30
   * Dec 5, 1PM UTC-09:30
   * Dec 5, 1 PM UTC-09:30
   * ```
   */
  // static matchLong(text: string): string[] | null {
  //   /**
  //    * \b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{1,2}(?::\d{2})? ?(?:am|pm)? \w{3}(?:[+-]\d{1,2}(?::\d{2})?)?\b
  //    */
  //   const regex = new RegExp(
  //     `\\b(?:${this.M}) \\d{1,2}, \\d{1,2}(?::\\d{2})? ?(?:am|pm)? \\w{3}(?:[+-]\\d{1,2}(?::\\d{2})?)?\\b`,
  //     'gi',
  //   );

  //   return text.match(regex);
  // }

  /**
   * Returns the following like matches:
   *
   * ```txt
   * 11:30PM PHT
   * 11:30PM IST
   * 1:30PM CST
   * 1:30PM UTC+8
   * 1:30PM UTC-8
   * 1:30PM UTC-8:00
   * 23:00 EST
   * 12am EST
   * 12 am EST
   * ```
   */
  // static matchShort(text: string): string[] | null {
  //   const regex =
  //     /\b\d{1,2}(?::\d{2})? ?(?:am|pm)? [a-z]{3}(?:[+-]\d{1,2})?(?::\d{2})?\b/gi;

  //   const matches = text.match(regex);

  //   if (!matches) {
  //     return null;
  //   }

  //   return matches;
  // }

  /**
   * Returns **FIRST MATCH** of the following like matches:
   *
   * ```txt
   * Dec 05
   * Dec 5
   * ```
   */
  static monthDay(text: string): string | null {
    const regex = new RegExp(`\\b(?:${this.M}) \\d{1,2}\\b`, 'i');
    const matches = text.match(regex);

    if (!matches) {
      return null;
    }

    return matches[0];
  }

  /**
   * Returns **FIRST MATCH** of the following like matches:
   *
   * ```txt
   * PHT
   * EST
   * IST
   * CST
   * UTC+7
   * UTC-8
   * UTC+08:00
   * UTC-08
   * UTC+9:30
   * UTC-09:30
   * ```
   */
  static timeZoneAbbr(text: string): string | null {
    const regex = /\b \w{3}(?:[\-|\+]\d{1,2}(?::\d{2})?)?\b/i;
    const matches = text.match(regex);

    if (!matches) {
      return null;
    }

    return matches[0].trim();
  }

  /**
   * Returns **FIRST_MATCH** of the following like matches:
   *
   * ```txt
   * 01:00
   * 1:00
   * 13:00
   * 1 PM
   * 1PM
   * ```
   */
  static getTime(text: string): string | null {
    /** (?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2},)? ?\d{1,2}(?::\d{2})? ?(?:am|pm)? */
    const regex = new RegExp(
      `(?:(?:${this.M}) \\d{1,2},)? ?\\d{1,2}(?::\\d{2})? ?(?:am|pm)?`,
      'i',
    );
    const matches = text.match(regex);

    if (!matches) {
      return null;
    }

    return matches[0];
  }

  /** Gets the hour (**01** or **1**) within the time */
  static getHour(time: string): number | undefined {
    /**
     * (?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2},)? ?(\d{1,2})
     */
    const regex = new RegExp(`(?:(?:${this.M}) \\d{1,2},)? ?(\\d{1,2})`, 'i');
    const matches = time.match(regex);

    if (!matches) {
      return;
    }

    if (!matches[1]) {
      return;
    }

    return parseInt(matches[1]);
  }

  /** Gets the minute (**50** or **05**) within the time */
  static getMinute(time: string): number | undefined {
    const regex = /:(\d{2})/;
    const matches = regex.exec(time);

    if (!matches) {
      return;
    }

    if (!matches[1]) {
      return;
    }

    return parseInt(matches[1]);
  }
}
