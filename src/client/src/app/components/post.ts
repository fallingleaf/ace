import { Component, Input } from '@angular/core';
import { Post } from '../models/Post';

@Component({
  selector: 'md-post',
  templateUrl: '../templates/post.html',
  styleUrls: ['../css/post.css'],
})

export class PostComponent {
  @Input()
  post: Post;
}
