import React from 'react';
import glamorous from 'glamorous-native';

const CardImageContainer = glamorous.view(() => ({
  flex: 1,
  alignItems: 'stretch'
}));

const StyledImage = glamorous.image(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}));

const ContainedImage = props => {
  return (
    <CardImageContainer>
      <StyledImage resizeMode="contain" {...props} />
    </CardImageContainer>
  );
};

export default ContainedImage;
