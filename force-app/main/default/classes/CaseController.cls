public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {

        return [
            SELECT  Subject
            FROM Case
            WITH SECURITY_ENFORCED
            ORDER BY Subject
        ];
    }
}
