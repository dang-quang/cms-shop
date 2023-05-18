import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.extend(dayOfYear);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale('fr');

export default dayjs;
