import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Contact {
	id?: string;
	name?: string;
	lastName?: string;
	imageUrl?: string;
}

const CONTACTS_COLLECTION_NAME = 'contacts';

@Injectable({
	providedIn: 'root',
})
export class ContactsService {
	constructor(private readonly firestore: AngularFirestore) {}

	public getAll() {
		return this.firestore
			.collection<Contact>(CONTACTS_COLLECTION_NAME)
			.snapshotChanges();
	}

	public getOneById(id: string) {
		return this.firestore
			.collection<Contact>(CONTACTS_COLLECTION_NAME)
			.doc<Contact>(id)
			.snapshotChanges();
	}

	public createContact(data: Partial<Contact>) {
		return this.firestore
			.collection<Contact>(CONTACTS_COLLECTION_NAME)
			.add(data);
	}

	public updateContact(id: string, data: Partial<Contact>) {
		return this.firestore
			.collection<Contact>(CONTACTS_COLLECTION_NAME)
			.doc<Contact>(id)
			.set(data);
	}

	public deleteContact(id: string) {
		return this.firestore
			.collection<Contact>(CONTACTS_COLLECTION_NAME)
			.doc<Contact>(id)
			.delete();
	}
}
