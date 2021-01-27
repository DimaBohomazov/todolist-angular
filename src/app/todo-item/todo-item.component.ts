import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import TodoItem from '../../assets/todoCreator';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoItem;
  @Input() index: number;
  @Output() removeTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter<any>()

  editable:boolean = false;
  internalName:string;
  hidden?:boolean;

  constructor() { }
  ngOnInit(){
    this.internalName = this.todo.name
    this.hidden = this.todo.hidden
  }
  setEditable(value:boolean) {
    this.editable = value;
  }
  removeItem() {
    this.removeTodoItem.emit(this.index);
  }
  toggleStatus(){
    this.editTodoItem.emit([this.index, {status: !this.todo.status}]);
  }
  editTodoHandler(event: any){
    if(this.editable) {
    const newName = this.internalName.trim()
      if(event.keyCode === 13 || event.type === 'blur') {
        if(newName) {
          this.editTodoItem.emit([this.index, { name: newName }])
        } else {
          this.removeItem()
        }
        this.setEditable(false)
      } else if (event.keyCode === 27) {
        this.internalName = this.todo.name
        this.setEditable(false)
      } 
    } 
  }
}