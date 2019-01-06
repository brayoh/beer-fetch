import React from 'react';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

// title component
import Title from '../Title';

// app theme colors
import { colors } from '../../../config/theme';

const TitleContainer = glamorous.view(() => ({
  width: '100%',
  padding: 15,
  backgroundColor: colors.veryLightPink,
  alignItems: 'center'
}));

const WrappedTitle = props => {
  return (
    <TitleContainer>
      <Title align="center" alignSelf="center" color={colors.black}>
        {props.children}
      </Title>
    </TitleContainer>
  );
};

WrappedTitle.propTypes = {
  children: PropTypes.element.isRequired
};

export default WrappedTitle;
