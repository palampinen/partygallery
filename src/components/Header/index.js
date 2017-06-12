import React, { Component } from 'react';
import CitySelector from '../CitySelector';
import SortSelector from '../SortSelector';
import Loader from '../Loader';

import './header.css';

class Header extends Component {

  renderButtons() {
    return (
      <div className="header-buttons">
        <a className="back-button ion-android-close" onClick={this.props.closeItem}></a>
      </div>
    );
  }

  renderTitle() {
    if (this.props.logo) {
      return <img src={this.props.logo} alt={this.props.title} />
    }

    return this.props.title;
  }

  render() {
    const {
      cityId, cities, cityLoading, setCity, chosenItem,
      sortTypeOptions, sortType, setSortType, onUrlViewToggle
    } = this.props;
    return (
      <div className="header">
        {!!chosenItem && this.renderButtons() }
        <h2 className="header__title">
          {this.renderTitle()}
        </h2>

        {cityLoading
          ? <div className="city-loader"><Loader /></div>
          : <CitySelector cityId={cityId} cities={cities} setCityActive={setCity} />
        }

        {!chosenItem &&
          <div className="header-buttons">
            <a className="ion-images" onClick={onUrlViewToggle}></a>
            <SortSelector
              sortTypeOptions={sortTypeOptions}
              sortType={sortType}
              setSortTypeActive={setSortType} />
          </div>
        }
      </div>
    );
  }
};

export default Header;