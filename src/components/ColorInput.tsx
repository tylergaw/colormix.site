import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

export interface Props {
  id: number;
  initColor?: string;
}

const ColorInput: FunctionComponent<Props> = ({
  id,
  initColor = "#7939d3",
}: Props) => {
  const [color, setColor] = useState(initColor);

  const onColorPickerInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setColor(value);
  };

  return (
    <div style={{ backgroundColor: color }}>
      <div>
        <label for={`color-input-${id}`}>Color {id}</label>
        <div>
          <input id={`color-input-${id}`} type="text" value={color} />
          <input type="color" onInput={onColorPickerInput} value={color} />
        </div>
      </div>

      <div>
        <label for={`color-input-${id}-percent`}>Color {id} Percentage</label>
        <div>
          <input id={`color-input-${id}-percent`} type="text" />
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
