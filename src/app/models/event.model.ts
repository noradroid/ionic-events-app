export enum TimeFormat {
  COUNT_DAYS,
  DAYS_FROM,
}

export interface Event {
  fromName: string;
  subject: string;
  date: Date;
  id: number;
  read: boolean;
  timeFormat: TimeFormat;
  description: string;
}
