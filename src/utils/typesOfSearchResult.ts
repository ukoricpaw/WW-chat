import { SearchState } from '../types/searchTypes';

type TypeOfSearchResult = { title: string; type: SearchState['typeOfResult'] };

export const typesOfSearchResult: TypeOfSearchResult[] = [
  {
    type: 'users',
    title: 'Пользователи',
  },
  {
    type: 'friends',
    title: 'Контакты',
  },
];

const onlyTypesOfSearch = typesOfSearchResult.map(typeOfSearch => typeOfSearch.title);
export type SearchTypes = typeof onlyTypesOfSearch;
