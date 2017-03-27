import { Component } from '@angular/core';
import { Post } from '../models/Post';

const POSTS: Post[] = [
  {
    id: 1,
    title: 'my pets',
    user: {
      link: '#',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKeEVvbrzYLwuR7iHYXC9BtdedTt2DI2PYbLWwymHlZfIhHXuhTw'
    },
    img_url: 'http://www.zooborns.com/.a/6a010535647bf3970b0133f60f081e970b-pi',
    views: 2500,
    comments: 128
  },
  {
    id: 2,
    title: 'Otter can be cute?!',
    user: {
      link: '#',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKeEVvbrzYLwuR7iHYXC9BtdedTt2DI2PYbLWwymHlZfIhHXuhTw'
    },
    img_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Sea_otter_pair2.jpg',
    views: 1500,
    comments: 70
  },
  {
    id: 3,
    title: 'Penguin cubs',
    user: {
      link: '#',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKeEVvbrzYLwuR7iHYXC9BtdedTt2DI2PYbLWwymHlZfIhHXuhTw'
    },
    img_url: 'http://animal-dream.com/data_images/penguin/penguin8.jpg',
    views: 6900,
    comments: 270
  }
]

@Component({
  selector: 'home',
  templateUrl: '../templates/home.html',
  styleUrls: ['../css/home.css']
})

export class HomeComponent {
  posts = POSTS;
}
