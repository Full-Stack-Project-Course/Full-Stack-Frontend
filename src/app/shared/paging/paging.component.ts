import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent {
  @Input() totalCount?:number
  @Input() pageSize?:number
  @Output() PageChanged:EventEmitter<number> = new EventEmitter()

  onPageChanged(event:any){
    this.PageChanged.emit(event.page)
  }
}
