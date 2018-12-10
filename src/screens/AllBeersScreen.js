import React, { Component, Fragment } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

// components
import BeerPreviewCard from '../components/BeerPreviewCard';
import ContainedImage from '../components/Image/ContainedImage';

export default class AllBeersScreen extends Component {
  render() {
    var { height, width } = Dimensions.get('window');
    console.log('height, width', height / 4, width);
    return (
      <ScrollView>
        <Grid>
          <View style={{ height: height * 0.33, width: '100%' }}>
            <ContainedImage
              resizeMode="cover"
              source={require('../images/header_background.jpg')}
              style={{ height: '100%', width: '100%' }}
            />
          </View>
        </Grid>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: '100%',
            width: '100%',
            marginTop: 10
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, key) => (
            <Col key={key} style={{ position: 'relative', width: '50%', marginTop: 25 }}>
              <BeerPreviewCard />
            </Col>
          ))}
        </View>
      </ScrollView>
    );
  }
}
