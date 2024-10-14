import styles from "./SignBtn.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export function SignBtn({
  children,
  active,
}: {
  children: string;
  active: boolean;
}) {
  return (
    <button type="submit" className={cx("button", active ? "active" : "")}>
      {children}
    </button>
  );
}
