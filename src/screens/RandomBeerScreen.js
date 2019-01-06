import React, { Component, Fragment } from 'react';
import {
  RefreshControl,
  Dimensions,
  View,
  ScrollView,
  Text
} from 'react-native';
import { Grid } from 'react-native-easy-grid';

// presentational components
import ContainedImage from '../components/Image/ContainedImage';
import WrappedTitle from '../components/Text/WrappedTitle';
import CardWithTitle from '../components/CardWithTitle';
import CardWithFooter from '../components/CardWithFooter';
import Divider from '../components/Divider';
import HeaderBack from '../navigation/HeaderBack';

// axios service
import axiosService from '../utils/lib/axiosService';

export default class RandomBeerScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Random Beer'
  };

  state = {
    randomBeer: [],
    loading: true,
    refreshing: false
  };

  componentDidMount() {
    this._fetchRandomBeer();
  }

  _fetchRandomBeer = () => {
    axiosService
      .request({
        url: '/beers/random',
        method: 'GET'
      })
      .then(response => {
        this.setState({
          randomBeer: response.data[0],
          beerId: response.data[0].id,
          loading: false,
          refreshing: false
        });
      })
      .catch(err => console.log(err));
  };

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => this._fetchRandomBeer());
  };

  _renderIngredientItems = ingredientItems => {
    const items = [];

    if (typeof ingredientItems === 'object') {
      ingredientItems.map((item, key) => {
        if (typeof item === 'object') {
          items.push(
            <View key={key} style={{ lineHeight: 24, padding: 2 }}>
              <Text
                align="left"
                style={{
                  fontSize: 14,
                  color: 'rgba(0, 0, 0, 0.87)',
                  lineHeight: 24
                }}
              >
                {item.name}
              </Text>
              <Text key={key}>
                {item.amount.value} {item.amount.unit}
              </Text>
              {key < ingredientItems.length - 1 && <Divider />}
            </View>
          );
        }
      });
    }

    return items;
  };

  _renderIngredientsList = ingredients => {
    const ingredientsList = [];

    Object.keys(ingredients).map(key =>
      ingredientsList.push(
        <View
          key={key}
          style={{
            position: 'relative',
            width: '100%',
            padding: 2
          }}
        >
          {this._renderIngredientItems(ingredients[key])}
        </View>
      )
    );

    return ingredientsList;
  };

  _renderFoodPairingList = pairing => {
    const pairingList = [];

    pairing.map((item, key) =>
      pairingList.push(
        <Fragment key={key}>
          <Text>{`${item} \n`}</Text>
        </Fragment>
      )
    );

    return pairingList;
  };

  render() {
    const { loading, randomBeer, refreshing } = this.state;
    const { height } = Dimensions.get('window');
    const {
      name,
      image_url,
      brewers_tips,
      food_pairing,
      description,
      ingredients,
      abv,
      srm,
      ph,
      ibu
    } = randomBeer;

    if (loading) {
      return (
        <Text
          style={{
            textAlign: 'center',
            flex: 1
          }}
        >
          loading random beer
        </Text>
      );
    }

    return (
      <Fragment>
        <HeaderBack navigation={this.props.navigation} title={name} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Grid>
            <View
              style={{
                position: 'relative',
                top: 10,
                height: height * 0.33,
                width: '100%'
              }}
            >
              <ContainedImage
                source={{ uri: image_url }}
                style={{ height: '100%', width: '100%' }}
              />
            </View>
          </Grid>
          <View
            style={{
              height: '100%',
              width: '100%',
              marginTop: 20
            }}
          >
            <View>
              <WrappedTitle>{name}</WrappedTitle>
            </View>
            <View style={{ marginTop: 50 }}>
              <CardWithTitle
                title="Description"
                content={description}
                contentContainer="text"
              />
            </View>
            <View
              style={{
                width: '92%',
                left: '1%',
                justifyContent: 'space-evenly',
                marginTop: 50,
                flexDirection: 'row'
              }}
            >
              <CardWithFooter
                bodyContent="ABV"
                footerContent={abv.toString()}
              />
              <CardWithFooter
                bodyContent="SRM"
                footerContent={srm.toString()}
              />
              <CardWithFooter bodyContent="PH" footerContent={ph.toString()} />
              <CardWithFooter
                bodyContent="IBU"
                footerContent={ibu.toString()}
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <CardWithTitle
                title="Ingredients"
                content={this._renderIngredientsList(ingredients)}
                contentContainer="view"
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <CardWithTitle
                title="Food Pairing"
                content={this._renderFoodPairingList(food_pairing)}
                contentContainer="text"
              />
            </View>
            <View style={{ marginTop: 50, marginBottom: 50 }}>
              <CardWithTitle
                title="Brewers Tips"
                content={brewers_tips}
                contentContainer="text"
              />
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
