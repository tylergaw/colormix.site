import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "../store.ts";

const initialState = store.get();

const getNextState = (values) => ({
  colorInput1: encodeURIComponent(values[1].value),
  colorInput2: encodeURIComponent(values[2].value),
  colorOutput: encodeURIComponent(values.outputSnippet),
});

const Favicon: FunctionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [state, setState] = useState(getNextState(initialState));
  const { colorInput1, colorInput2, colorOutput } = state;

  useEffect(() => {
    if (!isListening) {
      store.listen((newValues) => {
        setState(getNextState(newValues));
      });

      setIsListening(true);
    }
  });

  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={`data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27.8474 23.4627C25.3678 27.3908 20.9886 30 16 30C8.26801 30 2 23.732 2 16C2 14.726 2.17017 13.4918 2.48901 12.3188C2.93489 13.06 3.45873 13.8308 4.06701 14.5799C5.39138 16.2111 7.175 17.8117 9.49611 18.7244C11.8558 19.6523 14.6302 19.8122 17.7858 18.7702C20.1296 17.9962 21.9283 18.2243 23.3514 18.8802C24.8265 19.5601 26.0602 20.7773 27.0681 22.2246C27.3507 22.6304 27.6101 23.0466 27.8474 23.4627Z' fill='${colorOutput}'/%3E%3Cpath d='M28.8865 21.4807C28.4443 20.8146 27.9497 20.1699 27.3956 19.5774C26.209 18.3087 24.7015 17.2229 22.8014 16.6925C21.4196 16.3068 19.9105 16.2374 18.2741 16.531C18.2039 16.337 18.1401 16.1669 18.0811 16.0098C17.9674 15.7071 17.8718 15.4525 17.7841 15.1677C17.0574 12.8057 17.2784 10.9774 17.9097 9.53039C18.5592 8.04176 19.7102 6.80787 21.0628 5.80509C21.9063 5.17966 22.7969 4.66759 23.6279 4.25858C27.4638 6.75571 30 11.0817 30 16C30 17.9451 29.6034 19.7975 28.8865 21.4807Z' fill='${colorInput2}'/%3E%3Cpath d='M3.34399 10.007C5.19089 13.6616 9.27796 19.1935 16.5311 17.2003C16.5074 17.135 16.4834 17.0695 16.4592 17.0039L16.4559 16.995L16.4549 16.9923C16.4237 16.9082 16.3922 16.824 16.3608 16.7399C16.231 16.3929 16.1017 16.0472 16 15.7167C13.9847 9.16689 18.0308 5.27512 21.6606 3.19156C19.9298 2.42551 18.0146 2 16 2C10.4125 2 5.5895 5.27331 3.34399 10.007Z' fill='${colorInput1}'/%3E%3C/svg%3E%0A`}
    />
  );
};

export default Favicon;
