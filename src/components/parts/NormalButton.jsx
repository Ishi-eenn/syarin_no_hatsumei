import { Button } from 'antd-mobile'
import React from 'react'

export const NormalButton = (props) => {
  return (
    <Button {...props} >
    {props.text}
    </Button>
    )
};