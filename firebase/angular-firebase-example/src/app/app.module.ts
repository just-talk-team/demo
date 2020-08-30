import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './components/edit-contact-form/edit-contact-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		BrowserAnimationsModule,
	],
	declarations: [AppComponent, ContactsListComponent, AddContactFormComponent, EditContactFormComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
