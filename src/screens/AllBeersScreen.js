import React, { Component, Fragment } from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Text
} from 'react-native';

// presentational components
import ContainedImage from '../components/Image/ContainedImage';
import BeerPreviewCard from '../components/BeerPreviewCard';

// app theme
import { colors } from '../config/theme';

// axios service
import axiosService from '../utils/lib/axiosService';
import SearchBar from '../components/SearchBar/SearchBar';
import AppDrawerMenu from '../navigation/AppDrawerMenu';

// screen height and width
const { width, height } = Dimensions.get('window');

export default class AllBeersScreen extends Component {
  static navigationOptions = ({ navigation, props }) => ({
    title: 'Beer Fetch',
    drawerLabel: 'Home'
  });

  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    flatListReady: false,
    error: null,
    searchBar: {
      selected: 'beer_name',
      searchText: ''
    }
  };

  componentDidMount() {
    this._fetchAllBeers();
  }

  _fetchAllBeers = () => {
    const { page, searchBar } = this.state;
    const URL = searchBar.searchText
      ? `/beers?page=${page}&per_page=10&${searchBar.selected}=${
          searchBar.searchText
        }`
      : `/beers?page=${page}&per_page=10`;

    axiosService
      .request({
        url: URL,
        method: 'GET'
      })
      .then(response => {
        this.setState((prevState, nextProps) => ({
          data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
          loading: false,
          loadingMore: false,
          refreshing: false
        }));
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _fetchFilteredBeers = () => {
    const { page, searchBar } = this.state;

    this.setState(
      {
        page: 1,
        data: [],
        filtering: true,
        flatListReady: false
      },
      () => {
        axiosService
          .request({
            url: `/beers?page=${page}&per_page=10&${searchBar.selected}=${
              searchBar.searchText
            }`,
            method: 'GET'
          })
          .then(response => {
            this.setState((prevState, nextProps) => ({
              data: Array.from(response.data),
              refreshing: false,
              filtering: false,
              loadingMore: false
            }));
          })
          .catch(error => {
            this.setState({ error, loadingMore: false });
          });
      }
    );
  };

  _handleScrolled = () => {
    if (!this.state.flatListReady) {
      this.setState(
        (prevState, nextProps) => ({ flatListReady: true }),
        () => {
          this._handleLoadMore();
        }
      );
    }
  };

  _handleOnValueChange = value => {
    this.setState({
      searchBar: {
        ...this.state.searchBar,
        selected: value
      }
    });
  };

  _handleOnChangeText = text => {
    if (text.length > 0) {
      this.setState(
        {
          searchBar: {
            ...this.state.searchBar,
            searchText: text
          }
        },
        () => {
          this._fetchFilteredBeers();
        }
      );
    } else {
      this.setState(
        {
          searchBar: {
            ...this.state.searchBar,
            searchText: ''
          }
        },
        () => {
          this._fetchAllBeers();
        }
      );
    }
  };

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this._fetchAllBeers();
      }
    );
  };

  _handleLoadMore = () => {
    if (this.state.flatListReady) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true
        }),
        () => {
          this._fetchAllBeers();
        }
      );
    }
  };

  _formatResultsText = (total, text) => {
    if (total > 1 || total === 0) return `${total} ${text}s`;
    return `${total} ${text}`;
  };

  _renderHeader = () => {
    const { filtering, searchBar, data } = this.state;

    return (
      <View
        style={{
          position: 'relative',
          height: height * 0.33,
          width
        }}
      >
        <SearchBar
          handleOnValueChange={this._handleOnValueChange}
          handleOnChangeText={this._handleOnChangeText}
          selected={this.state.searchBar.selected}
          style={{ position: 'relative' }}
        />
        <ContainedImage
          resizeMode="cover"
          source={require('../images/header_background.jpg')}
          style={{ height: '100%', width: '100%' }}
        />
        {filtering ? (
          <ActivityIndicator />
        ) : searchBar.searchText.length > 0 ? (
          <Text
            style={{ textAlign: 'center', marginTop: 2 }}
          >{`${this._formatResultsText(data.length, 'result')} found`}</Text>
        ) : null}
      </View>
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: colors.veryLightPink
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;

    return !this.state.loading ? (
      <Fragment>
        <AppDrawerMenu navigation={this.props.navigation} />
        <ScrollView onScrollBeginDrag={this._handleScrolled}>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'column',
              height: '100%',
              width: '100%'
            }}
            numColumns={2}
            data={this.state.data}
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 25,
                  width: '50%'
                }}
              >
                <TouchableHighlight
                  onPress={() =>
                    navigate('SingleBeerScreen', {
                      name: item.name,
                      data: item
                    })
                  }
                  underlayColor="white"
                >
                  <BeerPreviewCard name={item.name} imageUrl={item.image_url} />
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderFooter}
            onRefresh={this._handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            maxToRenderPerBatch={2}
          />
        </ScrollView>
      </Fragment>
    ) : (
      <View>
        <Text style={{ alignSelf: 'center' }}>Loading beers</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
