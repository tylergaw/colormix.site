import ColorSpaceInput from "@components/ColorSpaceInput";
import NoSupport from "@components/NoSupport";
import { getOutputSnippet } from "@utils/color";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "../../store.ts";
import styles from "./styles.module.css";

const initialState = store.get();

const ColorOutput: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(initialState);
  const { display: snippetDisplay, use: snippetUse } = getOutputSnippet(state);

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(newValues);
      });

      setIsListening(true);
    }

    store.setKey("outputSnippet", snippetUse);
  });

  return (
    <div class={styles.container}>
      <div class={`${styles.colorPreviewContainer} checkered`}>
        <div
          class={styles.colorPreview}
          style={{ backgroundColor: snippetUse }}
        >
          <NoSupport />
          <div class={styles.spaceSelect}>
            <ColorSpaceInput />
          </div>
        </div>
      </div>
      <div class={styles.snippetContainer}>
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.8083 3.0498C16.2458 4.1123 14.199 5.77896 12.6677 8.0498C11.1365 10.3206 10.3708 12.8415 10.3708 15.6123C10.3708 17.6748 10.8083 19.6279 11.6833 21.4717C12.5583 23.3154 13.7979 24.8831 15.4021 26.1748H10.1833V28.0498H18.8083V19.4248H16.9333V25.0186C15.4542 23.8936 14.3031 22.5133 13.4802 20.8779C12.6573 19.2425 12.2458 17.4977 12.2458 15.6435C12.2458 13.3935 12.8344 11.3258 14.0115 9.44042C15.1886 7.55501 16.7875 6.1123 18.8083 5.1123V3.0498Z"
            fill="#222B2D"
          />
        </svg>
        <input
          class={styles.snippetDisplay}
          type="text"
          value={snippetDisplay}
          readonly
        />
      </div>
    </div>
  );
};

export default ColorOutput;
