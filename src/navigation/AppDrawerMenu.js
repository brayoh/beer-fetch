import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Center,
  Right,
  Button,
  Icon,
  Title,
  Form,
  Picker
} from 'native-base';

// screens
import AllBeersScreen from '../screens/AllBeersScreen';

export default class AppDrawerMenu extends Component {
  state = {
    selected: 'key1'
  };

  onValueChange = (value: string) => {
    this.setState({ selected: value });
  };

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
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
                onValueChange={this.onValueChange}
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
    );
  }
}
