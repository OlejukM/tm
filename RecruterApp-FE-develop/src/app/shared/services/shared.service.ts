import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpParamsInterface } from '../../questions/http-params-interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  generateParams(params: HttpParamsInterface): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }
}
