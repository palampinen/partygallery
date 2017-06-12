import React, { Component } from 'react';
import moment from 'moment';

import './list-item.css';


class ListItem extends Component {

  formatItemTitle(title) {
    return title === 'SYSTEM' ? 'Admin' : title;
  }
  render() {


    const item = this.props.item;
    const imageUrl =  item.get('url');

    return (
      <div className="listItem" onClick={() => this.props.selectItem(item)}>
        <div className="listItem__image">
          <div
            className="img"
            style={{backgroundImage: `url(${imageUrl})`}}
          />
        </div>
        <div className="listItem__info">
          <span className="listItem__name">{this.formatItemTitle(item.getIn(['author','name']))}</span>
          <span className="listItem__iconblock listItem__favorite">
            <i className="ion-android-favorite icon" />
            {item.get('votes')}
          </span>
          <span className="listItem__iconblock">
            <i className="ion-android-time icon" />
            {moment(item.get('createdAt')).format('D.M.YYYY HH:mm')}
          </span>
        </div>
      </div>
    );
  }
};

export default ListItem;