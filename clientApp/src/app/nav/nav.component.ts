import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

model:any={};
loggedIn:boolean;
currentUser$:Observable<User>;
  constructor(private accountService:AccountsService) { }

  ngOnInit(): void {
    this.currentUser$=this.accountService.currentUser$;
  }

  login()
  {
    this.accountService.login(this.model).subscribe
    (response=>
      {
        console.log(response);
        this.loggedIn=true;
      },error=>
      {
        console.log(error);
      }
      )   
  }
  logout()
  {
    this.accountService.logout();
    this.loggedIn=false;
  }
}
