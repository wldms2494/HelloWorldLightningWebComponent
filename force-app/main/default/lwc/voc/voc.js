import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getRecordCounts from '@salesforce/apex/recordCount.getRecordCounts';
import getClosedRecordCounts from '@salesforce/apex/recordCount.getClosedRecordCounts';
import getPendingRecordCounts from '@salesforce/apex/recordCount.getPendingRecordCounts';
import getNewRecordCounts from '@salesforce/apex/recordCount.getNewRecordCounts';

import getAllCases from '@salesforce/apex/CaseController.getAllCases';

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
    
];




export default class Voc extends LightningElement {
    refreshStatus;
    refreshTable;

    @track isModalOpen = false;


    columns = COLUMNS;
    @wire(getRecordCounts) count;
    @wire(getNewRecordCounts) newCount;
    @wire(getPendingRecordCounts) workingCount;
    @wire(getClosedRecordCounts) closedCount;

    @wire(getAllCases) allCases;



    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {     
        this.isModalOpen = false;
    }   

    handleSuccess(){
        this.isLoading = true;         
        this.isModalOpen = false;
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
        refreshApex(this.refreshStatus);
        refreshApex(this.refreshTable);        
    }
}