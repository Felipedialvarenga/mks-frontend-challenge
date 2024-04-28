import React from "react";
import styles from "./CloseIcon.module.scss";

type ButtonStyles = "small" | "regular";

type Props = {
  style: ButtonStyles;
};

export default function CloseIcon({ style }: Props) {
  const buttonStyle = () => {
    if (style == "small") {
      return styles.smallIcon;
    }
    return styles.closeIcon;
  };
  return <div className={buttonStyle()}>X</div>;
}
