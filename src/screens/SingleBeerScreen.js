import React, { Component, Fragment } from 'react';
import { Dimensions, View, ScrollView, Text } from 'react-native';
import { Grid } from 'react-native-easy-grid';

// presentational components
import ContainedImage from '../components/Image/ContainedImage';
import WrappedTitle from '../components/Text/WrappedTitle';
import CardWithTitle from '../components/CardWithTitle';
import CardWithFooter from '../components/CardWithFooter';
import Divider from '../components/Divider';

export default class SingleBeerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name', 'single beer screen')
  });

  _changeTitle = titleText => {
    const { setParams } = this.props.navigation;
    setParams({ title: titleText });
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
    const { height } = Dimensions.get('window');
    const beerData =
      this.props.navigation.getParam('data') || this.props.beerData;
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
    } = beerData;

    return (
      <ScrollView>
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
            <CardWithFooter bodyContent="ABV" footerContent={abv} />
            <CardWithFooter bodyContent="SRM" footerContent={srm} />
            <CardWithFooter bodyContent="PH" footerContent={ph} />
            <CardWithFooter bodyContent="IBU" footerContent={ibu} />
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
    );
  }
}
