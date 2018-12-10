import React, { Component, Fragment } from 'react';
import { View, TouchableHighlight } from 'react-native';
import {
  Drawer,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Form,
  Picker,
  Text
} from 'native-base';

export default class AppDrawerMenu extends Component {
  state = {
    selected: 'key1'
  };

  _onValueChange = (value: string) => {
    this.setState({ selected: value });
  };

  _handleCloseDrawer = () => {
    this.drawer._root.close();
  };

  _handleOpenDrawer = () => {
    console.log('clicked', this.drawer);
    this.drawer._root.open();
  };

  render() {
    return (
      <Fragment>
        <View>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={<Text>navigation</Text>}
            onClose={() => this._handleCloseDrawer()}
          />
        </View>
        <View>
          <Header>
            <Left>
              <TouchableHighlight>
                <Button transparent>
                  <Icon name="menu" />
                </Button>
              </TouchableHighlight>
            </Left>
            <Body>
              <Title>Beer Fetch</Title>
            </Body>
            <Right>
              <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120, color: '#ffffff' }}
                  selectedValue={this.state.selected}
                  onValueChange={this._onValueChange}
                >
                  <Picker.Item label="Beer name" value="key0" />
                  <Picker.Item label="Filter" value="key1" />
                  <Picker.Item label="ABV less than" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
            </Right>
          </Header>
        </View>
      </Fragment>
    );
  }
}
