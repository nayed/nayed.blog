const WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
  'Eighteen', 'Nineteen', 'Twenty',
];

/** "Three" for 3, falls back to digits above twenty. */
export const numberWord = (n: number): string => WORDS[n] ?? String(n);

const MONTHS_SHORT = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

// Dates are stored as UTC midnight; format in UTC so they never shift a day.
const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts });

/** "April 15, 2019" */
export const longDate = (d: Date) => fmt({ month: 'long', day: 'numeric', year: 'numeric' }).format(d);
/** "Monday, April 15, 2019" */
export const fullDate = (d: Date) =>
  fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(d);
/** "Feb. 13, 2019" (newspaper style abbreviations) */
export const shortDate = (d: Date) => `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
