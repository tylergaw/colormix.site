import { map } from "nanostores";
import { getRandomHexColor } from "@utils/color";

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
    value: getRandomHexColor(),
    percentage: 50,
  },
  2: {
    value: getRandomHexColor(),
    percentage: 50,
  },
});

export default store;
