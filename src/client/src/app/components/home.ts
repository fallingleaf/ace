import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { APIService } from '../services/api';



@Component({
  selector: 'home',
  templateUrl: '../templates/home.html',
  styleUrls: ['../css/home.css']
})

export class HomeComponent {
  posts: Post[] = [];
  next_url: String = null;

  constructor(private api: APIService) {
    this.getPosts();
  }

  getPosts() {
    let url = this.next_url || '/api/posts/?page=1';
    this.api.request({url: url, withCredentials: false})
    .subscribe(
      res => {
        console.log(res);
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
