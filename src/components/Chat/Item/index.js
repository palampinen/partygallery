import React, { Component } from 'react';
import moment from 'moment';

import './chat-item.css';


class ChatItem extends Component {

  formatItemTitle(title) {
    return title === 'SYSTEM' ? 'Admin' : title;
  }

  renderImageMessage() {
    const { item } = this.props;

    return (<div className="chatItem__image">
      <div
        className="img"
        style={{backgroundImage: `url(${item.get('url')})`}}
        />

        <div className="chatItem__info">
          <span className="chatItem__name">{this.formatItemTitle(item.getIn(['author','name']))}</span>
          <span className="chatItem__iconblock chatItem__favorite">
            <i className="ion-android-favorite icon" />
            {item.get('votes')}
          </span>
          <span className="chatItem__iconblock">
            <i className="ion-android-time icon" />
            {moment(item.get('createdAt')).format('D.M.YYYY HH:mm')}
          </span>
        </div>

    </div>
    );
  }

  renderTextMessage() {
    const { item } = this.props;

    return (
      <div className="chatItem__text">
        {item.get('text')}
      </div>
    );
  }

  render() {
    const { item, odd } = this.props;
    const isImage = item.get('type') === 'IMAGE';

    return (
      <div className={`chatItem ${odd ? 'chatItem--odd' : ''}`} onClick={() => isImage && this.props.selectItem(item)}>
        <div className="chatItem__avatar">
          <div
            className="chatItem__avatar__img"
            style={{backgroundImage: `url(${item.getIn(['author', 'profilePicture'])})`}} />
        </div>

        {isImage
          ? this.renderImageMessage()
          : this.renderTextMessage()
        }
      </div>
    );
  }
};

export default ChatItem;