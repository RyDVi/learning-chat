export enum ChatClientToServerEvents {
  ChatsBetween = 'chatsBetween',
  ChatMessages = 'chatMessages',
}

export enum ChatServerToClientEvents {
  ReceiveChats = 'receiveChats',
  ReceiveMessages = 'receiveMessages',
}
