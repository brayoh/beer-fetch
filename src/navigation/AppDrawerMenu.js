import React, { Component, Fragment } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Header, Left, Body, Button, Icon, Title, Right } from 'native-base';

export default class AppDrawerMenu extends Component {
  _handleOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Fragment>
        <View>
          <Header>
            <Left>
              <TouchableHighlight>
                <Button transparent onPress={this._handleOpenDrawer}>
                  <Icon name="menu" />
                </Button>
              </TouchableHighlight>
            </Left>
            <Body>
              <Title>Beer Fetch</Title>
            </Body>
            <Right />
          </Header>
        </View>
      </Fragment>
    );
  }
}
