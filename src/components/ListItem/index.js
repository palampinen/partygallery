import React, { Component } from 'react';
import moment from 'moment';

import './list-item.css';


class ListItem extends Component {

  formatItemTitle(title) {
    return title === 'SYSTEM' ? 'GIF-Disco' : title;
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
          <span className="listItem__team">{item.getIn(['author','team'])}</span>
          <span className="listItem__time">
            <i className="ion-android-time icon" />
            {moment(item.get('createdAt')).format('D.M.YYYY HH:mm')}
          </span>
        </div>
      </div>
    );
  }
};

export default ListItem;