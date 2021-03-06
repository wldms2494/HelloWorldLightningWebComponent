import { LightningElement, wire, track ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { refreshApex } from '@salesforce/apex';

import getRecordCounts from '@salesforce/apex/recordCount.getRecordCounts';
import getClosedRecordCounts from '@salesforce/apex/recordCount.getClosedRecordCounts';
import getPendingRecordCounts from '@salesforce/apex/recordCount.getPendingRecordCounts';
import getNewRecordCounts from '@salesforce/apex/recordCount.getNewRecordCounts';

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
    
];




export default class Voc extends NavigationMixin(LightningElement) {

    @api count=0;
    @api newCount=0;
    @api workingCount=0;
    @api closedCount=0;


    refreshStatus;
    refreshTable;
    vocList;
    @api vocStatus = 'All';

    recordId;
    record={};
    columns = COLUMNS;


    @track isLoading = true;
    @track isModalOpen = false;


    @wire(getRecordCounts) count;
    @wire(getNewRecordCounts) newCount;
    @wire(getPendingRecordCounts) workingCount;
    @wire(getClosedRecordCounts) closedCount;

   
    



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



    @wire(getCases, {Status: '$vocStatus'})
    InitVocList(result){
        this.refreshTable = result;
        if(result.data){
            let tempArr=[];
            result.data.forEach( record =>{
                let temp = {};
                //temp.Id = record.Id;
                temp.CaseNumber = record.CaseNumber;
                //temp.AccountId = record.AccountId;
                if(record.AccountId!=null) {
                    temp.AccountId = record.AccountId
                } else {temp.AccountId = '';}
                temp.Status = record.Status;
                temp.Subject = record.Subject;
                temp.Reason = record.Reason;
                tempArr.push(temp);

            })
            this.vocList = tempArr;
        }else if(result.error) {
            console.log('initVocList error!!', result.error);
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    }



    VocList(event){
        this.vocStatus = event.target.dataset.id;        
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