export enum ChatClientToServerEvents {
  ChatsBetween = 'chatsBetween',
  ChatMessages = 'chatMessages',
  SendMessageToChat = 'sendMessageToChat',
}

export enum ChatServerToClientEvents {
  ReceiveChats = 'receiveChats',
  ReceiveMessages = 'receiveMessages',
}
