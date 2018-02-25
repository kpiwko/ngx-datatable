import { Component } from '@angular/core';
import { setTimeout } from 'timers';

@Component({
  selector: 'full-screen-tree-demo',
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/tree/fullscreen.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        [rowDraggable]="true"
        (rowDrop)="onRowDrop($event)"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
        [treeFromRelation]="'parentId'"
        [treeToRelation]="'id'"
        (treeAction)="onTreeAction($event)">
        <ngx-datatable-column name="Id" [width]="80"></ngx-datatable-column>
        <ngx-datatable-column name="Name" [isTreeColumn]="true" [width]="300">
          <ng-template ngx-datatable-tree-icon let-tree="treeStatus">
            <i *ngIf="tree==='loading'"
              class="icon datatable-icon-collapse"></i>
            <i *ngIf="tree==='collapsed'"
              class="icon datatable-icon-up"></i>
            <i *ngIf="tree==='expanded'"
              class="icon datatable-icon-down"></i>
            <i *ngIf="tree==='disabled'"
              class="disabled icon datatable-icon-down"></i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column name="State" [width]="300" prop="address.state"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],
})
export class FullScreenTreeComponent {

  rows = [];
  lastIndex = 15;

  constructor() {
    this.fetch((data) => {
      data = data.slice(1, this.lastIndex);
      this.rows = data.map((d) => {
        d.treeStatus = 'collapsed';
        d.parentId = null;
        return d;
      });
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      setTimeout(() => {
        cb(JSON.parse(req.response));
      }, 500);
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (this.rows[index].treeStatus === 'collapsed') {
      this.rows[index].treeStatus = 'loading';
      this.fetch((data) => {
        data = data.slice(this.lastIndex, this.lastIndex + 3)
          .map((d) => {
            d.treeStatus = 'collapsed';
            d.parentId = row.id;
            return d;
          });
        this.lastIndex = this.lastIndex + 3;
        this.rows[index].treeStatus = 'expanded';
        this.rows = [...this.rows, ...data];
      });
    } else {
      this.rows[index].treeStatus = 'collapsed';
      this.rows = [...this.rows];
    }
  }
  onRowDrop(event) {
    console.log(event);
    let srcelement = this.rows.filter((item) => {
      return item.id === event.src.id;
    });
    this.rows = this.rows.filter((item) => {
      return item.id !== event.src.id;
    });
    let targetindex = this.rows.findIndex((item) => {
      return item.id === event.target.id;
    });
    console.log(srcelement);
    console.log(targetindex);
    console.log("### - a", this.rows);
    this.rows = [...this.rows.slice(0, targetindex+1), ...srcelement, ...this.rows.slice(targetindex+1)];
    console.log("### - c", this.rows);
  }

}
