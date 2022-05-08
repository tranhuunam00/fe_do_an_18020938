import styles from "./styles.module.scss";

import { useSelector } from "react-redux";
import { NameDialogModal } from "../../constants/constants";
import ChooseDialog from "./chooseDialog";

import {
  selectorDialogComponent,
  selectorDialogTitle,
} from "../../redux/features/dialog/dialogSlice";

const Dialog = () => {
  const title = useSelector(selectorDialogTitle);
  const component = useSelector(selectorDialogComponent);

  const children = () => {
    let child;
    switch (component) {
      case NameDialogModal.CHOOSE_DIALOG: {
        child = <ChooseDialog title={title} />;
        break;
      }
      default:
        child = <ChooseDialog title={title} />;
    }
    return child;
  };
  return (
    <div className={styles.dialog}>
      <div className={styles.dialog_content}>{children()}</div>
    </div>
  );
};

export default Dialog;
