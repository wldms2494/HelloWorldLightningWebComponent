import { LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/CaseController.getCases';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import ACCOUNT_FIELD from '@salesforce/schema/Case.AccountId';
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import STATUS_FIELD from '@salesforce/schema/Case.Status';


const COLUMNS = [
    { label: 'Case Number', fieldName: NUMBER_FIELD.fieldApiName , type:'text'},
    { label: 'Account Name', fieldName: ACCOUNT_FIELD.fieldApiName , type:'text'},
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName , type:'text'},
    { label: 'Subject', fieldName: SUBJECT_FIELD.fieldApiName , type:'text'},
    { label: 'Reason', fieldName: REASON_FIELD.fieldApiName , type:'text'},
    ,



];

export default class CaseList extends LightningElement {

    columns = COLUMNS;
    @wire(getCases)
    cases;
}