import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionService} from '../../_services/action.service';
import {Action} from '../../model/Action';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TodoService} from '../../_services/todo.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  actions: Action[];
  visible = false;
  drawerPlacement = 'left';
  currentActionId;


  change(value: boolean): void {
    console.log(value);
  }

  constructor(private router: Router,
              private actionService: ActionService,
              private tokenStorageService: TokenStorageService,
              private todoService: TodoService) {
  }

  open(actionId: number): void {
    console.log(actionId);
    this.currentActionId = actionId;
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  isRouteAuth(): boolean {
    return !(this.router.url === '/login' || this.router.url === '/register');
  }

  ngOnInit(): void {
    this.actionService.getAllActions().subscribe(actions => {
      this.actions = actions;
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  save(name, description) {
    this.todoService.saveTodo(name, description, this.currentActionId).subscribe(item => {
      console.log(item);
    });
    console.log(name + ' ' + description);
  }
}
