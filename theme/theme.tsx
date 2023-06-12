import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { globalStyles } from './styles';
import { textStyles } from './components/text';
import { semanticTokens } from './components/semanticTokens';
import { checkBoxStyles } from './components/checkBox';
import { formError } from './components/form-error';
import { radioStyles } from './components/radio';
import { menuStyles } from './components/menu';

export default extendTheme(
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent, // card component,
  textStyles, // text styles
  semanticTokens, // app theme colors
  checkBoxStyles, // checkbox styles
  formError, // form error styles
  radioStyles, // radio styles
  menuStyles // menu item styles
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
