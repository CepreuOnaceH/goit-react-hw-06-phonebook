import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filtersSlice';

function Filter() {
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
  const onFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <input
      type="text"
      name="filter"
      placeholder="Start to tape your contact`s name"
      value={filter}
      onChange={onFilterChange}
    />
  );
}
export default Filter;
