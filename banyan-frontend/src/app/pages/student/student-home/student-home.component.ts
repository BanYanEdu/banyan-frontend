import { Component, OnInit } from '@angular/core';
// import { HomeService } from '../home.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html'
})
export class StudentHomeComponent implements OnInit {
  
  constructor(
    // private service: HomeService,
  ) { }

  ngOnInit() {

    // this.service.getItem().subscribe(
    //   data => {
    //     this.version = data.version;
    //     this.releaseDate = data.releaseDate;
    //   },
    //   error => {
    //     console.log(error);
    //     // this.errors = error
    //   }
    // );

  }
}