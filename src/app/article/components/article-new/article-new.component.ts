import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';

@Component({
  selector: 'mc-article-new',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, BannerComponent],
  templateUrl: './article-new.component.html',
  styleUrl: './article-new.component.scss',
})
export class ArticleNewComponent {

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    console.log(articleFormValues);
  }
}
