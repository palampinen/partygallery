import React, { Component } from 'react';

import { getShareUrl } from '../../services/share';
import './share-button.css';

class ShareButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandShare: false
    }
  }

  render() {
    const { item } = this.props;
    const shareUrl = getShareUrl(item.get('url'));

    if (this.state.expandShare) {
      setTimeout(() => {
        document.getElementById('share').select();
      });
    }
    return (
      <div
        className={`share-button ${this.state.expandShare ? 'open' : ''}`}
      >
        {!this.state.expandShare &&
          <div
            className="ion-android-share-alt share-toggle"
            onClick={() => this.setState({ expandShare: !this.state.expandShare })}
          />
        }

        {this.state.expandShare &&
          <div className="share-content">
            <span className="share-input">
              <input
                value={shareUrl}
                onClick={() => document.getElementById('share').select()}
                id="share"
                autoFocus
              />
            </span>
            <div className="buttons">
              <a
                className="ion-android-download download"
                download
                target="_blank"
                href={item.get('url')}
              />
              <div
                className="ion-android-arrow-forward share-toggle share-close"
                onClick={() => this.setState({ expandShare: false})}
            />
            </div>
          </div>
        }

      </div>
    );
  }
};

export default ShareButton;