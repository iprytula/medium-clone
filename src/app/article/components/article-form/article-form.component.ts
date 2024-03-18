import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface | null;
  @Input() isSubmitting = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  constructor(private fb: FormBuilder) {}

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: ''
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    if (this.initialValues) {
      this.form.patchValue({
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(' ').trim()
      });
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' ')
    }
    this.articleSubmit.emit(articleFormValues);
  }
}
