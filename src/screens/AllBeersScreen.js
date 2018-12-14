import React, { Component } from 'react';
import { Dimensions, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

// presentational components
import ContainedImage from '../components/Image/ContainedImage';
import BeerPreviewCard from '../components/BeerPreviewCard';

// axios service
import axiosService from '../utils/lib/axiosService';

export default class AllBeersScreen extends Component {
  state = {
    allBeers: []
  };

  componentDidMount() {
    axiosService
      .request({
        url: '/beers',
        method: 'GET'
      })
      .then(response => {
        this.setState({
          allBeers: response.data
        });
      });
  }

  render() {
    const { height } = Dimensions.get('window');
    const { allBeers } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <Grid>
          <View style={{ position: 'relative', height: height * 0.33, width: '100%' }}>
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
          {allBeers.map(beer => {
            const { name, image_url } = beer;
            return (
              <Col key={beer.id} style={{ position: 'relative', width: '50%', marginTop: 25 }}>
                <TouchableHighlight
                  onPress={() => navigate('SingleBeerScreen', { name: beer.name, data: beer })}
                >
                  <BeerPreviewCard name={name} imageUrl={image_url} />
                </TouchableHighlight>
              </Col>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
