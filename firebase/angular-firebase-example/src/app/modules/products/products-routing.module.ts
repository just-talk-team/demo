import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
	{
		path: 'list',
		component: ProductListContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule {}
