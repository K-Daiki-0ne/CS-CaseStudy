import { ReactNode, FC } from 'react';
import Container from '@mui/material/Container';
import { Header } from '../Header/Header';

type Props = {
  children: ReactNode
}

export const Layuot: FC<Props> = ({ children }) => {
  return (
    <Container fixed>
      { children }
    </Container>
  )
}