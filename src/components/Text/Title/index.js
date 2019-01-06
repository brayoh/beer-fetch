import glamorous from 'glamorous-native';
import { colors } from '../../../config/theme';
import PropTypes from 'prop-types';

const Title = glamorous.text((props, theme) => ({
  fontFamily: 'robotoRegular',
  fontSize: 16,
  color: props.color || colors.black,
  lineHeight: 24,
  textAlign: props.align || 'left',
  alignSelf: props.alignSelf || 'center'
}));

Title.propTypes = {
  color: PropTypes.string,
  align: PropTypes.string,
  alignSelf: PropTypes.string
};

export default Title;
