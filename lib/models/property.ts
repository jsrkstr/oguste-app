import { makeAutoObservable } from 'mobx';
import Document from './document';
import Conversation from './conversation';

class Property {
  id: string;
  name?: string;
  organisation_id?: string;
  user_id?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
  documents: Document[] = [];
  conversations: Conversation[] = [];

  constructor(
    id: string,
    name?: string,
    organisation_id?: string,
    user_id?: string,
    metadata?: any,
    created_at?: string,
    updated_at?: string,
  ) {
    this.id = id;
    this.name = name;
    this.organisation_id = organisation_id;
    this.user_id = user_id;
    this.metadata = metadata;
    this.created_at = created_at;
    this.updated_at = updated_at;
    makeAutoObservable(this);
  }

  addDocument(document: Document) {
    this.documents.push(document);
  }

  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
  }
}

export default Property;
