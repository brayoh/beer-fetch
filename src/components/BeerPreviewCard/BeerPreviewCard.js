import React from 'react';
import glamorous from 'glamorous-native';

// app theme colors
import { colors } from '../../config/theme';

// components
import Title from '../Text/Title';
import ContainedImage from '../Image/ContainedImage';

const CardContainer = glamorous.view((props, theme) => ({
  position: 'relative',
  height: 153,
  width: '85%',
  left: '7.5%',
  justifyContent: 'space-around'
}));

const CardImageContainer = glamorous.view((props, theme) => ({
  flex: 1,
  alignItems: 'stretch'
}));

const BeerNameContainer = glamorous.view((props, theme) => ({
  height: '30%',
  backgroundColor: colors.deep_sky_blue,
  justifyContent: 'center'
}));

const BeerPreviewCard = () => {
  return (
    <CardContainer style={{ justifyContent: 'space-around' }}>
      <CardImageContainer>
        <ContainedImage source={{ uri: 'http://pngimg.com/uploads/beer/beer_PNG2390.png' }} />
      </CardImageContainer>
      <BeerNameContainer>
        <Title align="center">Heineken</Title>
      </BeerNameContainer>
    </CardContainer>
  );
};

export default BeerPreviewCard;
