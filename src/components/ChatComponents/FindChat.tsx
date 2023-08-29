import { FC, useEffect } from 'react';
import { Input } from '../UIComponents/Input';
import { FaSearch } from 'react-icons/fa';
import useFormFields from '../../hooks/useFormFields';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changeSearchValue } from '../../store/slices/searchSlice';

const FindChat: FC = () => {
  const [searchValue, setSearchValue] = useFormFields({ search: '' });
  const dispatch = useAppDispatch();
  const debouncedSearchValue = useDebounce({ value: searchValue.search, delay: 500 });
  const changeSearchHandler = setSearchValue('search');
  useEffect(() => {
    dispatch(changeSearchValue(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <>
      <Input
        value={searchValue.search}
        width="350"
        onChange={changeSearchHandler}
        variant={'light'}
        placeholder="Поиск"
      >
        <FaSearch size={18} />
      </Input>
    </>
  );
};

export default FindChat;
