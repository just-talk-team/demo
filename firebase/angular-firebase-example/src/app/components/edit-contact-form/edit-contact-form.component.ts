import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import {
	ContactsService,
	Contact,
} from '../../services/contacts-service/contacts.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-edit-contact-form',
	templateUrl: './edit-contact-form.component.html',
	styleUrls: ['./edit-contact-form.component.scss'],
})
export class EditContactFormComponent implements OnInit, OnChanges {
	@Input() contact: Contact;
	public form: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly contactsService: ContactsService
	) {
		this.contact = {};

		this.form = this.formBuilder.group({
			name: [null, [Validators.required]],
			lastName: [null, [Validators.required]],
			imageUrl: [null, [Validators.required]],
		});
	}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.contact.currentValue != null)
			this.fillFormValues(changes.contact.currentValue);
	}

	public fillFormValues(contact: Contact) {
		this.form = this.formBuilder.group({
			name: [contact.name, [Validators.required]],
			lastName: [contact.lastName, [Validators.required]],
			imageUrl: [contact.imageUrl, [Validators.required]],
		});
	}

	public editContact() {
		const updatedContact: Partial<Contact> = {
			name: this.form.get('name').value,
			lastName: this.form.get('lastName').value,
			imageUrl: this.form.get('imageUrl').value,
		};

		this.contactsService.updateContact(this.contact.id, updatedContact);
	}
}
