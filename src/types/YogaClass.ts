import { Moment } from "moment";
export interface RawData {
  id: string;
  date: string;
  time: string;
  name: string;
  duration: string;
  studio: string;
  city: string;
  price: string;
}

export interface YogaClass {
  id: string;
  date: string;
  momentDate: Moment;
  duration: number;
  name: string;
  studio: string;
  city: string;
  price: number;
  url: string;
}
