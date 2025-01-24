import { makeAutoObservable } from 'mobx';

class Message {
  id: string;
  content: string;

  constructor(id: string, content: string) {
    this.id = id;
    this.content = content;
    makeAutoObservable(this);
  }
}

export default Message;
