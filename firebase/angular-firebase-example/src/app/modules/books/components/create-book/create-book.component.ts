import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from '../../../../core/models/book.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-create-book',
	templateUrl: './create-book.component.html',
	styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
	@Output() onCreate: EventEmitter<Partial<Book>> = new EventEmitter<Partial<Book>>();
	public form: FormGroup;

	public constructor(
		private readonly formBuilder: FormBuilder,
	) {
		this.form = this.formBuilder.group({
			title: [null, [Validators.required]],
			description: [null, [Validators.required]],
		});
	}

	public ngOnInit() {
	}

	addBook() {
		if (this.form.invalid) {
			return;
		}

		const newBook = {
			title: this.fTitle.value,
			description: this.fDescription.value
		};

		this.onCreate.emit(newBook);
	}

	public get fTitle(): AbstractControl {
		return this.form.get('title');
	}

	public get fDescription(): AbstractControl {
		return this.form.get('description');
	}
}
