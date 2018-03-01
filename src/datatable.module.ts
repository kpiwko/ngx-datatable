import { NgDragDropModule } from 'ng-drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DatatableComponent,
  DataTableColumnDirective,
  DataTableHeaderComponent,
  DataTableBodyComponent,
  DataTableFooterComponent,
  DataTableHeaderCellComponent,
  DataTablePagerComponent,
  DataTableBodyRowComponent,
  DataTableRowWrapperComponent,
  ProgressBarComponent,
  DataTableBodyCellComponent,
  DatatableRowDetailDirective,
  DatatableGroupHeaderDirective,
  ScrollerComponent,
  DataTableSelectionComponent,
  DataTableColumnHeaderDirective,
  DataTableColumnCellDirective,
  DataTableColumnCellTreeExpander,
  DataTableColumnCellTreeCollapser,
  DataTableColumnCellTreeLoader,
  DataTableColumnCellTreeDisable,
  DatatableRowDetailTemplateDirective,
  DataTableFooterTemplateDirective,
  DatatableFooterDirective,
  DatatableGroupHeaderTemplateDirective
} from './components';

import {
  VisibilityDirective,
  LongPressDirective,
  ResizeableDirective,
  OrderableDirective,
  DraggableDirective
} from './directives';

import { 
  ScrollbarHelper,
  DimensionsHelper 
} from './services';

@NgModule({
  imports: [
    CommonModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    ScrollbarHelper,
    DimensionsHelper
  ],
  declarations: [
    DataTableFooterTemplateDirective,
    VisibilityDirective,
    DraggableDirective,
    ResizeableDirective,
    OrderableDirective,
    LongPressDirective,
    ScrollerComponent,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableHeaderComponent,
    DataTableHeaderCellComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    DataTablePagerComponent,
    ProgressBarComponent,
    DataTableBodyRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeExpander,
    DataTableColumnCellTreeCollapser,
    DataTableColumnCellTreeLoader,
    DataTableColumnCellTreeDisable,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeExpander,
    DataTableColumnCellTreeCollapser,
    DataTableColumnCellTreeLoader,
    DataTableColumnCellTreeDisable,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent,
    DatatableGroupHeaderTemplateDirective
  ]
})
export class NgxDatatableModule { }
