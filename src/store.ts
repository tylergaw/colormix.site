import { map } from "nanostores";
import { getOutputSnippet, getRandomHexColor } from "@utils/color";

export interface IColor {
  value: string;
  percentage?: number;
}

export interface InitialState {
  colorSpace: string;
  outputSnippet: string;
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

const defaults = {
  colorSpace: "oklab",
  outputSnippet: "",
  1: {
    value: getRandomHexColor(),
    percentage: 50,
  },
  2: {
    value: getRandomHexColor(),
    percentage: 50,
  },
};

const store = map<InitialState>({
  ...defaults,
  outputSnippet: getOutputSnippet(defaults).use,
});

export default store;
