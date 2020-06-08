import {EventEmitter, Injectable, Output} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('shared service started');
  }

  change(id) {
    console.log('change started');
    this.fire.emit(id);
  }

  getEmittedValue() {
    return this.fire;
  }

}
