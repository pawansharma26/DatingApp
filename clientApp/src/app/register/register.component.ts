import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
maxDate:Date;
constructor(private accountService:AccountsService,
  private toastr:ToastrService,
  private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  } 

initializeForm()
{
this.registerForm=this.fb.group(
  {
    gender:['male'],
    username:['',Validators.required],
    knownAs:['',Validators.required],
    dateOfBirth:['',Validators.required],
    city:['',Validators.required],
    country:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword:['', [Validators.required, this.matchValues('password')]]
  }
)

//if password field changes then update updateValueAndValidity of confirmPassword field
this.registerForm.controls.password.valueChanges.subscribe(()=>
{
  this.registerForm.controls.confirmPassword.updateValueAndValidity();
})

}

//if password matches it will return null otherwise an error isMtching 
matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control?.value === control?.parent?.controls[matchTo].value 
      ? null : {isMatching: true}
  }
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
