import { FC, InputHTMLAttributes }  from 'react';
import {
  TextField,
} from '@mui/material'

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: string;
  textarea?: boolean
};

export const InputField: FC<InputFieldType> = ({
  label,
  textarea,
  name,
  type,
  size: _,
  ...props
}) => {
  return (
    <TextField 
      margin='normal'
      name={name}
      label={label}
      type={type}
      id={name}
    />
  )
}
