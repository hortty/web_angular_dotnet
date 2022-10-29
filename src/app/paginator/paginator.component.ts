import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() length: number = 0;
  @Input() pageSize: number = 1;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  pages: PageEvent['pageIndex'][] = [0,1,2,3,4];
  pageIndex: number = this.pages[0];
  loading: boolean = false;
  constructor() { }

  ngAfterViewInit() {
    this.loading = true;
  }

  mudarPagina(j: PageEvent['pageIndex']) {
    this.pageIndex = j;
    if(this.pageIndex>3) {
      if(this.pageIndex+2<this.paginator.getNumberOfPages()) {
        this.pages = [
          this.pageIndex-2,
          this.pageIndex-1,
          this.pageIndex,
          this.pageIndex+1,
          this.pageIndex+2
        ]
      }
      else if(this.pageIndex+1 == this.paginator.getNumberOfPages()) {
        this.pages = [
          this.pageIndex-4,
          this.pageIndex-3,
          this.pageIndex-2,
          this.pageIndex-1,
          this.pageIndex
        ]
      }
    }
    else {
      this.pages = [0,1,2,3,4];
    }
  }

  pageEvent(event: PageEvent) {
    this.mudarPagina(event.pageIndex);
  }

  validar2Paginas(): boolean {
    if(this.loading) {
    if(this.paginator.getNumberOfPages() < 2) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
  }

  validar5Paginas(): boolean {
    if(this.loading) {
      if(this.paginator.getNumberOfPages() < 5) {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
}
}
