import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import {
	Contact,
	ContactsService,
} from '../../services/contacts-service/contacts.service';

@Component({
	selector: 'app-add-contact-form',
	templateUrl: './add-contact-form.component.html',
	styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly contactsService: ContactsService
	) {
		this.form = this.formBuilder.group({
			name: [null, [Validators.required]],
			lastName: [null, [Validators.required]],
			imageUrl: [null, [Validators.required]],
		});
	}

	ngOnInit(): void {}

	public async addContact() {
		if (this.form.invalid) {
			return;
		}

		const newContact: Partial<Contact> = {
			name: this.form.get('name').value,
			lastName: this.form.get('lastName').value,
			imageUrl: this.form.get('imageUrl').value,
		};

		await this.contactsService.createContact(newContact);
	}
}
