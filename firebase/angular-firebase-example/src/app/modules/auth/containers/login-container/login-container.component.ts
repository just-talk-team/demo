import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	Validators,
	AbstractControl,
	FormGroup,
} from '@angular/forms';

import { AuthService } from '../../../../core/services/auth-service/auth.service';

@Component({
	selector: 'app-login-container',
	templateUrl: './login-container.component.html',
	styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
	public form: FormGroup;

	public constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: FormBuilder
	) {
		// this.form = this.formBuilder.group({
		// 	email: [null, [Validators.required]],
		// 	password: [null, [Validators.required]],
		// });

		this.form = this.formBuilder.group({
			email: ['usuario1@email.com', [Validators.required]],
			password: ['usuario1', [Validators.required]],
		});
	}

	ngOnInit(): void {}

	public async login() {
		if (this.form.invalid) {
			return;
		}

		const response = await this.authService.loginWithEmailAndPassword(
			this.femail.value,
			this.fpassword.value
		);

		if (response) {
			// TODO:
			console.log("Logged in");
		} else {
			// TODO:
		}
	}

	public get femail(): AbstractControl {
		return this.form.get('email');
	}

	public get fpassword(): AbstractControl {
		return this.form.get('password');
	}
}
