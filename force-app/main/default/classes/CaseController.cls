public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String Status) {     
 

            return [
                SELECT Subject,CaseNumber,AccountId,Reason, Status
                FROM Case
                WITH SECURITY_ENFORCED
                ORDER BY Subject
            ];
            
    }
}
