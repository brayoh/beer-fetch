import React from 'react';
import { Text, View } from 'react-native';
import glamorous from 'glamorous-native';

// title component
import WrappedTitle from '../Text/WrappedTitle';

// app theme colors
import { colors } from '../../config/theme';

const CardContainer = glamorous.view((props, theme) => ({
  position: 'relative',
  width: '85%',
  left: '7.5%',
  justifyContent: 'space-around',
  backgroundColor: colors.white,
  elevation: 2
}));

const TextBody = glamorous.view((props, theme) => ({
  position: 'relative',
  fontSize: 12,
  color: colors.black,
  lineHeight: 20,
  padding: 10,
  width: '95%',
  left: '2.5%'
}));

const CardWithTitle = props => {
  const renderContent =
    props.contentContainer === 'text' ? <Text>{props.content}</Text> : <View>{props.content}</View>;
  return (
    <CardContainer>
      <WrappedTitle>{props.title}</WrappedTitle>

      <TextBody>{renderContent}</TextBody>
    </CardContainer>
  );
};

export default CardWithTitle;
