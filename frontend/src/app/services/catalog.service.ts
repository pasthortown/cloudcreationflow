import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  upload_items(catalog: string, items: any[]): Promise<any> {
    const data = {items: items};
    return this.http.post(environment.api_catalog + catalog +'/upload_items', JSON.stringify(data)).toPromise();
  }

  get_item(catalog: string, item_id: string, output_model: any): Promise<any> {
    const data = {item_id: item_id, output_model: output_model};
    return this.http.post(environment.api_catalog + catalog +'/get_item', JSON.stringify(data)).toPromise();
  }

  get_items(catalog: string, output_model: any): Promise<any> {
    const data = {output_model: output_model};
    return this.http.post(environment.api_catalog + catalog +'/get_items', JSON.stringify(data)).toPromise();
  }

  update_item(catalog: string, item_id: string, item: any): Promise<any> {
    const data = {item_id: item_id, item:item};
    return this.http.post(environment.api_catalog + catalog +'/update_item', JSON.stringify(data)).toPromise();
  }

  search_items(catalog: string, attribute: string, value: any, output_model: any): Promise<any> {
    const data = {attribute: attribute, value: value, output_model:output_model};
    return this.http.post(environment.api_catalog + catalog +'/search_items', JSON.stringify(data)).toPromise();
  }

  delete_item(catalog: string, item_id: string): Promise<any> {
    const data = {item_id: item_id};
    return this.http.post(environment.api_catalog + catalog +'/delete_item', JSON.stringify(data)).toPromise();
  }
}
