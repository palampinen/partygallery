import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'

import ListItem from '../../components/Chat/Item';
import DetailItem from '../../components/DetailItem';
import ShareButton from '../../components/ShareButton';
import Loader from '../../components/Loader';

import {
  selectItem,
  closeItem,
  loadMoreItems,
  toggleUrlView,
  isUrlViewVisible
} from '../../concepts/feed';

class Images extends Component {
  renderList(items) {
    return (
      <div className="chat">
        {items.map((item, index) => (
          <ListItem key={index} odd={index % 2 !== 0} item={item} selectItem={this.props.selectItem} />
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
  items: store.feed.get('items', fromJS([])),
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