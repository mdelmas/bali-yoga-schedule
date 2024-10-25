import { Moment } from "moment";

export enum TIME {
  All = "",
  Morning = "morning",
  Day = "day",
  Evening = "evening",
}

export type Selection = {
  date: Moment;
  time: TIME | undefined;
};
