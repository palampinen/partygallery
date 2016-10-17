import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable'
import './App.css';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import DetailItem from '../components/DetailItem';
import ShareButton from '../components/ShareButton';
import { selectItem, closeItem, fetchItems, loadMoreItems } from '../actions/app-actions';

class App extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchItems();
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

    const { items, chosenItem, showLoadMore, lastItemId, loading } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <Header
            chosenItem={this.props.chosenItem}
            closeItem={this.props.closeItem}
            title={`Gallery`}
          />
        </div>
        <div className="App-content">
          { chosenItem && <ShareButton item={chosenItem} />}
          { chosenItem && this.renderItem(chosenItem) }
          <div className="App-content__scroll">
            { this.renderList(items) }
            { items && !!items.size && showLoadMore && this.renderLoadMoreButton(lastItemId, loading)}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  items: store.get('items', fromJS([])),
  chosenItem: store.get('chosenItem'),
  showLoadMore: store.get('showLoadMore'),
  lastItemId: store.get('lastItemId'),
  loading: store.get('loading')
});

const mapDispatchToProps = ({
  fetchItems,
  selectItem,
  loadMoreItems,
  closeItem
});

export default connect(mapStateToProps, mapDispatchToProps)(App);