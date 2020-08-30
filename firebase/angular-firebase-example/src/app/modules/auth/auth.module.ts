import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AuthRoutingModule} from './auth-routing.module';
import {RegisterContainerComponent} from './containers/register-container/register-container.component';
import {LoginContainerComponent} from './containers/login-container/login-container.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,

		// Firebase
		AngularFireAuthModule,

		// Ng-Module
		MatFormFieldModule,
		MatGridListModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatToolbarModule,
		MatRadioModule,
		MatSlideToggleModule
	],
	declarations: [RegisterContainerComponent, LoginContainerComponent],
})
export class AuthModule {
}
