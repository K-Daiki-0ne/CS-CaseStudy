import { ReactNode, FC } from 'react';
import Container from '@mui/material/Container';
import Head from 'next/head';

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>CaseStudy</title>
      </Head>
      <Container fixed>
        { children }
      </Container>
    </div>
  )
}