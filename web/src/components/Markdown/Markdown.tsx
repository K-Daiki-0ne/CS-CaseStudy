import { Box, Typography, Divider } from '@mui/material';
import ReactMarkdown from 'markdown-to-jsx';

const MarkdownListItem = (props: any) => {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    li: {
      component: MarkdownListItem,
    },
  },
};

export const Markdown = (props: any) => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>CaseStudyについて</Typography>
        <Divider />
        <ReactMarkdown options={options} {...props} />
      </div>
    )
}