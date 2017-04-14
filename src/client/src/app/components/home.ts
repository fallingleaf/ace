import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post';
import { APIService } from '../services/api';


@Component({
  selector: 'home',
  templateUrl: '../templates/home.html',
  styleUrls: ['../css/home.css']
})

export class HomeComponent implements OnInit{
  posts: Post[] = [];
  next_url: String = null;
  category: String = null;

  constructor(private api: APIService, private route: ActivatedRoute) {
  }

  reset() {
    this.posts = [];
    this.next_url = null;
    this.getPosts();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let cat = params['category'];
      this.category = cat;
      this.reset();
    });
  }

  getPosts() {
    let url = this.next_url
    if(url == null) {
      if(this.category!=null) {
        url = `/api/posts/?category=${this.category}`;
      } else {
        url = '/api/posts/';
      }
    }
    this.api.request({url: url, withCredentials: false})
    .subscribe(
      res => {
        if(res.next != null) {
          this.next_url = res.next;
        }
        else {
          this.next_url = null;
        }

        res.results.forEach((post: Post) => {
          // let post = new Post(p);
          this.posts.push(post);
        });

        // console.log(this.posts);
      },
      err => {
        // display error instead
        console.log(err);
      }
    )
  }

  onClickMore() {
    if(this.next_url != null) {
      this.getPosts();
    }
  }
}
