import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

model:any={};
@Output() cancelRegister=new EventEmitter();

constructor(private accountService:AccountsService) { }

  ngOnInit(): void {
  } 

  cancel()
  {
this.cancelRegister.emit(false);
  }

  register()
  {
this.accountService.register(this.model).subscribe(
  response=>{
    console.log(response);
    this.cancel();
  },
error=>
{
  console.log(error);
})
  }
}
