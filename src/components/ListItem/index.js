import React, { Component } from 'react';

import './list-item.css';


class ListItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <div className="listItem" onClick={() => this.props.selectItem(item)}>
        <div className="listItem__image">
          <img src={item.get('img')} alt={item.get('name')} />
        </div>
        <div className="listItem__info">
          <span className="listItem__name">{item.get('name')}</span>
        </div>
      </div>
    );
  }
};

export default ListItem;