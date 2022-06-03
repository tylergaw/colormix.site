import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "../store.ts";

const initialState = store.get();

const ColorOutput: FunctionComponent = () => {
  const [state, setState] = useState(initialState);
  const color1 = state["1"];
  const color2 = state["2"];

  useEffect(() => {
    store.listen((value) => {
      setState(value);
    });
  });

  return (
    <div>
      Output:{" "}
      <code>
        color-mix(in {state.colorSpace}, {color1.value}, {color2.value} 10%)
      </code>
    </div>
  );
};

export default ColorOutput;
