import glamorous from 'glamorous-native';
import { colors } from '../../../config/theme';

const Title = glamorous.text(props => ({
  fontFamily: 'robotoRegular',
  fontSize: 16,
  color: props.color || colors.white,
  lineHeight: 24,
  textAlign: `${props.align}`
}));

export default Title;
