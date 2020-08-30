import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((x) => x.AuthModule),
	},
	{
		path: 'products',
		loadChildren: () =>
			import('./modules/products/products.module').then(
				(x) => x.ProductsModule
			),
	},
	{
		path: 'books',
		loadChildren: () =>
			import('./modules/books/books.module').then(
				(x) => x.BooksModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
