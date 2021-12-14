import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-token',
  templateUrl: './edit-token.component.html',
  styleUrls: ['./edit-token.component.css', '../dashboard/dashboard.component.css']
})
export class EditTokenComponent implements OnInit {

  editTokenForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editTokenForm = this.formBuilder.group({
      email: '',
      mobile: '',
      name: '',
      dateOfBirth: '',
      image: '',
      gender: '',
      country: '',
      collegeInfo: '',
      ethereumAddress: '',
      degreeOfPlay: '',
      certificates: '',
      awardsAndAccolades: ''
    });

    this.editTokenForm.valueChanges.subscribe(console.log);
  }

}
