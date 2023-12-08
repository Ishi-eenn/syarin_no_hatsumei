import { Button } from 'antd-mobile'
import React from 'react'

export const NormalButton = (props) => {
  const {text , style} = props;
  return (
    <Button {...props.style} >
    {props.text}
    </Button>
    )
};