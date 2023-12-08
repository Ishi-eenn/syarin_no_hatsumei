import { Button } from "antd-mobile";
import React from "react";

export const NormalButton = (props) => {
  const { text, style, onClick } = props;
  return (
    <Button {...props.style} onClick={onClick}>
      {props.text}
    </Button>
  );
};
