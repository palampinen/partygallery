import React, { Component } from 'react';

import './tabs.css';


class Tabs extends Component {
  render() {
    return (
      <div className="tabs">
        {this.props.tabs.map((tab,index) => {
          const isActive = this.props.currentTab === index;
          return (
            <div
              key={index}
              onClick={() => !isActive ? this.props.selectTab(index) : false}
              className={`tab${isActive ? ' active' : ''}`}
            >
              {tab}
            </div>
          );
        })}
      </div>
    );
  }
};

export default Tabs;