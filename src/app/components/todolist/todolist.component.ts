import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoService} from '../../_services/todo.service';
import {Todo} from '../../model/Todo';
import {SharedService} from '../../_services/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  title;
  description;
  onMain: any;
  currentSelectedTodo: Todo;
  todos: Todo[];
  filled = true;
  checked = false;
  visible = false;
  drawerPlacement = 'left';
  currentActionId = 1;

  constructor(private todoService: TodoService, private ss: SharedService, private router: Router) {
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
        this.currentActionId = item;
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

  open(todo: Todo): void {
    this.title = todo.title;
    this.description = todo.description;
    this.currentSelectedTodo = todo;
    this.visible = true;
  }

  save(name, description) {
    console.log(name + ' ' + description);
    this.todoService.updateTodo(name, description, this.currentSelectedTodo.id).subscribe(item => {
      // console.log(item);
    });
  }

  toggleSaveTodo(name, description, id, isCompleted: boolean, isFavorite: boolean) {
    console.log(id);
    this.todoService.updateTodoToggle(name, description, id, !isCompleted, !isFavorite).subscribe(item => {
      console.log(item);
    });
  }

  favoriteSaveTodo(name, description, id, isFavorite: boolean, isCompleted: boolean) {
    console.log(isCompleted);
    this.todoService.favoriteTodoUpdate(name, description, id, !isFavorite, isCompleted).subscribe(item => {
      console.log(item);
      this.todoService.gettTodoByActionId(this.currentActionId).subscribe(todos => {
        this.todos = todos;
        console.log(todos);
      });
    });
  }


  close(): void {
    this.visible = false;
  }


}
