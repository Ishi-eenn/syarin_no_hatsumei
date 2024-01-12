import { Button } from 'antd-mobile'
import React from 'react'

export const NormalButton = (props) => {
  return (
    <Button {...props.style} >
    {props.text}
    </Button>
    )
};