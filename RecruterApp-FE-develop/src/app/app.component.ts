import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerIcon('baseline-arrow_forward', './assets/baseline-arrow_forward.svg');
    this.registerIcon('baseline-close', './assets/baseline-close.svg');
    this.registerIcon('baseline-cancel', './assets/baseline-cancel.svg');
    this.registerIcon('baseline-arrow_downward', './assets/baseline-arrow_downward.svg');
    this.registerIcon('baseline-code', './assets/baseline-code.svg');
    this.registerIcon('baseline-short_text', './assets/baseline-short_text.svg');
    this.registerIcon('baseline-play', './assets/baseline-play.svg');
    this.registerIcon('baseline-add', './assets/baseline-add.svg');
    this.registerIcon('baseline-arrow_upward', './assets/baseline-arrow_upward.svg');
    this.registerIcon('baseline-edit', './assets/baseline-edit.svg');
    this.registerIcon('baseline-search', './assets/baseline-search.svg');
    this.registerIcon('baseline-done', './assets/baseline-done.svg');
    this.registerIcon('baseline-lock', './assets/baseline-lock.svg');
    this.registerIcon('baseline-drag_handle', './assets/baseline-drag_handle.svg');
    this.registerIcon('baseline-delete', './assets/baseline-delete.svg');
    this.registerIcon('baseline-person_add', './assets/baseline-person_add.svg');
    this.registerIcon('baseline-logo', './assets/logo.svg');
    this.registerIcon('baseline-logo-name', './assets/logo-name.svg');
  }

  registerIcon(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
