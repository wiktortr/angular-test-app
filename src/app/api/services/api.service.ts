/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation notesGet
   */
  static readonly NotesGetPath = '/notes';

  /**
   * Return list of notes
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  notesGet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Note>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.NotesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Note>>;
      })
    );
  }

  /**
   * Return list of notes
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `notesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notesGet(params?: {
  }): Observable<Array<Note>> {

    return this.notesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Note>>) => r.body as Array<Note>)
    );
  }

}
