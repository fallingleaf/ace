import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APIService } from '../services/api';


@Component({
  templateUrl: '../templates/newPost.html',
  styleUrls: ['../css/post.css']
})

export class NewPostComponent {
  errorMessage: String;
  postForm: FormGroup;
  file: File;

  constructor(private fb: FormBuilder, private api: APIService) {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      title: ''
    })
  }

  onChangeFile(event: any) {
    let files = event.target.files;
    if(files) {
      this.file = files[0];
      console.log(this.file);
    }
  }

  onSubmit() {

    // TODO: use form validators instead
    this.errorMessage = '';

    if(this.file) {
      let size = this.file.size/1000;

      if(this.file.type !== 'image/jpeg') {
        this.errorMessage = 'Invalid image, please select image file';
        return false;
      }

      if(size > 5000) {
        this.errorMessage = 'File is too large!';
        return false;
      }
    }

    let vals = this.postForm.value;
    let formData = new FormData();

    formData.append('title', vals['title']);
    formData.append('image', this.file);

    var options = {
      url: '/api/post'
    }

    this.api.uploadForm(formData, options).subscribe(
      result => { console.log(result) },
      err => {
        this.errorMessage = err;
        console.log(err);
      }
    )
  }

}
