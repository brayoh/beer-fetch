import React from 'react';
import { Text } from 'react-native';
import glamorous from 'glamorous-native';

// title component
import Title from '../Title';

// app theme colors
import { colors } from '../../../config/theme';

const TitleContainer = glamorous.view((props, theme) => ({
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

export default WrappedTitle;
