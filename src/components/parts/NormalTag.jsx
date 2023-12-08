import { Tag } from 'antd-mobile';
import React from 'react'

export const NormalTag = (props) => {
  const {text , style} = props;
  return (
    <Tag {...props.style}>
      {props.text}
    </Tag>
  )
}
