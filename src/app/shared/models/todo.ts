export class Todo {
  constructor(
    public id?: string,
    public txt?: string,
    public done = false,
    public editable = false,
    public categorie?: string
  ) {}
}
