import React, { Component } from 'react';

import './header.css';

class Header extends Component {

  renderBackButton() {
    return (<a className="back-button" onClick={this.props.closeItem}>&times;</a>);
  }

  render() {
    return (
      <div className="header">
        {this.props.isInDetailView && this.renderBackButton() }
        <h2 className="header__title">
          {this.props.title}
        </h2>
      </div>
    );
  }
};

export default Header;