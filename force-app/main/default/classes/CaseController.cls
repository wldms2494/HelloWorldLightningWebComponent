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


    @AuraEnabled(cacheable=true)
    public static List<Case> getNewCases(String Status) {

        return [
            SELECT Subject, CaseNumber,AccountId,Reason,Status
            FROM Case
            WHERE Status='New'
            ORDER BY Subject
        ];
    }
}
