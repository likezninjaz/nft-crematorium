import { TEmotionProps } from '@types';

import { StyledLoader } from './Loader.styled';

type LoaderProps = {
  loaderStyle?: TEmotionProps;
};

export const Loader = (props: LoaderProps) => <StyledLoader {...props} />;
