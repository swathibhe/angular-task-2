import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { URL_KEYS, RequestUrl } from './request-url.service';

import { ToastService } from './toast.service';

@Injectable()
export class ApiRequestService {

    constructor(private httpClient: HttpClient, private toasterService: ToastService) { }


    get(url: URL_KEYS, query = '', headers?, passRespType = false) {
        return new Promise((resolve, reject) => {
            const reqUrlOptions = RequestUrl.get(url);
            const options: {
                headers?: HttpHeaders,
                params?: HttpParams,
                reportProgress?: boolean,
                responseType: any,
                withCredentials?: boolean
            } = {
                headers,
                responseType: passRespType ? 'blob' : 'json',
            };
            options['observe'] = 'response';
            this.httpClient.get(reqUrlOptions.url + `${query}`, options).subscribe((response) => {
                resolve(this.handleResponse(response, reqUrlOptions));
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    delete(url: URL_KEYS, query = '', headers?) {
        return new Promise((resolve, reject) => {
            const reqUrlOptions = RequestUrl.get(url);
            this.httpClient.delete(reqUrlOptions.url + `${query}`, { observe: 'response', headers }).subscribe((response) => {
                resolve(this.handleResponse(response, reqUrlOptions));
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    post(url: URL_KEYS, body, headers?, passRespType = false) {
        return new Promise((resolve, reject) => {
            const reqUrlOptions = RequestUrl.get(url);
            const options: {
                headers?: HttpHeaders,
                params?: HttpParams,
                reportProgress?: boolean,
                responseType: any,
                withCredentials?: boolean
            } = {
                headers,
                responseType: passRespType ? 'blob' : 'json',
            };
            options['observe'] = 'response';
            // { observe: 'response', headers }
            this.httpClient.post(reqUrlOptions.url, body, options).subscribe((response) => {
                resolve(this.handleResponse(response, reqUrlOptions));
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    put(url: URL_KEYS, body, headers?) {
        return new Promise((resolve, reject) => {
            const reqUrlOptions = RequestUrl.get(url);
            return this.httpClient.put(reqUrlOptions.url, body, { observe: 'response', headers }).subscribe((response) => {
                resolve(this.handleResponse(response, reqUrlOptions));
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    async handleResponse(response, reqUrlOptions) {
        if (Math.floor(response['status'] / 100) === 2 && reqUrlOptions.showMsg) {
            await this.toasterService.presentToast(response['body']['message'], 'Success', 'success');
        }
        return response;
    }
}
