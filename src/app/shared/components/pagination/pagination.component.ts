import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() total = 0;
  @Input() limit = 20;
  @Input() currentPage = 1;
  @Input() url = '';

  pagesCount = 1;
  pages: number[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
