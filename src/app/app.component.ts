import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TestAngularFrontend';
  home: string;
  
  ngOnInit() {
    sessionStorage.setItem('HOME', 'true');
    this.home = sessionStorage.getItem('HOME');
  }
}
