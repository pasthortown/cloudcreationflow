import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileSaverService } from 'ngx-filesaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Output('reload') reload: EventEmitter<boolean> = new EventEmitter();

  max_file_size: number = 10;
  max_file_count: number = 5;
  validate_file_size: boolean = false;

  @Input('request') request: any = {
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

  clouds: any[] = [];
  artifact_types: any[] = [];
  artifact_types_shown: any[] = [];

  @Input('resource_deployers') resource_deployers: any[] = [];
  @Input('approvals_dev') approvals_dev: any[] = [];
  @Input('approvals_infra') approvals_infra: any[] = [];
  @Input('is_resource_deployer') is_resource_deployer: boolean = false;
  @Input('is_dev_approval') is_dev_approval: boolean = false;
  @Input('is_infra_approval') is_infra_approval: boolean = false;
  @Input('user') user: string = '';

  constructor(
    private fileServerService: FileSaverService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private catalogService: CatalogService
    ) {}

  ngOnInit(): void {
    this.refresh();
    this.validate_files();
  }

  refresh() {
    this.get_clouds();
    this.get_artefact_types();
  }

  request_approval_dev() {
    this.request.result_state = 'Solicitado Aprobación Desarrollo';
    this.request.user = this.user;
    this.request.approved_dev = 'Pendiente';
    this.spinner.show();
    this.catalogService.upload_items('requests', [this.request]).then( (r: any) => {
      this.spinner.hide();
      this.toastr.success('Solicitud de Recursos Creada', 'Solicitud de Recursos');
      this.toastr.success('Solicitud de Aprobación de Desarrollo Emitida', 'Solicitud de Aprobación');
      // Emitir correo al aprobador de desarrollo
      this.reload.emit(true);
    }).catch( e => console.log(e) );
  }

  request_approval_infra() {
    this.request.result_state = 'Solicitado Aprobación Infraestructura';
    this.request.approved_infra = 'Pendiente';
    this.spinner.show();
    this.catalogService.update_item('requests', this.request.item_id, this.request).then( (r: any) => {
      this.spinner.hide();
      this.toastr.success('Solicitud de Aprobación de Infraestructura Emitida', 'Solicitud de Aprobación');
      // Emitir correo al aprobador de infraestructura
      this.reload.emit(true);
    }).catch( e => console.log(e) );
  }



  cloud_selected() {
    this.artifact_types_shown = this.artifact_types.filter(objeto => objeto.cloud === this.request.cloud);
  }

  get_clouds() {
    this.spinner.show();
    const output_model: any = { 'name': 1, 'fabricant': 1};
    this.catalogService.get_items('clouds', output_model).then( (r: any) => {
      this.spinner.hide();
      this.clouds = r.response;
    }).catch( e => console.log(e) );
  }

  get_artefact_types() {
    this.spinner.show();
    const output_model: any = { 'cloud': 1, 'type': 1};
    this.catalogService.get_items('artifact_types', output_model).then( (r: any) => {
      this.spinner.hide();
      this.artifact_types = r.response;
    }).catch( e => console.log(e) );
  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (reader.result != null) {
              let new_file = {
                name: file.name,
                type: file.type,
                size: file.size,
                file_base64: reader.result.toString().split(',')[1],
              };
              this.request.files.push(new_file);
              this.validate_files();
            }
          };
        });
      }
    }
  }

  validate_files() {
    this.validate_file_size = true;
    this.request.files.forEach((file: any) => {
      if (file.size > (this.max_file_size * 1024 * 1024)) {
        this.validate_file_size = false;
      }
    });
  }

  download_file(item: any) {
    this.download(item);
  }

  download(item: any) {
    const byteCharacters = atob(item.file_base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: item.type});
    this.fileServerService.save(blob, item.name);
  }

  delete_file(file: any) {
    let new_files: NgxFileDropEntry[] = [];
    this.request.files.forEach((element: any) => {
      if (element != file) {
        new_files.push(element);
      }
    });
    this.request.files = new_files;
    this.validate_files();
  }

  save_request_dev() {
    let mensaje: string = 'Solicitud de Recursos Aprobada';
    if (this.request.approved_dev == 'Rechazado') {
      this.request.result_state = 'Rechazado Desarrollo';
      mensaje = 'Solicitud de Recursos Rechazada';
    }
    if (this.request.approved_dev == 'Aprobado') {
      this.request.result_state = 'Aprobado Desarrollo';
    }
    this.spinner.show();
    this.catalogService.update_item('requests', this.request.item_id, this.request).then( (r: any) => {
      this.spinner.hide();
      this.toastr.success(mensaje, 'Solicitud de Recursos');
      this.reload.emit(true);
    }).catch( e => console.log(e) );
  }

  save_request_infra() {
    let mensaje: string = 'Solicitud de Recursos Aprobada';
    if (this.request.approved_infra == 'Rechazado') {
      this.request.result_state = 'Rechazado Infraestructura';
      mensaje = 'Solicitud de Recursos Rechazada';
    }
    if (this.request.approved_infra == 'Aprobado') {
      this.request.result_state = 'Aprobado Infraestructura';
    }
    this.spinner.show();
    this.catalogService.update_item('requests', this.request.item_id, this.request).then( (r: any) => {
      this.spinner.hide();
      this.toastr.success(mensaje, 'Solicitud de Recursos');
      this.reload.emit(true);
    }).catch( e => console.log(e) );
  }

  save_request_resource_deployer() {
    this.spinner.show();
    this.catalogService.update_item('requests', this.request.item_id, this.request).then( (r: any) => {
      this.spinner.hide();
      this.toastr.success('Solicitud Atendida, Recurso Creado', 'Solicitud de Recursos');
      this.reload.emit(true);
    }).catch( e => console.log(e) );
  }
}
