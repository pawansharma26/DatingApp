import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdfvalidation',
  templateUrl: './tdfvalidation.component.html',
  styleUrls: ['./tdfvalidation.component.css']
})
export class TdfvalidationComponent implements OnInit {

  formData: any = {};
  constructor() {
  }

  ngOnInit(): void {
  }

  register(): void {
    console.log(this.formData);
  }

}
