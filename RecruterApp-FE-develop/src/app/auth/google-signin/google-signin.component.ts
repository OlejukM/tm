import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'tm-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent implements AfterViewInit {
  @ViewChild('signIn') signIn: ElementRef;
  constructor(private googleSignIn: GoogleSigninService) {}

  ngAfterViewInit() {
    this.googleSignIn.googleInit(this.signIn.nativeElement);
  }
}
