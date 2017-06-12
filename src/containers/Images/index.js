import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'

import ListItem from '../../components/ListItem';
import DetailItem from '../../components/DetailItem';
import ShareButton from '../../components/ShareButton';
import Loader from '../../components/Loader';

import {
  selectItem,
  closeItem,
  loadMoreItems,
  toggleUrlView,
  isUrlViewVisible,
  getFeedImages
} from '../../concepts/feed';

class Images extends Component {
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

  renderUrls(items) {
    const urls = items.map((item, index) => item.get('url')).toJS().join('\n');
    return (<div className="url-list"><textarea className="url-list-area">{urls}</textarea></div>);
  }

  render() {

    const {
      items, chosenItem, showLoadMore, lastItemId, loading, urlViewVisible
    } = this.props;


    return (
      <div className="App-content">
        { chosenItem && <ShareButton item={chosenItem} />}
        { chosenItem && this.renderItem(chosenItem) }
        <div className="App-content__scroll">
          { urlViewVisible && this.renderUrls(items) }
          { !!items.size && this.renderList(items) }
          { !!loading && !items.size && <Loader />}
          { items && !!items.size && showLoadMore && this.renderLoadMoreButton(lastItemId, loading)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  items: getFeedImages(store),
  chosenItem: store.feed.get('chosenItem'),
  showLoadMore: store.feed.get('showLoadMore'),
  lastItemId: store.feed.get('lastItemId'),
  loading: store.feed.get('loading'),
  urlViewVisible: isUrlViewVisible(store)
});

const mapDispatchToProps = ({
  selectItem,
  loadMoreItems,
  closeItem
});

export default connect(mapStateToProps, mapDispatchToProps)(Images);