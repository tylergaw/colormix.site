import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "../store.ts";

export interface IProps {
  position: number;
}

const initialState = store.get();

const isHex = (str) => /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(str);

const ColorInput: FunctionComponent<IProps> = ({ position }: IProps) => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);
  const { value: color, percentage } = state[position];

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }
  });

  const updateStore = (e: Event) => {
    const { name, value: nextValue } = e.target as HTMLInputElement;

    // FIXME: Working here
    if (name === "color-input") {
      if (!isHex(nextValue)) {
        return false;
      }

      console.log(nextValue, isHex(nextValue));
    }

    const nextState = {
      value: color,
      percentage,
      ...{ [name]: nextValue },
    };
    store.setKey(position, nextState);
  };

  return (
    <div style={{ backgroundColor: color, flex: 1 }}>
      <div>
        <label for={`color-input-${position}`}>Color {position}</label>
        <div>
          <input
            type="color"
            name="value"
            onInput={updateStore}
            value={color}
          />
          <input
            name="color-input"
            onInput={updateStore}
            id={`color-input-${position}`}
            type="text"
            value={color}
          />
        </div>
      </div>

      <div>
        <label for={`color-input-${position}-percent`}>
          Color {position} Percentage
        </label>
        <div>
          <input
            id={`color-input-${position}-percent`}
            type="text"
            value={percentage}
          />
          <input
            type="range"
            name="percentage"
            onInput={updateStore}
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
