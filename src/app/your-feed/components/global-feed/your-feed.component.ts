import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'mc-your-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
