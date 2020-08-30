import {
	Component,
	OnInit,
	OnDestroy,
	Output,
	EventEmitter,
} from '@angular/core';
import {Subscription} from 'rxjs';

import {
	ContactsService,
	Contact,
} from '../../services/contacts-service/contacts.service';

@Component({
	selector: 'app-contacts-list',
	templateUrl: './contacts-list.component.html',
	styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
	@Output() onEdit: EventEmitter<Contact> = new EventEmitter();
	@Output() onDelete: EventEmitter<Contact> = new EventEmitter();

	public contacts: Contact[] = [];
	public subscriptions: Subscription[] = [];

	constructor(private readonly contactsService: ContactsService) {
	}

	public ngOnInit() {
		this.subscriptions.push(
			this.contactsService.getAll().subscribe((contacts) => {
				this.contacts = contacts.map((x) => ({
					id: x.payload.doc.id,
					...x.payload.doc.data(),
				}));
			})
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((x) => x.unsubscribe());
	}

	public editContact(contact: Contact) {
		this.onEdit.emit(contact);
	}

	public deleteContact(contact: Contact) {
		this.onDelete.emit(contact);
	}
}
