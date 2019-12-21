import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateVacancyService } from '../create-vacancy.service';

@Component({
  selector: 'tm-manage-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss'],
})
export class VacancyFormComponent implements OnInit {
  vacancy: FormGroup;
  checked: boolean;
  types: string[];

  constructor(private createVacancyService: CreateVacancyService) {}

  ngOnInit() {
    this.vacancy = this.createVacancyService.vacancy;
    this.createVacancyService.fetchTypes().subscribe((res) => {
      this.types = res.vacancyTypes;
    });
  }
}
