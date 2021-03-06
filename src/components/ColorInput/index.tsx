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

  const updateStore = (e: Event) => {
    let { name, value: nextValue } = e.target as HTMLInputElement;

    // We need to guard a here to allow for typing in a color value. We only
    // want to update the store when we hit a valid 3 or 6 digit hex
    if (name === "value") {
      if (!isHex(nextValue)) {
        return false;
      }
    }

    const nextState = {
      value: color,
      percentage,
      ...{ [name]: nextValue },
    };
    store.setKey(position, nextState);
  };

  return (
    <div class={styles.container} style={{ backgroundColor: color, flex: 1 }}>
      <div class={styles.controls}>
        <div class={styles.control}>
          <label class="visually-hidden" for={`color-input-${position}`}>
            Color {position}
          </label>
          <div class={`${styles.fieldContainer} ${styles.colorFieldContainer}`}>
            <div class={styles.colorInputContainer}>
              <img src="/images/colorwheel.svg" alt="Colorwheel icon" />
              <input
                type="color"
                name="value"
                onInput={updateStore}
                value={enforceHex6(color)}
              />
            </div>
            <input
              class={styles.colorTextInput}
              type="text"
              name="value"
              onInput={updateStore}
              value={color.toUpperCase()}
              id={`color-input-${position}`}
            />
          </div>
        </div>

        <div class={styles.control}>
          <label
            class="visually-hidden"
            for={`color-input-${position}-percent`}
          >
            Color {position} Percentage
          </label>
          <div
            class={`${styles.fieldContainer} ${styles.percentFieldContainer}`}
          >
            <div class={styles.percentInputContainer}>
              <input
                class={styles.percentInput}
                type="number"
                name="percentage"
                onInput={updateStore}
                value={percentage}
                min="0"
                max="100"
                id={`color-input-${position}-percent`}
              />
            </div>
            <div
              class={styles.percentRangeContainer}
              style={`--bg-width: ${percentage}%`}
            >
              <input
                class={styles.percentRange}
                type="range"
                name="percentage"
                onInput={updateStore}
                value={percentage}
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
