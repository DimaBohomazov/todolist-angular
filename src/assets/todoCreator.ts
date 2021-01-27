
interface Todo {
  name: string;
  id: number | string;
  status: boolean;
  hidden?: boolean;
}

export default class TodoItem implements Todo {
  name; id; status; hidden?;

  constructor(name: string, id: number = Number(new Date), status: boolean = false, hidden?: boolean) {
    this.name = name;
    this.id = id;
    this.status = status;
    this.hidden = hidden;
  }
}