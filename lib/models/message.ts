import { makeAutoObservable } from 'mobx';

class Message {
  id: string;
  conversation_id: string;
  content?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;

  constructor(
    id: string,
    conversation_id: string,
    content?: string,
    metadata?: any,
    created_at?: string,
    updated_at?: string,
  ) {
    this.id = id;
    this.conversation_id = conversation_id;
    this.content = content;
    this.metadata = metadata;
    this.created_at = created_at;
    this.updated_at = updated_at;
    makeAutoObservable(this);
  }

}

export default Message;
