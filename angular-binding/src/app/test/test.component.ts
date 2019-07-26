import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
      // templateUrl: './test.component.html',
  // styleUrls: ['./test.component.css']
  template: `
    <h2>
        Welcome {{getName()}}
    </h2>
    <input [id]="myId" value="test" />
    <input [disabled]="disabled" id={{myId}} value="test" />

    <h2 class="text-success">phuchoa3t </h2>
    <h2 [class]="successClass">phuchoa3t </h2>
    <h2 class="text-special" [class]="successClass">phuchoa3t </h2>
    <h2 [class.text-danger]="hasError">phuchoa3t </h2>
    <h2 [ngClass]="messages">phuchoa3t </h2>
  `,
  styles:[`
      .text-success{
          color: green;
      }

      .text-danger{
          color: red;
      }

      .text-special {
          font-style: italic;
      }
  `]
})
export class TestComponent implements OnInit {
    public name = "test"
    public myId = "testId"
    public disabled = true
    public successClass = "text-success"
    public hasError = true
    public isSpeacial = true
    public messages = {
        "text-success": !this.hasError,
        "text-danger": this.hasError,
        "text-special": this.isSpeacial,
    }

  constructor() { }

  ngOnInit() {

  }

  getName() {
      return this.name
  }

}
