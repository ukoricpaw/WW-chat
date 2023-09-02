import { MessageType } from './messageTypes';
import { UserType } from './userTypes';

type RoomType = 'dialog' | 'group';
interface GroupType {
  avatar: string | null;
  name: string;
  description: string | null;
  membersCount: number;
  members: UserType[];
}

type UserInfoType = Omit<UserType, 'isActivated'> & {
  isTyping: boolean;
  isOnline: boolean;
};

export interface RoomsState {
  isLoading: boolean;
  rooms: RoomInfoType[];
  roomIds: number[];
}

export type RoomInfoType = {
  roomType: RoomType;
  roomId: number;
  lastMessage: LastMessageType | null;
  groupInfo: GroupType | null;
  userInfo: UserInfoType | null;
};

export type LastMessageType = Pick<MessageType, 'isFixed' | 'text'> & {
  createdAt: string;
  user: Omit<UserType, 'isActivated'>;
};

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

export interface DataByJoiningToDialog {
  userId: number;
  data: {
    messages: {
      count: number;
      rows: MessageType[];
    } | null;
    user: Omit<UserType, 'isActivated'> | null;
    room: RoomResponseType | null;
  };
}

interface CountAndRows<T> {
  count: number;
  rows: T[];
}

export interface RoomsResponse {
  dialogRooms: CountAndRows<DialogRoomResponse>;
  groupRooms: CountAndRows<GroupRoomResponse>;
}

interface LastMessageInterface {
  lastMessage: LastMessageType;
}

interface DialogRoomResponse extends LastMessageInterface {
  room: Pick<RoomResponseType, 'createdAt' | 'id' | 'updatedAt' | 'user1Id' | 'user2Id'>;
  user: Omit<UserType, 'isActivated'>;
}

interface GroupRoomResponse extends LastMessageInterface {
  room: Omit<RoomResponseType, 'user1Id' | 'user2Id'>;
}
