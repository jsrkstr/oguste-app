import { makeAutoObservable } from 'mobx';
import Message from './message';

class Conversation {
  id: string;
  messages: Message[] = [];

  constructor(id: string) {
    this.id = id;
    makeAutoObservable(this);
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }
}

export default Conversation;
