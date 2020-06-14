import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionService} from '../../_services/action.service';
import {Action} from '../../model/Action';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TodoService} from '../../_services/todo.service';
import {en_US, NzI18nService, zh_CN} from 'ng-zorro-antd';

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
  date = null;
  currentSelectedTime = 0;
  isEnglish = false;

  times: { title: string, value: number }[] = [
    {
      title: '5 minutes',
      value: 5
    },
    {
      title: '10 minutes',
      value: 10
    },
    {
      title: '15 minutes',
      value: 15
    },
    {
      title: '25 minutes',
      value: 25
    },
    {
      title: '30 minutes',
      value: 30
    },
    {
      title: '45 minutes',
      value: 45
    },
    {
      title: '1 hour',
      value: 60
    },
    {
      title: '2 hour',
      value: 120
    },
    {
      title: '3 hour',
      value: 180
    },
    {
      title: '4 hour',
      value: 240
    },
    {
      title: '6 hour',
      value: 360
    },
    {
      title: '8 hour',
      value: 480
    },
    {
      title: '12 hour',
      value: 720
    },
    {
      title: 'None',
      value: 0
    },
  ];

  constructor(private router: Router,
              private actionService: ActionService,
              private tokenStorageService: TokenStorageService,
              private todoService: TodoService,
              private i18n: NzI18nService
  ) {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  provinceChange(value: string): void {
    this.currentSelectedTime = Number(value);
    console.log(this.currentSelectedTime);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  change(value: boolean): void {
    console.log(value);
  }

  onChangeDate(result: Date): void {
    console.log('onChange: ', result);
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
    });
    this.visible = false;
  }

}
