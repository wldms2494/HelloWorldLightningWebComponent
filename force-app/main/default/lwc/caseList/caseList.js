import { LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/CaseController.getCases';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject'

const COLUMNS = [
   
    { label: 'Subject', fieldName: SUBJECT_FIELD.fieldApiName , type:'text'},


];

export default class CaseList extends LightningElement {

    columns = COLUMNS;
    @wire(getCases)
    cases;
}