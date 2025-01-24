import { makeAutoObservable } from 'mobx';

class Document {
  id: string;
  property_id: string;
  document_type?: string;
  summary?: string;
  main_informations?: any;
  storage_location?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;

  constructor(
    id: string,
    property_id: string,
    document_type?: string,
    summary?: string,
    main_informations?: any,
    storage_location?: string,
    metadata?: any,
    created_at?: string,
    updated_at?: string,
  ) {
    this.id = id;
    this.property_id = property_id;
    this.document_type = document_type;
    this.summary = summary;
    this.main_informations = main_informations;
    this.storage_location = storage_location;
    this.metadata = metadata;
    this.created_at = created_at;
    this.updated_at = updated_at;
    makeAutoObservable(this);
  }
}

export default Document;
