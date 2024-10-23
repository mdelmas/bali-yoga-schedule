import { Moment } from "moment";
export interface YogaClass {
  id: string;
  date: string;
  time: string;
  name: string;
  duration: string;
  studio: string;
  city: string;
  price: string;
}

export interface FormattedYogaClass {
  id: string;
  time: Moment;
  duration: number;
  name: string;
  studio: string;
  city: string;
  price: number;
  url: string;
}
