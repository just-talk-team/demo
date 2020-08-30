import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListContainerComponent} from './containers/book-list-container/book-list-container.component';

const routes: Routes = [{
	path: '',
	redirectTo: 'book-list',
	pathMatch: 'full'
}, {
	path: 'book-list',
	component: BookListContainerComponent
}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BooksRoutingModule {
}
