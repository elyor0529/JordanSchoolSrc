import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,

  apiBaseUrl: 'http://localhost:15783/api/',
  urlPrefix: '',
  httpOptions: {
    headers: new HttpHeaders({
    })
  }

 /* firebase: {
    apiKey: "...",
    authDomain: "project.firebaseapp.com",
    databaseURL: "https://project.firebaseio.com",
    projectId: "project",
    storageBucket: "project.appspot.com",
    messagingSenderId: "..."
  }
  */
};
