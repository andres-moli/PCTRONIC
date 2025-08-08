import { registerEnumType } from "@nestjs/graphql";

export enum WeekDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

registerEnumType(WeekDay,{name:'WeekDay'})