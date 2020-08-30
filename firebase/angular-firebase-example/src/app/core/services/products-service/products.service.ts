import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {
	AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {Product} from '../../models/product.model';
import {AuthService} from '../auth-service/auth.service';

const PRODUCTS_COLLECTION_NAME = 'products';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	public constructor(
		private readonly authService: AuthService,
		private readonly afAuth: AngularFireAuth,
		private readonly firestore: AngularFirestore
	) {
	}

	public getAll(): Observable<Product[]> {
		return this.afAuth
			.user
			.pipe(
				switchMap((user) => {
					if (!user) {
						return of([]);
					}
					return this.firestore
						.collection<Product>(PRODUCTS_COLLECTION_NAME, (x) =>
							x.where('userId', '==', user.uid))
						.snapshotChanges()
						.pipe(
							map(x => x.map(y => ({id: y.payload.doc.id, ...y.payload.doc.data()}))),
						);
				})
			);
	}

	public getOneById(id: string): AngularFirestoreDocument<Product> {
		return this.firestore
			.collection<Product>(PRODUCTS_COLLECTION_NAME)
			.doc<Product>(id);
	}

	public async createProduct(data: Partial<Product>) {
		const user = await this.afAuth.currentUser;
		data.userId = user.uid;
		await this.firestore.collection<Product>(PRODUCTS_COLLECTION_NAME).add(data);
	}

	public updateProduct(id: string, data: Partial<Product>) {
		return this.firestore
			.collection<Product>(PRODUCTS_COLLECTION_NAME)
			.doc<Product>(id)
			.set(data);
	}

	public deleteProduct(id: string) {
		return this.firestore
			.collection<Product>(PRODUCTS_COLLECTION_NAME)
			.doc<Product>(id)
			.delete();
	}
}
