'use client';

import { FC } from 'react';
import styles from '../../styles/ChatAside.module.scss';
import { typesOfSearchResult } from '../../utils/typesOfSearchResult';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changeTypeOfResults } from '../../store/slices/searchSlice';
import { SearchState } from '../../types/searchTypes';

const SearchResultAccordion: FC = () => {
  const dispatch = useAppDispatch();

  const changeTypeOfResult = (type: SearchState['typeOfResult']) => {
    dispatch(changeTypeOfResults(type));
  };

  return (
    <ul className={styles.typesOfResults}>
      {typesOfSearchResult.map(typeOfSearch => {
        return (
          <li
            className={styles.typeAnchor}
            onClick={() => changeTypeOfResult(typeOfSearch.type)}
            key={typeOfSearch.type}
          >
            {typeOfSearch.title}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultAccordion;
