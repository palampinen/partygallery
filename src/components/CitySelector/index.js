import React, { Component } from 'react';
import classnames from 'classnames';

import './city-selector.css';

class CitySelector extends Component {
  constructor(props) {
    super(props);

    this.renderCityOption = this.renderCityOption.bind(this);
  }

  renderCityOption(city) {
    const { cityId, setCityActive } = this.props;
    const selectedCity = city.get('id') === cityId;
    return (
      <button
        key={city.get('id')}
        onClick={() => setCityActive(city.get('id'))}
        className={classnames('city-option', { 'city-option__active': selectedCity })}
      >
        {city.get('name')}
      </button>
    )
  }

  render() {
    const { cities } = this.props;

    if (!cities || !cities.size) {
      return null;
    }

    return (
      <div className="city-selector">
        {cities.map(this.renderCityOption)}
      </div>
    );
  }
};

export default CitySelector;