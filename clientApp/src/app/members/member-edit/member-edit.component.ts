import { Component, OnInit, ViewChild,HostListener  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountsService } from 'src/app/_services/accounts.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
member:Member;
user:User;
@ViewChild('editForm') editForm:NgForm;
@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}
  constructor(private accountService:AccountsService,private memberService:MemberService,
    private toastr:ToastrService) {
accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    this.memberService.getMember(this.user.username).subscribe(member=>
{this.member=member;
}
    )
  }
  
updateMember()
{
  console.log(this.member);
  this.toastr.success("Profile updated successfully");
  this.editForm.reset(this.member);
}


}