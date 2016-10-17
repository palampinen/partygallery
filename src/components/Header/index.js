import React, { Component } from 'react';

import './header.css';

class Header extends Component {

  renderButtons() {
    return (
      <div className="header-buttons">
        <a className="back-button ion-android-close" onClick={this.props.closeItem}></a>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        {!!this.props.chosenItem && this.renderButtons() }
        <h2 className="header__title">
          {this.props.title}
        </h2>
      </div>
    );
  }
};

export default Header;