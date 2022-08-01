import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import 'dayjs/locale/de';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localeData);
dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export { dayjs };
export type { Dayjs, OpUnitType };
