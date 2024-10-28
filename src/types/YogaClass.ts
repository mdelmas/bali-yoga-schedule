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
  url: string;
}

export interface YogaClass {
  id: string;
  date: Moment;
  duration: number;
  name: string;
  studio: string;
  city: string;
  price: number;
  url: string;
}
