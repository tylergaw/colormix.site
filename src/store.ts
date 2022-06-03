import { map } from "nanostores";

interface Color {
  value: string;
  percentage?: number;
}

interface InitialState {
  colorSpace: string;
  1: Color;
  2: Color;
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
