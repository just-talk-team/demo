import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/user.model';

const USERS_COLLECTION_NAME = 'users';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	public constructor(
		private readonly authService: AngularFireAuth,
		private readonly firestore: AngularFirestore
	) {
	}

	public async createOne(data: Partial<User>) {
		const user = await this.authService.currentUser;
		await this.firestore
			.collection<User>(USERS_COLLECTION_NAME)
			.doc<User>(user.uid)
			.set(data);
	}
}
