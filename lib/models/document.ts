import { makeAutoObservable } from 'mobx';

class Document {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    makeAutoObservable(this);
  }
}

export default Document;
