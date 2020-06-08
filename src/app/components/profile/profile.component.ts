import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  content = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('http://localhost:9191/todos').subscribe((data: any[]) => {
      console.log(data);
    });
  }

}
