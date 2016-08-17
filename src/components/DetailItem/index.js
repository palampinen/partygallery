import React, { Component } from 'react';

import './detail-item.css';


class DetailItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <div className="detailItem">
        <div className="detailItem__image">
          <img src={item.get('img')} alt={item.get('name')} />
        </div>
        <div className="detailItem__info">
          <span className="detailItem__name">{item.get('name')}</span>
          <span className="detailItem__description">{item.get('description')}</span>
        </div>
      </div>
    );
  }
};

export default DetailItem;