import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../services/api';
import { Post } from '../models/Post';

@Component({
  templateUrl: '../templates/postDetail.html',
  styleUrls: ['../css/postDetail.css']
})

export class PostDetailComponent implements OnInit {
  post: Post;
  related: Post[] = [];

  constructor(private route: ActivatedRoute, private api: APIService) {

  }

  getPost(id: number) {
    this.api.request({
      url: `/api/posts/${id}/`,
      withCredentials: false
    }).subscribe(
      res => {
        this.post = res.object as Post;

        this.related = [];
        
        res.related.forEach((post: Post) => {
          this.related.push(post);
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => this.getPost(+params['id']));
  }
}
