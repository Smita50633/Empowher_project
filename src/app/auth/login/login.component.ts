import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


   user = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.user).subscribe({
      next: (res) => {
        alert(res.message);
        if (res.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/customer-home']);
        }
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
  
}
