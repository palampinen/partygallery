import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'
import './App.css';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import DetailItem from '../components/DetailItem';
import ShareButton from '../components/ShareButton';
import Loader from '../components/Loader';
import { startApp } from '../concepts/app';
import {
  getFeedSortType,
  getFeedSortTypeOptions,
  setSortType,
  selectItem,
  closeItem,
  loadMoreItems
} from '../concepts/feed';
import { isCityLoading, getCityList, getCityId, setCity } from '../concepts/city';

class App extends Component {

  componentDidMount() {
    this.props.startApp();
  }

  renderList(items) {
    return (
      <div className="gallery">
        {items.map((item, index) => (
          <ListItem key={index} item={item} selectItem={this.props.selectItem} />
        ))}
      </div>
    );
  }

  renderItem(item) {
    return (<DetailItem item={item} closeItem={this.props.closeItem} />);
  }


  renderLoadMoreButton(id, loading) {
    return (
    <button
      className={`btn ${loading ? 'inactive' : ''}`}
      onClick={() =>  !loading && this.props.loadMoreItems(id) }
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>);
  }

  render() {

    const {
      items, chosenItem, showLoadMore, lastItemId, loading,
      cities, cityId, cityLoading, setCity, sortType, sortTypeOptions
    } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <Header
            chosenItem={chosenItem}
            closeItem={this.props.closeItem}
            logo={'https://wappu.futurice.com/assets/whappu-accent.png'}
            title={`Whappu`}
            cityId={cityId}
            cities={cities}
            cityLoading={cityLoading}
            setCity={setCity}
            sortType={sortType}
            sortTypeOptions={sortTypeOptions}
            setSortType={this.props.setSortType}
          />
        </div>
        <div className="App-content">
          { chosenItem && <ShareButton item={chosenItem} />}
          { chosenItem && this.renderItem(chosenItem) }
          <div className="App-content__scroll">
            { !!items.size && this.renderList(items) }
            { !!loading && !items.size && <Loader />}
            { items && !!items.size && showLoadMore && this.renderLoadMoreButton(lastItemId, loading)}
          </div>
        </div>

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
  sortTypeOptions: getFeedSortTypeOptions(store)
});

const mapDispatchToProps = ({
  startApp,
  selectItem,
  loadMoreItems,
  closeItem,
  setCity,
  setSortType
});

export default connect(mapStateToProps, mapDispatchToProps)(App);