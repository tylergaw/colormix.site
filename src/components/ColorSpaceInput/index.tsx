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
        <img src="/images/arrow-down.svg" alt="" height="24" width="24" />
      </div>
    </div>
  );
};

export default ColorSpaceInput;
