import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../_services/accounts.service'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
model:any={};
@Output() cancelRegister=new EventEmitter();

constructor(private accountService:AccountsService,
  private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  } 

initializeForm()
{
this.registerForm=new FormGroup(
  {
    username:new FormControl(),
    password:new FormControl(),
    confirmPassword:new FormControl()
  }
)
}

  cancel()
  {
this.cancelRegister.emit(false);
  }

  register()
  {
   console.log(this.registerForm.value);
// this.accountService.register(this.model).subscribe(
//   response=>{
//     console.log(response);
//     this.cancel();
//   },
// error=>
// {
//   console.log(error);
//   this.toastr.error(error.error);
//  })
  }
}
