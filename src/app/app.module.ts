import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterTodoList } from './filterTodoList.pipe'
import {AutofocusDirective} from './directives/AutoFocus'
@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    FilterTodoList,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
