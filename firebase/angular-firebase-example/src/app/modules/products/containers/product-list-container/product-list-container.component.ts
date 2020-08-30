import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ProductsService} from '../../../../core/services/products-service/products.service';
import {Product} from '../../../../core/models/product.model';
import {map, tap} from 'rxjs/operators';

@Component({
	selector: 'app-product-list-container',
	templateUrl: './product-list-container.component.html',
	styleUrls: ['./product-list-container.component.scss'],
})
export class ProductListContainerComponent implements OnInit, OnDestroy {
	public subscriptions: Subscription[] = [];
	public products: Product[] = [];

	public constructor(private readonly productsService: ProductsService) {
	}

	ngOnInit() {
		this.subscriptions.push(
			this.productsService.getAll()
				.subscribe(x => this.products = x)
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(x => x.unsubscribe());
	}

	public async createProduct(product: Partial<Product>) {
		await this.productsService.createProduct(product);
	}

	public async deleteProductById(id: string) {
		await this.productsService.deleteProduct(id);
	}

	public trackByFn(index: number, item: Partial<Product>) {
		return item.id;
	}
}
