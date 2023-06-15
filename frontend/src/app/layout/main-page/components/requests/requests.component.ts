import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from 'src/app/services/catalog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  filter: string = '';
  requests: any[] = [];
  request_selected: any = {
    item_id: '',
    date: new Date(),
    user: '',
    approval_dev: '',
    approval_infra: '',
    approved_dev: 'no solicitado',
    approved_infra: 'no solicitado',
    files: [],
    description: '',
    cloud: '',
    resource_group: '',
    resource_name: '',
    resource_type: '',
    project: '',
    cost: 0,
    result_state: ''
  };

  user: string = '';
  resource_deployers: any[] = [];
  approvals_dev: any[] = [];
  approvals_infra: any[] = [];
  is_resource_deployer: boolean = false;
  is_dev_approval: boolean = false;
  is_infra_approval: boolean = false;
  requests_shown: any[] = [];
  datos_slice: any[] = [];

  collectionSize: number = 0;
  page: number = 1;
  pageSize: any = 20;

  constructor (
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.reload_requests();
    this.get_params();
    this.get_user();
    this.get_approvals_dev();
    this.get_approvals_infra();
    this.get_resource_deployers();
  }

  get_params() {
    let params: any = JSON.parse(sessionStorage.getItem('params') as string);
    if (typeof params.id != 'undefined') {
      this.filter = params.id;
    }
  }

  get_user() {
    this.user = sessionStorage.getItem('user') as string;
  }

  get_approvals_dev() {
    this.spinner.show();
    const output_model: any = { 'name': 1, 'email': 1};
    this.catalogService.get_items('approvals_dev', output_model).then( (r: any) => {
      this.spinner.hide();
      this.approvals_dev = r.response;
      this.approvals_dev.forEach((element: any) => {
        if (element.email == this.user) {
          this.is_dev_approval = true;
        }
      });
    }).catch( e => console.log(e) );
  }

  get_approvals_infra() {
    this.spinner.show();
    const output_model: any = { 'name': 1, 'email': 1};
    this.catalogService.get_items('approvals_infra', output_model).then( (r: any) => {
      this.spinner.hide();
      this.approvals_infra = r.response;
      this.approvals_infra.forEach((element: any) => {
        if (element.email == this.user) {
          this.is_infra_approval = true;
        }
      });
    }).catch( e => console.log(e) );
  }

  get_resource_deployers() {
    const output_model: any = { 'name': 1, 'email': 1};
    this.resource_deployers = [];
    this.catalogService.get_items('resource_deployers', output_model).then( (r: any) => {
      this.spinner.hide();
      this.resource_deployers = r.response;
      this.resource_deployers.forEach((element: any) => {
        if (element.email == this.user) {
          this.is_resource_deployer = true;
        }
      });
    }).catch( e => console.log(e) );
  }

  new_request() {
    this.request_selected = {
      item_id: '',
      date: new Date(),
      user: sessionStorage.getItem('user') as string,
      approval_dev: '',
      approval_infra: '',
      approved_dev: 'no solicitado',
      approved_infra: 'no solicitado',
      files: [],
      description: '',
      cloud: '',
      resource_group: '',
      resource_name: '',
      resource_type: '',
      project: '',
      cost: 0,
      result_state: ''
    };
  }

  reload_requests() {
    this.requests = [];
    const output_model = {
      item_id: 1,
      date: 1,
      user: 1,
      approval_dev: 1,
      approval_infra: 1,
      approved_dev: 1,
      approved_infra: 1,
      files: 1,
      description: 1,
      cloud: 1,
      resource_group: 1,
      resource_name: 1,
      resource_type: 1,
      project: 1,
      cost: 1,
      result_state: 1
    };
    this.spinner.show();
    this.catalogService.get_items('requests', output_model).then( (r: any) => {
      this.spinner.hide();
      this.requests = r.response;
      this.filter_change();
    }).catch( e => console.log(e) );
  }

  filter_change() {
    if (this.filter != '') {
      this.requests_shown = this.search();
    } else {
      this.requests_shown = this.requests;
    }
    this.collectionSize = this.requests_shown.length;
    this.refreshTable();
  }

  search(): any[] {
    return this.requests.filter((request:any) => {
      const term: string = this.filter.toLowerCase();
      return request.item_id.toString().toLowerCase().includes(term) ||
        request.date.toString().toLowerCase().includes(term) ||
        request.user.toString().toLowerCase().includes(term) ||
        request.approval_dev.toString().toLowerCase().includes(term) ||
        request.approval_infra.toString().toLowerCase().includes(term) ||
        request.approved_dev.toString().toLowerCase().includes(term) ||
        request.approved_infra.toString().toLowerCase().includes(term) ||
        request.files.toString().toLowerCase().includes(term) ||
        request.description.toString().toLowerCase().includes(term) ||
        request.cloud.toString().toLowerCase().includes(term) ||
        request.resource_group.toString().toLowerCase().includes(term) ||
        request.resource_name.toString().toLowerCase().includes(term) ||
        request.resource_type.toString().toLowerCase().includes(term) ||
        request.project.toString().toLowerCase().includes(term) ||
        request.cost.toString().toLowerCase().includes(term) ||
        request.result_state.toString().toLowerCase().includes(term);
    });
  }

  refreshTable() {
    let initial_slice: number = (this.page - 1) * Number.parseInt(this.pageSize);
    let end_slice: number = initial_slice + Number.parseInt(this.pageSize);
    this.datos_slice = this.requests_shown.slice(initial_slice, end_slice);
  }

  selectPage(page: string) {
    this.page = parseInt(page)
  }

  openDialog(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg', backdrop: 'static', keyboard: false }).result.then(( (response: any) => {

    }), ( (r: any) => {}));
  }
}
