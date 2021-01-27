import { Component, OnInit, DoCheck } from '@angular/core';
import {Subject} from 'rxjs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { getLocalStorage, setLocalStorage } from '../assets/localStorage'
import TodoItem from '../assets/todoCreator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit, DoCheck {
  todoList: Array<TodoItem> = [];
  todoList$$: Subject<TodoItem[]> = new Subject();

  displayedTodoList: TodoItem[] = []
  mainInputValue: string = '';
  toggleAllInput: boolean = false;
  uncompletedItemsCounter: number;

  currentPath$$: Subject<any> = new Subject();
  currentPath: string;
  location: Location;
  pathList: string[] = ['#/', '#/active', '#/completed']

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.todoList$$.subscribe((item: TodoItem[]) => {
      this.uncompletedItemsCounter = item.filter((el) => el.status !== true).length
      this.toggleAllInput = !this.uncompletedItemsCounter
      this.filterForTodoList()
      setLocalStorage('TODO', this.todoList)
    })
    this.currentPath$$.subscribe((path) => {
      if (this.pathList.includes(path)){
        this.currentPath = path
      } else {
        this.location.go('#/')
        this.currentPath = '#/'
      } 
      this.filterForTodoList()
    })
    
    this.todoList = getLocalStorage('TODO')
    this.todoList$$.next(this.todoList);
    this.setCurrentPath(this.location.path(true))
    this.filterForTodoList()
  }
  ngDoCheck(): void {
  }
  addTodoItem(name: string) {
    if (this.mainInputValue.trim()){
      const item: TodoItem = new TodoItem(name)  
      this.todoList.push(item)
      this.todoList$$.next(this.todoList);
    }
    this.mainInputValue = ''
  }
  removeTodoItem(index: number) {
    this.todoList.splice(index, 1);
    this.todoList$$.next(this.todoList);
  }
  removeCompleteItems() {
    this.todoList = this.todoList.filter((item) => !item.status )
    this.todoList$$.next(this.todoList);
  }
  switchStatusForAll() {
    this.todoList.forEach(item => item.status = !this.toggleAllInput);
    this.todoList$$.next(this.todoList);
  }
  editTodoItemByIndex(props: Array<any>) {
    const [index, property] = props
    this.todoList[index] = { ...this.todoList[index], ...property };
    this.todoList$$.next(this.todoList);
  }
  setCurrentPath(path:string) {
    this.currentPath$$.next(path)
  }
  filterForTodoList() {
    const pathIndex = this.pathList.indexOf(this.currentPath)
    if (pathIndex === 1) {
      this.displayedTodoList = this.todoList.map(item => item.status ? {...item, hidden: true} : item)
    } else if (pathIndex === 2) {
      this.displayedTodoList = this.todoList.map(item => !item.status ? {...item, hidden: true} : item)
    } else {
      this.displayedTodoList = this.todoList
    }
  }
  trackTodoItem = (index: number, item: TodoItem) => item
  
}
