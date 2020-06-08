import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoService} from '../../_services/todo.service';
import {Todo} from '../../model/Todo';
import {SharedService} from '../../_services/shared.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  onMain: any;

  todos: Todo[];
  filled = true;
  checked = true;
  visible = false;
  drawerPlacement = 'left';

  constructor(private todoService: TodoService, private ss: SharedService) {
    this.onMain = 1;
    this.ss = ss;
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(todos => {
      this.todos = todos;
      console.log(todos);
    });

    this.ss.getEmittedValue()
      .subscribe(item => {
        this.todoService.gettTodoByActionId(item).subscribe(todos => {
          this.todos = todos;
          console.log(todos);
        });
        return this.onMain = item;
      });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  changeStarIconType() {
    this.filled = !this.filled;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


}
