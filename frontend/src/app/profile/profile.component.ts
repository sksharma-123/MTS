import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User = {
    accountNumber: '',
    bank: '',
    balance: 0,
  };
  submitted = false;
  accountNumberIsValidCheck = false;
  accountNumberIsValidText = '';
  balanceIsValidCheck = false;
  balanceIsValidText = '';
  firstName!: String;
  lastName!: String;

  balanceForm = new FormGroup({
    balance: new FormControl()
  });

  constructor(private service: UserService, private router: Router, private keycloakService: KeycloakService) { }

  async ngOnInit() {
    let userDetails = await this.keycloakService.loadUserProfile();
    this.firstName = userDetails.firstName!;
    this.lastName = userDetails.lastName!;
  }

  registerUserProfile(): void {
    if (this.user.accountNumber != '' && this.user.bank != '') {
      const data = {
        fname: this.firstName,
        lname: this.lastName,
        userId: this.keycloakService.getUsername(),
        accountNumber: this.user.accountNumber,
        bank: this.user.bank,
        balance: this.user.balance,
      };

      this.service.updateProfile(data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            alert("Data submitted successfully")
          },
          error: (e) => console.error(e)
        });
    }
    else {
      alert("Invalid or incomplete data")
    }
    this.router.navigateByUrl("/")
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      accountNumber: '',
      bank: '',
      balance: 0
    };
  }

  accountNumberValidation(event: any) {
    if (event != null) {
      var len = event.toString().length;
      if (len == 12) {
        this.accountNumberIsValidCheck = true;
      }
      else {
        this.accountNumberIsValidCheck = false;
        this.accountNumberIsValidText = "Account Number should contain 12 digits"
      }
    }
  }

  balanceValidation(event: any) {
    if (event != null) {
      if (event > 0) {
        this.balanceIsValidCheck = true;
      }
      else {
        this.balanceIsValidCheck = false;
        this.balanceIsValidText = 'Balance cannot be negative'
      }
    }
  }

  addBalance() {
    if (this.balanceForm.value.balance != 0) {
      const data = {
        userId: this.keycloakService.getUsername(),
        balance: this.balanceForm.value.balance,
      };
      this.service.addBalance(data).subscribe((res: any) => {});
      alert("Money added successfully")
    }
    else {
      alert("Invalid or incomplete data")
    }
    this.router.navigateByUrl('');
  }

}
