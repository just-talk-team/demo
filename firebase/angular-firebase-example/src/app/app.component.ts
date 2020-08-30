import { Component } from '@angular/core';
import {
	ContactsService,
	Contact,
} from './services/contacts-service/contacts.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public currentContact: Contact = null;

	public constructor(private readonly contactsService: ContactsService) {}

	public onEdit(contact: Contact) {
		this.currentContact = contact;
	}

	public onDelete(contact: Contact) {
		this.contactsService.deleteContact(contact.id);
	}
}
