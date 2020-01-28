import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  email: string;
  name: string;
  message: string;
  endpoint: string;
  mobile: string;
  subject: string;
  title = 'Simple Example Contact-us page using Angular 4';
  public data: any = []
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  save(name, email, mobile, subject, message): void {
    this.data['name'] = name;
    this.data['email'] = email;
    this.data['mobile'] = mobile;
    this.data['subject'] = subject;
    this.data['message'] = message;
    console.log(this.data);
    //add request to send email or into mysql
    this.http.put<any>('https://pub-et-moi.com/contact.php', this.data).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occurred.");
        }
      });
  }

}
