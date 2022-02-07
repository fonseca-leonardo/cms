import React from 'react';
import { Button as ButtonMUI, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  title: string;
}

const Button: React.FC<Props> = ({ title, ...props }) => {
  return (
    <ButtonMUI
      fullWidth
      onClick={() => alert('aqui')}
      {...props}
    >
      {title} - Outra coisa
    </ButtonMUI>
  );
}



export default Button;
