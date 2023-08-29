import { MessageType } from './messageTypes';
import { UserType } from './userTypes';

type RoomType = 'dialog' | 'group';
interface GroupType {
  avatar: string | null;
  name: string;
  description: string | null;
  membersCount: number;
  members: Omit<UserType, 'isActivated'>;
}

type UserInfoType = Omit<UserType, 'isActivated'> & {
  isTyping: boolean;
  isOnline: boolean;
};

export interface RoomState {
  roomType: RoomType;
  groupInfo: GroupType | null;
  userInfo: UserInfoType | null;
}

export interface ChatsState {
  chats: ChatNotificationType[];
}

interface ChatNotificationType {
  userInfo: UserInfoType;
  receiverId: number;
  message: string;
  countOfUnreadMessages: number;
}

type RoomResponseType = {
  avatar: null | string;
  createdAt: string;
  description: null | string;
  id: number;
  isGroup: boolean;
  name: string | null;
  updatedAt: string;
  user1Id: number;
  user2Id: number;
};

export interface DataByJoiningRoom {
  userId: number;
  data: {
    messages: {
      count: number;
      rows: MessageType[];
    };
    room: RoomResponseType;
  };
}
