import ColorSpaceInput from "@components/ColorSpaceInput";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store, { initialState as IState, IColor } from "../../store.ts";
import styles from "./styles.module.css";

const initialState = store.get();

const buildColor = (color: IColor, forDisplay?: boolean): string => {
  const { value, percentage } = color;
  const showPercentage = forDisplay && percentage < 1 ? false : true;
  return `${value.toUpperCase()}${showPercentage ? ` ${percentage}%` : ""}`;
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
    <div class={styles.container} style={{ backgroundColor: snippetUse }}>
      <div class={styles.noSupport}>
        <strong>
          This browser either doesn't support color-mix yet, or needs a feature
          flag enabled.
        </strong>{" "}
        You can still generate the CSS snippet, but you won't see the result of
        the mixed colors. See{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix#browser_compatibility">
          color-mix MDN docs
        </a>{" "}
        for details.
      </div>
      <input class={styles.input} type="text" value={snippetDisplay} readonly />
      <div class={styles.spaceSelect}>
        <ColorSpaceInput />
      </div>
    </div>
  );
};

export default ColorOutput;
