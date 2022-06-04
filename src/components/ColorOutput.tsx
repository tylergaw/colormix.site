import ColorSpaceInput from "@components/ColorSpaceInput";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store, { initialState as IState, IColor } from "../store.ts";

const initialState = store.get();

const buildColor = (color: IColor): string => {
  const { value, percentage } = color;
  const showPercentage = percentage !== null && percentage > 0;
  return `${value}${showPercentage ? ` ${percentage}%` : ""}`;
};

const buildSnippet = (state: IState): string => {
  const color1 = state["1"];
  const color2 = state["2"];
  return `color-mix(in ${state.colorSpace}, ${buildColor(color1)}, ${buildColor(
    color2
  )})`;
};

const ColorOutput: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);
  const colorMixSnippet = buildSnippet(state);

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }
  });

  return (
    <div style={{ backgroundColor: colorMixSnippet, flex: 1, padding: "2rem" }}>
      <ColorSpaceInput />

      <input
        style={{ display: "block", width: "100%" }}
        type="text"
        value={colorMixSnippet}
        readonly
      />
    </div>
  );
};

export default ColorOutput;
