import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {BooksRoutingModule} from './books-routing.module';
import {BookListContainerComponent} from './containers/book-list-container/book-list-container.component';
import { CreateBookComponent } from './components/create-book/create-book.component';


@NgModule({
	imports: [
		CommonModule,
		BooksRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [BookListContainerComponent, CreateBookComponent],
})
export class BooksModule {
}
