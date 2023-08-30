import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import MemberItem from '../MemberComponents/MemberItem';
import { useAppSelector } from '../../hooks/reduxHooks';
import { contactInfoSelectorById } from '../../store/selectors/roomSelectors';

interface ContactInfoIProps {
  roomId: number;
}

const ContactInfo: FC<ContactInfoIProps> = ({ roomId }) => {
  const roomInfo = useAppSelector(state => contactInfoSelectorById(state, roomId));

  return (
    <div className={styles.contactInfo}>
      <MemberItem avatar={roomInfo?.avatar ?? null} name={roomInfo?.email as string} textVal="В сети" />
    </div>
  );
};

export default ContactInfo;
