import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'filter'
})
export class FilterTodoList implements PipeTransform {
  transform(todoList: any, pathIndex: number): any {
    console.log('pathIndex', pathIndex)
    if (pathIndex === 1) {
      return todoList.map(item => item.status ? {...item, hidden: true} : item)
    } else if (pathIndex === 2) {
      return todoList.map(item => !item.status ? {...item, hidden: true} : item)
    } else {
     return todoList
    }
  }
}