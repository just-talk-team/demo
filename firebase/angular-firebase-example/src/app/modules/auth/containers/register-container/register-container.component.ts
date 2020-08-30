import {Component, OnInit} from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl,
} from '@angular/forms';

import {AuthService} from '../../../../core/services/auth-service/auth.service';
import {UsersService} from '../../../../core/services/users-service/users.service';

@Component({
	selector: 'app-register-container',
	templateUrl: './register-container.component.html',
	styleUrls: ['./register-container.component.scss'],
})
export class RegisterContainerComponent implements OnInit {
	public form: FormGroup;

	public constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: FormBuilder,
		private readonly usersService: UsersService,
	) {
		this.form = this.formBuilder.group({
			email: [null, [Validators.required]],
			password: [null, [Validators.required]],
			isAdmin: [true, [Validators.required]],
			isWriter: [true, [Validators.required]],
			isReader: [true, [Validators.required]],
		});
	}

	ngOnInit(): void {
	}

	public async register() {
		if (this.form.invalid) {
			return;
		}

		const response = await this.authService.registerWithEmailAndPassword(
			this.femail.value,
			this.fpassword.value
		);

		if (response) {
			console.log('Usuario creado');
			console.log('Creando usuario en firestore');

			// TODO: Esto debe realizarse con Firebase Functions
			const newUser = {
				roles: {
					admin: this.fisAdmin.value,
					writer: this.fisWriter.value,
					reader: this.fisReader.value,
				}
			};
			console.log(newUser);
			await this.usersService.createOne(newUser);
			console.log('Usuario creado en firestore');
		} else {
			console.log('Usuario no creado');
		}
	}

	public get femail(): AbstractControl {
		return this.form.get('email');
	}

	public get fpassword(): AbstractControl {
		return this.form.get('password');
	}

	public get fisAdmin(): AbstractControl {
		return this.form.get('isAdmin');
	}

	public get fisWriter(): AbstractControl {
		return this.form.get('isWriter');
	}

	public get fisReader(): AbstractControl {
		return this.form.get('isReader');
	}
}
