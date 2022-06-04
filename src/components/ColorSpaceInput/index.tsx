import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store, { colorSpaces } from "../../store.ts";
import styles from "./styles.module.css";

const initialState = store.get();

const ColorSpaceInput: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }
  });

  const onChange = (e) => {
    store.setKey("colorSpace", e.target.value);
  };

  return (
    <div>
      <label for="colorspace">Colorspace</label>
      <select id="colorspace" onChange={onChange} value={state.colorSpace}>
        {colorSpaces.map((space) => (
          <option value={space}>{space}</option>
        ))}
      </select>
    </div>
  );
};

export default ColorSpaceInput;
