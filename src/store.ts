import { map } from "nanostores";

export interface IColor {
  value: string;
  percentage?: number;
}

export interface InitialState {
  colorSpace: string;
  1: IColor;
  2: IColor;
}

const store = map<InitialState>({
  colorSpace: "lab",
  1: {
    value: "blue",
    percentage: null,
  },
  2: {
    value: "orange",
    percentage: 10,
  },
});

export default store;
