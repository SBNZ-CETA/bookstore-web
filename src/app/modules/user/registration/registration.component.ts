import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterUser } from '../model';
import { GenreDto } from '../../books/model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public registerDto = <RegisterUser>{};
  public show: boolean = false;
  public genres: GenreDto[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public nameControl = new FormControl<string>('', Validators.required);
  public surnameControl = new FormControl<string>('', Validators.required);
  public usernameControl = new FormControl<string>('', Validators.required);
  public passwordControl = new FormControl<string>('', Validators.required);
  public emailControl = new FormControl<string>('', [Validators.required,Validators.email]);

  public validateFields() {
    return this.nameControl.valid &&
      this.surnameControl.valid &&
      this.usernameControl.valid &&
      this.passwordControl.valid &&
      this.emailControl.valid;
  }

  password() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.userService.getGenres().subscribe(response => this.genres = response)
  }

  selectGenre(genre?: GenreDto) {
    if (!genre || !this.registerDto.genres) {
      this.registerDto.genres = [];
      return
    }

    if (!this.registerDto.genres.find(g => g === genre.id))
      this.registerDto.genres.push(genre.id);
  }

  registerUser(){
    this.userService.registerUser(this.registerDto).subscribe(() => {
      alert('Successfully Created');
      this.router.navigate(['/login']);
    });
  }

}
