import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../models/user.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

	constructor(
		private readonly afAuth: AngularFireAuth,
		private readonly firestore: AngularFirestore,
		private readonly router: Router
	) {
		this.afAuth.authState
			.pipe(
				switchMap((auth, i) => {
					if (auth) {
						return this.firestore
							.collection<User>('users')
							.doc<User>(auth.uid)
							.snapshotChanges();
					} else {
						return of<Action<DocumentSnapshot<User>>>(null);
					}
				}),
				map(x => ({id: x.payload.id, ...x.payload.data()}))
			)
			.subscribe(user => this.user.next(user));
	}

	public async registerWithEmailAndPassword(email: string, password: string) {
		try {
			return this.afAuth.createUserWithEmailAndPassword(email, password);
		} catch (error) {
			return null;
		}
	}

	public async loginWithEmailAndPassword(email: string, password: string) {
		try {
			const user = await this.afAuth.signInWithEmailAndPassword(
				email,
				password
			);

			this.router.navigate(['/books']);

			return user;
		} catch (error) {
			return null;
		}
	}
}
