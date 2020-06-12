import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionService} from '../../_services/action.service';
import {Action} from '../../model/Action';
import {SharedService} from '../../_services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private actionService: ActionService, private sharedService: SharedService) {
    this.sharedService = sharedService;
    this.actionService.getAllActions().subscribe(actions => {
      // console.log(actions);
      console.log('Init triggered');
      this.selectedIndex = 0;
      this.actions = actions;
    });
  }

  actions: Action[];
  selectedIndex = 0;
  isFavoriteSelected = false;
  panels = [
    {
      active: true,
      name: 'Actions',
      disabled: false,
      customStyle: {}
    }
  ];

  changeName(id) {
    this.sharedService.change(id);
  }

  setIndex(index: number, id: any) {
    this.isFavoriteSelected = false;
    this.selectedIndex = index;
    this.changeName(id);
  }

  isRouteAuth(): boolean {
    return !(this.router.url === '/login' || this.router.url === '/register');
  }


  ngOnInit(): void {
    this.actionService.getAllActions().subscribe(actions => {
      // console.log(actions);
      console.log('Init triggered');
      this.selectedIndex = 0;
      this.actions = actions;
      let obj: Action = {id: 0, name: 'All', slug: 'align-left', icon: 'menu'};
      this.actions.splice(0, 0, obj);
    });
  }

  getFavorites() {
    this.isFavoriteSelected = !this.isFavoriteSelected;
    this.changeName(-1);
  }
}
