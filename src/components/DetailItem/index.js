import React, { Component } from 'react';

import './detail-item.css';


class DetailItem extends Component {

  renderPhoneLink(url) {
    return (
      <a className="button" href={`${url}`}>
        Share image
      </a>
    );
  }

  render() {
    const item = this.props.item;
    return (
      <div className="detailWrap">
        <div className="detailOverlay" onClick={this.props.closeItem}/>
        <div className="detailItem">
          <div className="detailItem__image">
            <img src={item.get('url')} alt="" />
          </div>
          <div className="detailItem__info">
            <span className="detailItem__name">{item.getIn(['author','name'])}</span>
            <span className="detailItem__description">{item.getIn(['author','team'])}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default DetailItem;