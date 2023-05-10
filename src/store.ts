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
  [key: number]: IColor;
}

export const colorSpaces: string[] = [
  "oklab",
  "lch",
  "oklch",
  "hsl",
  "hwb",
  "lab",
  "srgb",
  "srgb-linear",
  "xyz",
];

const store = map<InitialState>({
  colorSpace: "oklab",
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
