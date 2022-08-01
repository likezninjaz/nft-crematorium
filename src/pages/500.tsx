import { Typography } from 'components';

const Page500 = () => (
  <Typography
    typographyStyle={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    500 - Server-side error occurred
  </Typography>
);

export default Page500;
