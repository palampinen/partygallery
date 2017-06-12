import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'
import './App.css';
import Header from '../components/Header';

import { startApp } from '../concepts/app';
import {
  getFeedSortType,
  getFeedSortTypeOptions,
  setSortType,
  toggleUrlView,
  isUrlViewVisible
} from '../concepts/feed';
import { isCityLoading, getCityList, getCityId, setCity } from '../concepts/city';

class App extends Component {

  componentDidMount() {
    this.props.startApp();
  }

  render() {

    const {
      items, chosenItem, showLoadMore, lastItemId, loading,
      cities, cityId, cityLoading, setCity, sortType, sortTypeOptions, urlViewVisible,
      children
    } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <Header
            chosenItem={chosenItem}
            closeItem={this.props.closeItem}
            logo={'https://raw.githubusercontent.com/futurice/prahapp-site/master/assets/Futubohemia_logo_blue.png'}
            title={`Futubohemia`}
            cityId={cityId}
            cities={cities}
            cityLoading={cityLoading}
            setCity={setCity}
            sortType={sortType}
            sortTypeOptions={sortTypeOptions}
            setSortType={this.props.setSortType}
            onUrlViewToggle={this.props.toggleUrlView}
          />
        </div>

        {children}

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  cities: getCityList(store),
  cityId: getCityId(store),
  cityLoading: isCityLoading(store),
  items: store.feed.get('items', fromJS([])),
  chosenItem: store.feed.get('chosenItem'),
  showLoadMore: store.feed.get('showLoadMore'),
  lastItemId: store.feed.get('lastItemId'),
  loading: store.feed.get('loading'),
  sortType: getFeedSortType(store),
  sortTypeOptions: getFeedSortTypeOptions(store),
  urlViewVisible: isUrlViewVisible(store)
});

const mapDispatchToProps = ({
  startApp,
  setCity,
  setSortType,
  toggleUrlView
});

export default connect(mapStateToProps, mapDispatchToProps)(App);