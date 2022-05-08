import styles from "./styles.module.scss";
import {
  dialogActions,
  selectorDialogFunction,
  selectorDialogTitle,
} from "../../../redux/features/dialog/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ChooseDialog = () => {
  const dispatch = useDispatch();
  const titleDialog = useSelector(selectorDialogTitle);
  const functionHandleDialog = useSelector(selectorDialogFunction);

  const handleOK = () => {
    dispatch(dialogActions.hideDialog());
    if (functionHandleDialog) functionHandleDialog();
  };

  const handleCancel = () => {
    dispatch(dialogActions.hideDialog());
  };

  useEffect(() => {
    dispatch(dialogActions.setShowModal());
  }, []);
  return (
    <div className={styles.chooseDialog}>
      <div
        className={styles.chooseDialog_header}
      >{`Bạn có chắc chắn muốn ${titleDialog}`}</div>
      <div className={styles.chooseDialog_footer}>
        <button className={styles.btn_cancel} onClick={handleCancel}>
          Hủy
        </button>
        <button className={styles.btn_success} onClick={handleOK}>
          Đồng ý
        </button>
      </div>
    </div>
  );
};

export default ChooseDialog;
