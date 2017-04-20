import React, { Component } from 'react';
import classnames from 'classnames';

import './sort-selector.css';

class SortSelector extends Component {
  constructor(props) {
    super(props);

    this.renderSortOption = this.renderSortOption.bind(this);
  }

  renderSortOption(sortTypeOption, index, sortTypeOptions) {
    const { sortType, setSortTypeActive } = this.props;
    const selectedSortType = sortTypeOption.get('name') === sortType;
    const nextSortTypeIndex = index >= (sortTypeOptions.size - 1) ? 0 : (index + 1);
    const nextSortType = sortTypeOptions.get(nextSortTypeIndex);

    return (
      <button
        key={sortTypeOption.get('name')}
        onClick={() => setSortTypeActive(nextSortType.get('name'))}
        className={classnames('sort-option', { 'sort-option--active': selectedSortType })}
      >
        <i className={sortTypeOption.get('icon')} />
      </button>
    )
  }

  render() {
    const { sortTypeOptions } = this.props;

    if (!sortTypeOptions || !sortTypeOptions.size) {
      return null;
    }

    return (
      <div className="sort-selector">
        {sortTypeOptions.map(this.renderSortOption)}
      </div>
    );
  }
};

export default SortSelector;