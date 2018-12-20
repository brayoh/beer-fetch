import React from 'react';
import glamorous from 'glamorous-native';

// app theme colors
import { colors } from '../../config/theme';

const CardContainer = glamorous.view((props, theme) => ({
  position: 'relative',
  width: '20%',
  backgroundColor: colors.white,
  elevation: 2
}));

const TextBody = glamorous.text((props, theme) => ({
  position: 'relative',
  fontSize: 14,
  color: colors.black,
  padding: 5,
  textAlign: 'center',
  width: '100%',
  height: 40,
  justifyContent: 'center'
}));

const FooterContainer = glamorous.view((props, theme) => ({
  width: '100%',
  padding: 5,
  backgroundColor: colors.veryLightPink,
  alignItems: 'center'
}));

const TextFooter = glamorous.text((props, theme) => ({
  fontSize: 13,
  textAlign: 'center',
  color: colors.black
}));

const CardWithFooter = ({ bodyContent, footerContent }) => {
  return (
    <CardContainer>
      <TextBody>{bodyContent}</TextBody>
      <FooterContainer>
        <TextFooter>{footerContent}</TextFooter>
      </FooterContainer>
    </CardContainer>
  );
};

export default CardWithFooter;
