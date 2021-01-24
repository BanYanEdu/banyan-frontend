import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Comment } from 'app/model/common/Comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private url = {
        // Comment
        banyan_ems_comment_create: iNet.getPUrl('banyan/ems/comment/create'),
        banyan_ems_comment_update: iNet.getPUrl('banyan/ems/comment/update'),
        banyan_ems_comment_list: iNet.getPUrl('banyan/ems/comment/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Comment
    commentCreate(item: Comment): Observable<any> { return this.http.postJSON(this.url.banyan_ems_comment_create, item); }
    commentUpdate(item: Comment): Observable<any> { return this.http.postJSON(this.url.banyan_ems_comment_update, item); }
    commentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_comment_list, criteria); }
    
  }