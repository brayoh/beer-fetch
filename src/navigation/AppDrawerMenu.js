import React, { Component, Fragment } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Drawer, Header, Left, Body, Button, Icon, Title } from 'native-base';

// theme colors
import { colors } from '../config/theme';

export default class AppDrawerMenu extends Component {
  state = {
    selected: 'key1',
    drawerOpen: false
  };
  _handleCloseDrawer = () => {
    this.drawer._root.close();
  };

  _handleOpenDrawer = () => {
    if (!this.state.drawerOpen) {
      this.drawer._root.open();
    } else {
      this._handleCloseDrawer();
    }
  };

  render() {
    return (
      <Fragment>
        <View>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={
              <Text navigator={this.props.navigator}>this is a test</Text>
            }
            onClose={() => this._handleCloseDrawer()}
          >
            {/* // Main View */}
          </Drawer>
        </View>
        <View>
          <Header>
            <Left>
              <TouchableHighlight>
                <Button transparent onPress={this._handleOpenDrawer}>
                  <Icon name="menu" />
                </Button>
              </TouchableHighlight>
            </Left>
            <Body style={{ textAlign: 'left' }}>
              <Title>Beer Fetch</Title>
            </Body>
          </Header>
        </View>
      </Fragment>
    );
  }
}
