import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../../../../core/models/product.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
	@Output() onCreate: EventEmitter<Partial<Product>> = new EventEmitter<Partial<Product>>();
	public form: FormGroup;


	public constructor(private readonly formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			name: [null, [Validators.required]],
			description: [null, [Validators.required]],
			stock: [null, [Validators.required]],
			price: [null, [Validators.required]],
		});
	}

	ngOnInit(): void {
	}

	public addProduct() {
		if (this.form.invalid) {
			console.log('FORMULARIO INVALIDO');
			return;
		}
		const newProduct = {
			name: this.form.get('name').value,
			description: this.form.get('description').value,
			stock: this.form.get('stock').value,
			price: this.form.get('price').value,
		};
		this.onCreate.emit(newProduct);
	}
}
