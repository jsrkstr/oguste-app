import { makeAutoObservable } from 'mobx';
import Property from './property';

class Organisation {
  id: string;
  name?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
  properties: Property[] = [];

  constructor(
    id: string,
    name?: string,
    metadata?: any,
    created_at?: string,
    updated_at?: string,
  ) {
  this.id = id;
  this.name = name;
  this.metadata = metadata;
  this.created_at = created_at;
  this.updated_at = updated_at;
  makeAutoObservable(this);
}

  addProperty(property: Property) {
    this.properties.push(property);
  }
}

export default Organisation;
