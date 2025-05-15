import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  generatedCode: string = ''; // Store the randomly generated CAPTCHA code

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form and generate CAPTCHA code
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required], // User ID or Phone
      password: ['', Validators.required], // Password
      captcha: ['', Validators.required], // CAPTCHA input
    });

    this.generatedCode = this.generateRandomCode(); // Generate CAPTCHA on component init
  }

  // Generate Random 6-Character Alphanumeric Code
  generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  // Login Button Click Handler
  onLogin(): void {
    const { identifier, password, captcha } = this.loginForm.value;

    // Check if the form is valid
    if (this.loginForm.invalid) {
      alert('Please fill in all the required fields!');
      return;
    }

    // Validate CAPTCHA
    if (captcha !== this.generatedCode) {
      alert('Invalid CAPTCHA. Please try again.');
      return;
    }

    // Proceed with login if all validations pass
    this.http.post('http://localhost:3000/api/users/login', { identifier, password }).subscribe(
      (response: any) => {
        alert('Login successful!');
        // Save user ID and profile photo to localStorage
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('profilePhoto', response.profilePhoto);
        this.router.navigate(['/home']); // Navigate to the home page
      },
      (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'An error occurred during login.');
      }
    );
  }
}