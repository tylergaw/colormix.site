import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import store from "../store.ts";

export interface Props {
  position: number;
  initColor?: string;
}

const ColorInput: FunctionComponent<Props> = ({
  position,
  initColor = "#7939d3",
}: Props) => {
  const [color, setColor] = useState(initColor);

  const onColorPickerInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setColor(value);
    store.setKey(position, { value, percentage: 50 });
  };

  return (
    <div style={{ backgroundColor: color }}>
      <div>
        <label for={`color-input-${position}`}>Color {position}</label>
        <div>
          <input id={`color-input-${position}`} type="text" value={color} />
          <input type="color" onInput={onColorPickerInput} value={color} />
        </div>
      </div>

      <div>
        <label for={`color-input-${position}-percent`}>
          Color {position} Percentage
        </label>
        <div>
          <input id={`color-input-${position}-percent`} type="text" />
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
