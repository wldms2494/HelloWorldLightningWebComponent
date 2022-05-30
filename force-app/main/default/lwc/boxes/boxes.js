import { LightningElement } from 'lwc';

export default class Boxes extends LightningElement {


    greeting = "hello";
    name = {first: "john", last:" Doe"};
    handleClick() {
        this.greeting = "goodbye";
        this.name.first="Ollie";
    }
}