import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductListContainerComponent} from './containers/product-list-container/product-list-container.component';
import {CreateProductContainerComponent} from './containers/create-product-container/create-product-container.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
	imports: [
		CommonModule,
		ProductsRoutingModule,
		ReactiveFormsModule
	],
	declarations: [ProductListContainerComponent, CreateProductContainerComponent, AddProductComponent],
})
export class ProductsModule {
}
