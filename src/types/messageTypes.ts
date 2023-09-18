export interface MessagesState {
  messages: MessageType[];
  isLoading: boolean;
  roomId: null | number;
  page: number;
  totalCount: number;
}

export type MessageType = {
  createdAt: string;
  id: number;
  isChanged: boolean;
  text: string;
  isFixed: boolean;
  dateOfFix: string | null;
  receiverId: number;
  roomId: number;
};
