import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'
import {Router} from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService:UserService,private route:Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
  
      res=>{ 
           this.userDetails=res['user']; 
      },
      err=>{ 
        console.log(err);
       }
    );

  }
 
  onLogout(){
    this.userService.deleteToken();
    this.route.navigate(['/login']);
  }

}
