import { LightningElement, wire , api} from 'lwc';
import LightningAlert from 'lightning/alert';
import getRecordCounts from '@salesforce/apex/recordCount.getRecordCounts';
import getClosedRecordCounts from '@salesforce/apex/recordCount.getClosedRecordCounts';
import getPendingRecordCounts from '@salesforce/apex/recordCount.getPendingRecordCounts';
import getNewRecordCounts from '@salesforce/apex/recordCount.getNewRecordCounts';

export default class Boxes extends  LightningElement {

    @wire(getRecordCounts) count;
    @wire(getNewRecordCounts) newCount;
    @wire(getPendingRecordCounts) workingCount;
    @wire(getClosedRecordCounts) closedCount;

    async handleAlertClick(){
        await LightningAlert.open({
            message: '당신은 숫자를 클릭했음',
            label: 'Success!'
        });
    }

      
}


   

    
