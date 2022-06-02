import { LightningElement, wire , api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import getCases from '@salesforce/apex/CaseController.getCases';
import getRecordCounts from '@salesforce/apex/recordCount.getRecordCounts';
import getClosedRecordCounts from '@salesforce/apex/recordCount.getClosedRecordCounts';
import getPendingRecordCounts from '@salesforce/apex/recordCount.getPendingRecordCounts';
import getNewRecordCounts from '@salesforce/apex/recordCount.getNewRecordCounts';

export default class Boxes  extends NavigationMixin(LightningElement) {
    @api New =0;

    @wire(getCases)
    cases;

    recordId;
    refreshTable;
    vocLists;
    record={};

    @wire(getRecordCounts) count;
    @wire(getNewRecordCounts) newCount;
    @wire(getPendingRecordCounts) workingCount;
    @wire(getClosedRecordCounts) closedCount;

  

    VocList(event) {
        getCases ({Status: event.target.dataset.id})
        .then(
            result =>{
            this.refreshTable = result;
            let tempArr = [];
            result.forEach(record =>{
                let temp = {};
                temp.Id = record.Id;
                temp.Reason = record.Reason;
                temp.CaseNumber = record.CaseNumber;
                temp.AccountId = record.AccountId;
                temp.Status = record.Status;
                temp.Subject = record.Subject;
                tempArr.push(temp);            
            })
            this.vocLists = tempArr;

        })

        .catch(error => {
            this.error = error;
        });
    }
    
    
      
}


   

    
