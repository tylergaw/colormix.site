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
      <label for="colorspace">Color space</label>
      <div class={styles.selectContainer}>
        <select id="colorspace" onChange={onChange} value={state.colorSpace}>
          {colorSpaces.map((space) => (
            <option value={space}>{space}</option>
          ))}
        </select>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z" />
        </svg>
      </div>
    </div>
  );
};

export default ColorSpaceInput;
