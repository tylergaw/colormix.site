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

export const colorSpaces: string[] = [
  "srgb",
  "srgb-linear",
  "lab",
  "oklab",
  "xyz",
  "yxz-d50",
  "xyz-d65",
  "hsl",
  "hwb",
  "lch",
  "oklch",
];

const store = map<InitialState>({
  colorSpace: "lab",
  1: {
    value: "#e56400",
    percentage: 50,
  },
  2: {
    value: "#b15aba",
    percentage: 50,
  },
});

export default store;
