import { Component, Input , OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers:[{
    provide:CdkStepper,
    useExisting:StepperComponent
  }]
})
export class StepperComponent extends CdkStepper implements OnInit {
  
  @Input() linearSelectMode:boolean = true
  
  onClick(index:number){
    this.selectedIndex = index
  }
  ngOnInit(): void {
    console.log(this.steps)
    this.linear = this.linearSelectMode;
  }

}
