import { makeAutoObservable } from 'mobx';
import Document from './Document';
import Conversation from './Conversation';

class Apartment {
  id: string;
  name: string;
  documents: Document[] = [];
  conversations: Conversation[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    makeAutoObservable(this);
  }

  addDocument(document: Document) {
    this.documents.push(document);
  }

  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
  }
}

export default Apartment;
