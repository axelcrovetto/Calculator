import { Component, Input } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  input : string ='';
  result : string = '';

  title = 'Calculator';

  pressNumber(num : string){
    // no more than one .
    if (num === "."){
      if (this.input !=""){
        const lastNum =this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >=0) return ;
      }
    }
    // no start with 0
    if(num === "0"){
      if(this.input =="") return;

    const prevKey = this.input[this.input.length - 1];
    if(prevKey === '/' || prevKey ==="+" || prevKey ==="-" || prevKey ==="*" || prevKey ==='√') return;

    }
    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last' + this.input.substr(pos +1))
    return this.input.substr(pos +1)
  }

  pressOperator(op : string){
    // max 1 operator per time
    const lastKey = this.input[this.input,length-1];
    if(lastKey === '/' || lastKey === '*' || lastKey === '+' || lastKey === '-' || lastKey === '√') return;
    this.input = this.input + op;
    this.calcAnswer();
  }

  empty() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  emptyAll(){
    this.result = '';
    this.input = '';
  }

  calcAnswer():string {
    let formula = this.input;

    if(formula.includes("√")){
      formula = formula.substr(1,formula.length-1)
      this.result = ''+Math.sqrt(+formula);
      return this.result;
    }
    let lastKey = formula[formula.length - 1];
    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
      console.log("Formula " + formula);
      return this.result;
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
      console.log("Formula " + formula);
    return this.result;
    }
    this.result = eval(formula)
      return  this.result;
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == null) {
      this.input = "";
      window.alert("Inserire un numero prima effettuare qualsiasi operazione!");
    }
  }
}
