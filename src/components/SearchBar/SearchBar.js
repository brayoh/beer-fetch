import React, { Component } from 'react';
import { Item, Input, Icon, Form, Picker } from 'native-base';

// app theme colors
import { colors } from '../../config/theme';

export default class SearchBar extends Component {
  render() {
    return (
      <Item
        regular
        style={{
          position: 'absolute',
          top: '30%',
          maxWidth: '95%', // 75%
          alignSelf: 'center',
          backgroundColor: colors.white,
          zIndex: 2
        }}
      >
        <Icon name="ios-search" />
        <Input
          onChangeText={this.props.handleOnChangeText}
          style={{ backgroundColor: colors.white }}
          placeholder="Search"
        />
        <Form>
          <Picker
            mode="dropdown"
            note
            selectedValue={this.props.selected}
            onValueChange={this.props.handleOnValueChange}
            style={{
              width: 120,
              color: colors.black
            }}
          >
            <Picker.Item label="Beer name" value="beer_name" />
            <Picker.Item label="Malt" value="malt" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Hops" value="hops" />
            <Picker.Item label="ABV greater than" value="abv_gt" />
            <Picker.Item label="ABV less than" value="abv_lt" />
          </Picker>
        </Form>
      </Item>
    );
  }
}
