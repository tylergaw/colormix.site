import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "../store.ts";

const initialState = store.get();

const DynamicStyle: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);

  const colorInput1 = state[1].value;
  const colorInput2 = state[2].value;
  const colorOutput = state.outputSnippet;

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }
  });

  return (
    <style>
      {`
        :root {
          --color-input-1: ${colorInput1};
          --color-input-2: ${colorInput2};
          --color-output: ${colorOutput};
        }
        `}
    </style>
  );
};

export default DynamicStyle;
