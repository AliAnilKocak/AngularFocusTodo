import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoService} from '../../_services/todo.service';
import {Todo} from '../../model/Todo';
import {SharedService} from '../../_services/shared.service';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  currentActionId = 1;
  title;
  description;
  onMain: any;
  currentSelectedTodo: Todo;
  todos: Todo[];
  currentDate = null;
  currentTodo: Todo;
  currentSelectedTime = 0;
  currentEnergy = 'None';
  filled = true;
  visible = false;
  drawerPlacement = 'left';

  energies: { title: string, value: string }[] = [
    {
      title: 'None',
      value: '0'
    },
    {
      title: 'Low',
      value: '1'
    },
    {
      title: 'Middle',
      value: '2'
    },
    {
      title: 'High',
      value: '3'
    },
  ];
  times: { title: string, value: string }[] = [
    {
      title: '5 minutes',
      value: '5'
    },
    {
      title: '10 minutes',
      value: '10'
    },
    {
      title: '15 minutes',
      value: '15'
    },
    {
      title: '25 minutes',
      value: '25'
    },
    {
      title: '30 minutes',
      value: '30'
    },
    {
      title: '45 minutes',
      value: '45'
    },
    {
      title: '1 hour',
      value: '60'
    },
    {
      title: '2 hour',
      value: '120'
    },
    {
      title: '3 hour',
      value: '180'
    },
    {
      title: '4 hour',
      value: '240'
    },
    {
      title: '6 hour',
      value: '360'
    },
    {
      title: '8 hour',
      value: '480'
    },
    {
      title: '12 hour',
      value: '720'
    },
    {
      title: 'None',
      value: '0'
    },
  ];
  currentTodoId;
  private currentIsFavorite: boolean;
  private currentCompleted: boolean;


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
        if (item === 0) {
          this.todoService.getAllTodos().subscribe(todos => {
            this.todos = todos;
            console.log(todos);
          });
        } else if (item === -1) {
          this.todoService.getFavoriteTodos().subscribe(todos => {
            this.todos = todos;
            console.log(todos);
          });
        } else {
          this.todoService.gettTodoByActionId(item).subscribe(todos => {
            this.todos = todos;
            console.log(todos);
          });
        }
        return this.onMain = item;
      });
  }

  updateAllFields(id, title, description, time, energy, dueDate, completed, favorite) {
    console.log(title);
    console.log(description);
    console.log(time);
    console.log(energy);
    console.log(dueDate);
    console.log(this.currentActionId);

    this.todoService.updateTodoForAllFields(id, title, description, time, energy, dueDate, this.currentActionId,
      this.currentCompleted, this.currentIsFavorite).subscribe(item => {
      console.log(item);
    });
  }


  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    console.log(event.container);
  }

  provinceChange(value: string): void {
    this.currentSelectedTime = Number(value);
    console.log(this.currentSelectedTime);
  }

  EnergyChange(value: string): void {
    this.currentEnergy = value;
    console.log(this.currentEnergy);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  change(value: boolean): void {
    console.log(value);
  }

  onChangeDate(result: Date): void {
    this.currentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en_US');
  }


  open(todo: Todo): void {
    this.title = todo.title;
    this.description = todo.description;
    this.currentSelectedTime = todo.time;
    this.currentDate = todo.dueDate;
    this.currentEnergy = todo.energy;
    this.currentTodoId = todo.id;
    this.currentIsFavorite = todo.favorite;
    this.currentCompleted = todo.completed;
    this.currentTodoId = todo.id;
    this.currentSelectedTodo = todo;

    console.log(this.currentSelectedTime);

    this.visible = true;
  }

  save(name, description) {
    console.log(name + ' ' + description);
    this.todoService.updateTodo(name, description, this.currentSelectedTodo.id).subscribe(item => {
      this.todoService.getAllTodos().subscribe(todos => {
        this.todos = todos;
        console.log(todos);
      });
    });
    this.visible = false;
  }

  toggleSaveTodo(name, description, id, isCompleted: boolean, isFavorite: boolean) {
    console.log(id);
    this.todoService.updateTodoToggle(name, description, id, !isCompleted, isFavorite).subscribe(item => {
    });
  }

  favoriteSaveTodo(name, description, id, isFavorite: boolean, isCompleted: boolean) {
    console.log(isCompleted);
    this.todoService.favoriteTodoUpdate(name, description, id, !isFavorite, isCompleted).subscribe(item => {
      console.log(item);
      this.todoService.gettTodoByActionId(this.currentActionId).subscribe(todos => {
        this.todos = todos;
      });
    });
  }


  close(): void {
    this.visible = false;
  }


}
