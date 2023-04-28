import { FunctionComponent } from "preact";
import styles from "./styles.module.css";

const NoSupport: FunctionComponent = () => (
  <div class={styles.noSupport}>
    <strong>
      This browser either doesn't support color-mix yet, or needs a feature flag
      enabled.
    </strong>{" "}
    You can still generate the CSS snippet, but you won't see the result of the
    mixed colors. See{" "}
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix#browser_compatibility">
      color-mix MDN docs
    </a>{" "}
    for details on browser support and how to enable feature flags.
  </div>
);

export default NoSupport;
