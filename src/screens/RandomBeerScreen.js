import React, { Component } from 'react';
import { Text } from 'react-native';

// axios service
import axiosService from '../utils/lib/axiosService';
import SingleBeerScreen from './SingleBeerScreen';

export default class RandomBeerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'fetching random beer....',
    drawerLabel: 'Random Beer'
  });

  state = {
    randomBeer: [],
    loading: true
  };

  componentDidMount() {
    this._fetchRandomBeer();
  }

  _changeTitle = titleText => {
    this.props.navigation.setParams({ title: titleText });
  };

  _fetchRandomBeer = () => {
    axiosService
      .request({
        url: '/beers/random',
        method: 'GET'
      })
      .then(response => {
        this.setState({
          randomBeer: response.data,
          beerId: response.data[0].id,
          loading: false
        });

        this._changeTitle(response.data[0].name);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { loading, randomBeer } = this.state;

    if (!loading && randomBeer.length > 0) {
      return (
        <SingleBeerScreen
          navigation={this.props.navigation}
          beerData={randomBeer[0]}
        />
      );
    }
    return <Text>loading random beer</Text>;
  }
}
