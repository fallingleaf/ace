import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { APIService } from '../services/api';
import { Post } from '../models/Post';

@Component({
  templateUrl: '../templates/postDetail.html',
  styleUrls: ['../css/postDetail.css']
})

export class PostDetailComponent implements OnInit {
  post: Post;
  related: Post[] = [];

  constructor(private route: ActivatedRoute, private api: APIService,
    private router: Router) {

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
          post.image_url = post.medium_url;
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

      this.router.events.subscribe((evt) => {
              if (!(evt instanceof NavigationEnd)) {
                  return;
              }
              window.scrollTo(0, 0)
          });
  }
}
