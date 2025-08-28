import * as moment from 'moment';

import { DAY_MS } from './common.const';

export function currentMilliTime(): string {
  return new Date().getTime().toString();
}

export function currentTimestamp() {
  return new Date().getTime();
}

export function getDiffDays(startTime: number, endTime: number) {
  return moment(startTime).diff(endTime, 'days');
}

export function convertTimestampToMilliTime(date: string) {
  return new Date(date).getTime().toString();
}

export function trimTime(time: number, resolution: number) {
  if (!resolution) return time;
  return time - (time % resolution);
}

export function getTodayTimestamp() {
  return trimTime(new Date().getTime(), DAY_MS);
}

export function getUTCStartAndEndOfDayTime(time: number = null) {
  const startOfDay = time ? new Date(time) : new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = time ? new Date(time) : new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);
  return {
    startTime: startOfDay.getTime(),
    endTime: endOfDay.getTime(),
  };
}

export function getDateTimeForDailyPnl(time: number = null) {
  const startAndEndOfDayTime = getUTCStartAndEndOfDayTime(time);
  return {
    start: startAndEndOfDayTime.startTime,
    end: startAndEndOfDayTime.endTime,
    previous: getUTCStartOfPreviousDayTime(time),
  };
}

export function getUTCStartOfPreviousDayTime(time: number = null) {
  const previous = time ? new Date(time) : new Date();
  previous.setUTCHours(0, 0, 0, 0);
  previous.setDate(previous.getDate() - 1);
  return previous.getTime();
}
