import { LightningElement } from 'lwc';

const COLUMNS = [
    { label: 'Case Number'},
    { label: 'Account Name'}
];

export default class CaseList2 extends LightningElement {
   counter='hihi';
    colums =COLUMNS;
    newList=[];

    handleNewCases(event) {
       const factor = event.detail;
       this.counter = factor;
    }
}