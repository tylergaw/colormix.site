import ColorSpaceInput from "@components/ColorSpaceInput";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store, { initialState as IState, IColor } from "../store.ts";

const initialState = store.get();

const buildColor = (color: IColor, forDisplay?: boolean): string => {
  const { value, percentage } = color;
  const showPercentage = forDisplay && percentage < 1 ? false : true;
  return `${value}${showPercentage ? ` ${percentage}%` : ""}`;
};

interface ISnippet {
  display: string;
  use: string;
}

const buildSnippet = (state: IState): ISnippet => {
  const color1 = state["1"];
  const color2 = state["2"];
  const display = `color-mix(in ${state.colorSpace}, ${buildColor(
    color1,
    true
  )}, ${buildColor(color2, true)})`;
  const use = `color-mix(in ${state.colorSpace}, ${buildColor(
    color1
  )}, ${buildColor(color2)})`;

  return { display, use };
};

const ColorOutput: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);
  const { display: snippetDisplay, use: snippetUse } = buildSnippet(state);

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }
  });

  return (
    <div style={{ backgroundColor: snippetUse, flex: 1 }}>
      <ColorSpaceInput />

      <input
        style={{ display: "block", width: "100%" }}
        type="text"
        value={snippetDisplay}
        readonly
      />
    </div>
  );
};

export default ColorOutput;
