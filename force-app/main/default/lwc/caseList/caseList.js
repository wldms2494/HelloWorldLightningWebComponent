import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCases from '@salesforce/apex/CaseController.getCases';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import ACCOUNT_FIELD from '@salesforce/schema/Case.AccountId';
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import deleteRow from '@salesforce/apex/RowActionsHandler.deleteRow';

//define row actions
const actions = [
    {label:'Delete', name:'delete'}
];

const COLUMNS = [
    { label: 'Case Number', fieldName: NUMBER_FIELD.fieldApiName , type:'text'},
    { label: 'Account Name', fieldName: ACCOUNT_FIELD.fieldApiName , type:'text'},
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName , type:'text'},
    { label: 'Subject', fieldName: SUBJECT_FIELD.fieldApiName , type:'text'},
    { label: 'Reason', fieldName: REASON_FIELD.fieldApiName , type:'text'},
    {
        type: 'action',
        typeAttributes:{
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
    ,



];

export default class CaseList extends NavigationMixin(LightningElement) {

    columns = COLUMNS;
    @wire(getCases)
    cases;
    refreshTable;


   
}