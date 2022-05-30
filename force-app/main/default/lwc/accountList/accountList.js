import { LightningElement , wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import NAME_FIELD from '@salesforce/schema/Account.Name';
const COLUMNS = [
    { label: 'AccountName', fieldName: NAME_FIELD.fieldApiName, type:'text'}
];
export default class AccountList extends LightningElement {

    columns = COLUMNS;
    @wire (getAccounts)
    accounts;
}