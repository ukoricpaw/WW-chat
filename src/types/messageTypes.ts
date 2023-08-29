export interface MessagesState {
  // messages: MessageType[];
  messages: { createdAt: string; message: string }[];
}

export type MessageType = {
  id: number;
  text: string;
  isFixed: boolean;
  dateOfFix: string | null;
  receiverId: number;
  roomId: number;
};
