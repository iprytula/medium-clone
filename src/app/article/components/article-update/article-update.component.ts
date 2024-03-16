import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';

@Component({
  selector: 'mc-article-update',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, BannerComponent],
  templateUrl: './article-update.component.html',
  styleUrl: './article-update.component.scss',
})
export class ArticleUpdateComponent {}
