import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = new Array();
  todoInput = new FormControl('');
  changeInputTask = new FormControl('');

  editBtn(i: any, txt?: any) {
    let inpt = document.querySelector('.jaba') as HTMLInputElement;

    this.data[i].changed = !this.data[i].changed;
    if (!this.data[i].changed) {
      this.data[i].title = inpt.value;
      this.data[i].changed = false;
    }

  }

  constructor() {
    let localData = localStorage.getItem('data');
    if (localData == null) {
      localStorage.setItem('data', JSON.stringify(this.data));
    }
  }
  add(e: any): void {
    if (e != "") {
      this.data.push(
        {
          title: this.todoInput.value,
          isDone: false,
          changed: false
        }
      );

      let jaba = this.data;
      localStorage.setItem('data', JSON.stringify(jaba));
      this.todoInput.reset();
    }

  }
  del(i: any) {
    this.data.splice(i, 1);
    let jaba = this.data;
    localStorage.setItem('data', JSON.stringify(jaba));
  }
  done(i: any) {
    this.data[i].isDone = true;
    let jaba = this.data;
    localStorage.setItem('data', JSON.stringify(jaba));
  }

  changeTask(text: any, i: any) {
    if (text != "") {
      this.data[i].title = text;
      this.data[i].changed = false;
      let jaba = this.data;
      localStorage.setItem('data', JSON.stringify(jaba));
    }
  }
  ngOnInit(): void {
    let jaba: any = localStorage.getItem('data');
    let parseJaba: any = JSON.parse(jaba);
    this.data = parseJaba;
  }
}
