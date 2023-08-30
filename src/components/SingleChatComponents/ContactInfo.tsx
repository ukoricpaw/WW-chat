import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { roomUserInfoSelector } from '../../store/selectors/roomSelectors';
import MemberItem from '../MemberComponents/MemberItem';

const ContactInfo: FC = () => {
  const roomInfo = useAppSelector(roomUserInfoSelector);
  console.log(roomInfo);
  return (
    <div className={styles.contactInfo}>
      <MemberItem avatar={roomInfo?.avatar ?? null} name={roomInfo?.email as string} textVal="В сети" />
    </div>
  );
};

export default ContactInfo;
