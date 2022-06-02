import { LightningElement, wire , api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRecordCounts from '@salesforce/apex/recordCount.getRecordCounts';
import getClosedRecordCounts from '@salesforce/apex/recordCount.getClosedRecordCounts';
import getPendingRecordCounts from '@salesforce/apex/recordCount.getPendingRecordCounts';
import getNewRecordCounts from '@salesforce/apex/recordCount.getNewRecordCounts';
import getNewCases from '@salesforce/apex/CaseController.getNewCases'
export default class Boxes  extends NavigationMixin(LightningElement) {
   
    @wire(getRecordCounts) count;
    @wire(getNewRecordCounts) newCount;
    @wire(getPendingRecordCounts) workingCount;
    @wire(getClosedRecordCounts) closedCount;

  

    @wire(getNewCases) newCases;


    factor = 'hello world';
    showNewCases(event){
        const factor = this.factor;
        this.dispatchEvent(new CustomEvent ('test', {detail:factor}))
    }
      
}


   

    
