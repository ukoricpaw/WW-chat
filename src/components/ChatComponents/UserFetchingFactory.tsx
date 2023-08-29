import { SearchState } from '../../types/searchTypes';
import { FetchingUserDataBySearch } from '../../utils/fetchingUserDataBySearch';

interface UseFetchingFactoryIProps {
  type: SearchState['typeOfResult'];
}

const useFetchingFactory = ({ type }: UseFetchingFactoryIProps) => {
  let fetchingHook = FetchingUserDataBySearch()[type];
  return fetchingHook;
};

export default useFetchingFactory;
