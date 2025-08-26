import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
        console.log('Login Response:', res); // Debug response

        if (res.message) {
          alert(res.message);
        }

        // Assuming backend returns { role: 'admin' } or { role: 'customer' }
        if (res.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.role === 'customer') {
          this.router.navigate(['/customer/home']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid credentials');
      }
    });
  }
}
