import type { IColor } from "../../store.ts";

import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { enforceHex6, isHex } from "@utils/color";
import store from "../../store.ts";
import styles from "./styles.module.css";

export interface IProps {
  position: number;
}

const initialState = store.get();

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

  // NOTE: This function feels like it's doing way dumb stuff, there has to
  // be a better way to rangle each value.
  const updateStore = (e: Event) => {
    let { name, value } = e.target as HTMLInputElement;
    let nextValue: string | number = value;

    // We need to guard a here to allow for typing in a color value. We only
    // want to update the store when we hit a valid 3 or 6 digit hex
    if (name === "value") {
      if (!isHex(nextValue)) {
        return false;
      }
    }

    if (name === "percentage") {
      nextValue = parseInt(nextValue, 10);
    }

    const nextState: IColor = {
      value: color,
      percentage,
      ...{ [name]: nextValue },
    };
    store.setKey(position, nextState);
  };

  return (
    <div class={styles.container}>
      <div>
        <label class="visually-hidden" for={`color-input-${position}`}>
          Color {position}
        </label>
        <div class={styles.colorFieldContainer}>
          <div class={styles.colorPickerContainer}>
            <div
              class={styles.colorPickerVisual}
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              name="value"
              onInput={updateStore}
              value={enforceHex6(color)}
            />
          </div>
          <input
            type="text"
            name="value"
            onInput={updateStore}
            value={color.toUpperCase()}
            id={`color-input-${position}`}
            size={10}
          />
        </div>
      </div>

      <div class={styles.mixPercentControl}>
        <label class="visually-hidden" for={`color-input-${position}-percent`}>
          Color {position} Mix Percentage
        </label>
        <div class={styles.mixPercentField}>
          <input
            class={styles.mixPercentInput}
            type="number"
            name="percentage"
            onInput={updateStore}
            value={percentage}
            size={3}
            min={0}
            max={100}
            id={`color-input-${position}-percent`}
          />
          <span>%</span>
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
