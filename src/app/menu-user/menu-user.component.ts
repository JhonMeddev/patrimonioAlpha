import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    environment.token = '';
    this.router.navigate(['/inicio'])
  }
}
