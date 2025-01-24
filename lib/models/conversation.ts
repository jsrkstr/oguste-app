import { makeAutoObservable } from 'mobx';
import Message from './message';

class Conversation {
  id: string;
  property_id: string;
  user_id: string;
  label?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
  messages: Message[] = [];

  constructor(
    id: string,
    property_id: string,
    user_id: string,
    label?: string,
    metadata?: any,
    created_at?: string,
    updated_at?: string,
  ) {
    this.id = id;
    this.property_id = property_id;
    this.user_id = user_id;
    this.label = label;
    this.metadata = metadata;
    this.created_at = created_at;
    this.updated_at = updated_at;
    makeAutoObservable(this);
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }
}

export default Conversation;
