import React from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';

 
interface Props extends BaseTextFieldProps {
    onChange:(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any
}

const StringInput: React.FC<Props> = ({ ...props}) => {
  return <TextField {...props}/>;
}

export default StringInput;
