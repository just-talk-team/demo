import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

import {AuthService} from '../auth-service/auth.service';
import {Book} from '../../models/book.model';

const BOOKS_COLLECTIONS_NAME = 'books';

@Injectable({
	providedIn: 'root'
})
export class BooksService {
	public userRoles: string[] = [];

	public constructor(
		private readonly authService: AuthService,
		private readonly afAuth: AngularFireAuth,
		private readonly firestore: AngularFirestore
	) {
		this.authService.user.pipe(
			map(user => {
				if (!user) {
					return [];
				}
				let roles = {
					...(user.roles.admin && {admin: true}),
					...(user.roles.writer && {writer: true}),
					...(user.roles.reader && {reader: true}),
				};
				return this.userRoles = _.keys(roles);
			})
		).subscribe();
	}

	public getAll(): Observable<Book[]> {
		return this.firestore
			.collection<Book>(BOOKS_COLLECTIONS_NAME)
			.snapshotChanges()
			.pipe(
				map(x => x.map(y => ({id: y.payload.doc.id, ...y.payload.doc.data()})))
			);
	}

	public getOneById(id: string) {
		return this.firestore
			.collection<Book>(BOOKS_COLLECTIONS_NAME)
			.doc<Book>(id);
	}

	public createOne(data: Partial<Book>) {
		if (this.canCreate) {
			return this.firestore
				.collection(BOOKS_COLLECTIONS_NAME)
				.add(data);
		} else {
			console.log('CANT CREATE DOCUMENT');
		}
	}

	public deleteOneById(id: string) {
		if (this.canDelete) {
			return this.firestore
				.collection(BOOKS_COLLECTIONS_NAME)
				.doc(id)
				.delete();
		} else {
			console.log('CANT DELETE DOCUMENT');
		}
	}

	private get canRead(): boolean {
		const allowed = ['admin', 'writer', 'reader'];
		return this.matchingRole(allowed);
	}

	private get canEdit(): boolean {
		const allowed = ['admin', 'writer'];
		return this.matchingRole(allowed);
	}

	private get canCreate(): boolean {
		const allowed = ['admin', 'writer'];
		return this.matchingRole(allowed);
	}

	private get canDelete(): boolean {
		const allowed = ['admin'];
		return this.matchingRole(allowed);
	}

	private matchingRole(allowedRoles: string[]): boolean {
		return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
	}
}
