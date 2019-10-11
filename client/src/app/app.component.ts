import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './category/category';
import { HomeService } from './home.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  categories: Category[] = [];
  loginStatus = false;

  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('token')){
      this.authService.isLoggedIn.subscribe((status: any) => {
        if (status === true) {
          this.loginStatus = true;
        } else {
          this.loginStatus = false;
        }
      });
    }
    else {
      this.loginStatus = true;
    }
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
}
