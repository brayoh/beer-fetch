import React from 'react';
import { Body, Header, Left, Right, Icon, Title, Button } from 'native-base';

export default function HeaderBack(props) {
  return (
    <Header>
      <Left>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right />
    </Header>
  );
}
