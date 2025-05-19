export enum ChatClientToServerEvents {
  ChatsBetween = 'chatsBetween',
  ChatsSearch = 'chatsSearch',
  ChatMessages = 'chatMessages',
  SendMessageToChat = 'sendMessageToChat',
}

export enum ChatServerToClientEvents {
  ReceiveChats = 'receiveChats',
  ReceiveMessages = 'receiveMessages',
}
