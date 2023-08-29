export interface MessagesState {
  messages: MessageType[];
}

export type MessageType = {
  id: number;
  isChanged: boolean;
  text: string;
  isFixed: boolean;
  dateOfFix: string | null;
  receiverId: number;
  roomId: number;
};
