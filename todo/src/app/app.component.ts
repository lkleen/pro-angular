import { Component } from '@angular/core';
import { TodoItem } from "./todoItems";
import { TodoList } from "./todoList";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private list = new TodoList(
    "Peter", [
      new TodoItem("foo", true),
      new TodoItem("bar"),
      new TodoItem("baz"),
    ]);

  get username(): string {
    return this.list.user;
  }

  get itemCount(): number {
    return this.list.items.filter(item => !item.complete).length;
  }

  get items(): readonly TodoItem[] {
    return this.list.items.filter(item => this.showComplete || !item.complete );
  }

  addItem (item: string) {
    this.list.addItem (item);
  }

  showComplete: boolean = false;
}
