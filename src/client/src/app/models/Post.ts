export class Post {
  id: number;
  title: string;
  // user #{ link: http://, avatar: http:// }
  user: any;
  img_url: string;
  views: number;
  comments: number;
  created_on?: string;
  updated_on?: string;
}
