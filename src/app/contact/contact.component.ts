import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //contactForm= new FormGroup({});
  contactForm!: FormGroup;
  isSubmitted=false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //define the structure
    this.contactForm=this.formBuilder.group(
      {
      
        //controls
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        email: ['',[Validators.required]],
        gender: [''],
        isMarried: [false],
        country:[''],
        address: new FormGroup({
          city: new FormControl('', [Validators.required,Validators.minLength(10)]),
          street: new FormControl(),
          pincode:new FormControl()
        })
     
        /*
          firstname: new FormControl(),
          lastname: new FormControl(),
          email: new FormControl(),
          gender: new FormControl(),
          isMarried: new FormControl(),
          country: new FormControl(),
          address:new FormGroup({
            city: new FormControl(),
            street: new FormControl(),
            pincode:new FormControl()
          })
        */
      }
    );
  }

  //getting all the controls
  get formControls(){
    return this.contactForm.controls;
  }

  onSubmit(){
    this.isSubmitted=true;
    console.log(this.contactForm.value);
  }

  //couontry List
  countryList: Array<any> = [
    { id: 1, name: 'Germany' },
    { id: 2, name: 'Spain' },
    { id: 3, name: 'USA' },
    { id: 4, name: 'Mexico' },
    { id: 5, name: 'China'},
  ];
}
