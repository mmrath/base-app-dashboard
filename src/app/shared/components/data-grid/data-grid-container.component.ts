import {Component, OnInit, Input} from '@angular/core';
import {TableModelApi} from '../../api/core';
import {TableModel} from '../../models';
import {DataGridComponent} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'data-grid-container',
  templateUrl: 'data-grid-container.component.html',
  directives: [DataGridComponent],
  providers: [TableModelApi]
})
export class DataGridContainerComponent implements OnInit {
  @Input() tableCodeName: string;
  @Input() tableModel: TableModel;
  @Input() pageSizes: Array<number> = [10, 20, 50, 100, 200];
  @Input() listApi: string;
  @Input() newLink: string;
  @Input() editLink: string;  // This must take id as a parameter
  @Input() deleteApi: string;

  error: boolean = false;


  constructor(private tableModelService: TableModelApi) {}

  ngOnInit(): void {
    if (this.tableCodeName !== undefined && this.tableCodeName !== null) {
      this.tableModelService.findByCodeName({codeName: this.tableCodeName})
          .subscribe(
              response => {
                this.tableModel = response;
                this.error = false;
              },
              error => {
                this.error = true;
                console.log(error.text());
              });

      if (this.listApi === undefined || this.listApi === null) {
        this.listApi = '/api/data/' + this.tableCodeName;
      }
      if (this.deleteApi === undefined || this.deleteApi === null) {
        this.deleteApi = this.listApi;
      }
    }
  }
}
