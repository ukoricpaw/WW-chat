import { FC } from 'react';
import FindChat from './FindChat';
import SearchResultAccordion from './SearchResultAccordion';
import { ResultsList } from './ResultsList';

const SearchSection: FC = () => {
  return (
    <>
      <FindChat />
      <SearchResultAccordion />
      <ResultsList />
    </>
  );
};
export default SearchSection;
