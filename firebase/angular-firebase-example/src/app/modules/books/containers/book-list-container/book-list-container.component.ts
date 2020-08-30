import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../../../../core/services/books-service/books.service';
import {Subscription} from 'rxjs';
import {Book} from '../../../../core/models/book.model';
import {AuthService} from '../../../../core/services/auth-service/auth.service';
import {User} from '../../../../core/models/user.model';

@Component({
	selector: 'app-book-list-container',
	templateUrl: './book-list-container.component.html',
	styleUrls: ['./book-list-container.component.scss']
})
export class BookListContainerComponent implements OnInit, OnDestroy {
	public subscriptions: Subscription[] = [];
	public books: Book[] = [];
	public user: Partial<User> = {};

	public constructor(
		private readonly authService: AuthService,
		private readonly booksService: BooksService
	) {
		this.subscriptions.push(
			this.authService.user.subscribe(x => {
				if (x) {
					this.user = x;
				} else {
					this.user = {};
				}
			})
		);
	}

	public ngOnInit() {
		this.subscriptions.push(
			this.booksService.getAll().subscribe(x => this.books = x)
		);
	}

	public ngOnDestroy() {
		this.subscriptions.forEach(x => x.unsubscribe());
	}

	public createOne(book: Partial<Book>) {
		this.booksService.createOne(book);
	}

	public deleteOneById(id: string) {
		this.booksService.deleteOneById(id);
	}

	public trackByFn(index: number, book: Partial<Book>) {
		return book.id;
	}
}
