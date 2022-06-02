import { LightningElement, wire , api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
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
    @api VocList
    @api vocLists =[];

    columns = COLUMNS;
    @wire(getCases)
    cases;

    recordId;
    refreshTable;

    vocLists;
    record={};

    handleEvent = event =>{
        const refreshRecordEvent = event.data.payload;
        if(refreshRecordEvent.RecordId__c === this.recordId) {
            this.recordId = '';
            return refreshApex(this.refreshTable);
        }

    }

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch(actionName){
            case 'delete' :
                this.delRow(row);
                break;
        }        
    }


    delRow(currentRow) {
        deleteRow({objcase:currentRow}).then(
            this.dispatchEvent(new ShowToastEvent({

                title : 'success',
                message : currentRow.Name + 'account deleted',
                variant : 'success'
            }
               
            )));
    }  

   

  
}