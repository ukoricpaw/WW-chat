import { FC } from 'react';
import styles from '../../styles/MemberChat.module.scss';
import { getNameByEmail } from '../../utils/getNameByEmail';

interface MemberItemIProps {
  avatar: string | null;
  name: string;
  textVal: string;
}

const MemberItem: FC<MemberItemIProps> = ({ avatar, name, textVal }) => {
  const nameByEmail = getNameByEmail(name);

  return (
    <div className={styles.memberLayout}>
      {/* {avatar ? (
        <Image src={} priority width={} height={} loader={} alt="user_image" />
      ) : ( */}
      <div className={styles.userNullAvatar}>{nameByEmail[0]}</div>
      {/* )} */}
      <div className={styles.memberLayout__info}>
        <p className={styles.memberName}>{nameByEmail}</p>
        <p className={styles.memberTextVal}>{textVal}</p>
      </div>
    </div>
  );
};

export default MemberItem;
