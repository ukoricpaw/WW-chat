import { FC } from 'react';
import { useAppSelector } from './../../hooks/reduxHooks';
import { searchValueSelector, typeValueSelector } from './../../store/selectors/searchSelectors';
import useFetchingFactory from './UserFetchingFactory';
import MemberItem from '../MemberComponents/MemberItem';
import styles from '../../styles/ChatAside.module.scss';
import { Link } from 'react-router-dom';

export const ResultsList: FC = () => {
  const searchValue = useAppSelector(searchValueSelector);
  const typeValue = useAppSelector(typeValueSelector);
  const fetchingHook = useFetchingFactory({ type: typeValue });

  const { data, isLoading, isError } = fetchingHook({ search: searchValue, page: 1 });

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (!searchValue.trim()) {
    return <></>;
  }

  return (
    <ul className={styles.resultsList}>
      {searchValue.trim().length > 0 &&
        (data && data.rows.length > 0 ? (
          data.rows.map(user => (
            <Link to={`${process.env.REACT_APP_CLIENT_URL}/chat/${user.email}`} key={user.id}>
              <MemberItem key={user.id} name={user.email} avatar={user.avatar} textVal={user.email} />
            </Link>
          ))
        ) : (
          <p>Ничего не найдено по Вашему запросу</p>
        ))}
    </ul>
  );
};
