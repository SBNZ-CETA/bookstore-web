import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public token: string | null='';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.token = localStorage.getItem('token');
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
