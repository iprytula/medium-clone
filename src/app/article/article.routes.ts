import { Route } from "@angular/router";
import { ArticleNewComponent } from "./components/article-new/article-new.component";
import { ArticleUpdateComponent } from "./components/article-update/article-update.component";
import { ArticleComponent } from "./components/article/article.component";

export const articleRoutes: Route[] = [
  { path: 'new', component: ArticleNewComponent },
  { path: 'update/:slug', component: ArticleUpdateComponent },
  {
    path: ':slug', component: ArticleComponent
  },
];