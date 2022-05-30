import { LightningElement } from 'lwc';

const columns = [
    {label: "Account", fieldName:'Account'},
    {label: "Website", fieldName:'Website', type : 'url'},
    {label: "Email", fieldName:'Email', type : 'email'}

]
export default class CaseTable extends LightningElement {

    data=[];
    columns = columns;

}