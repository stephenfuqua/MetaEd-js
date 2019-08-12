DECLARE @ApplicationId INT
 
SELECT @ApplicationId = ApplicationId
FROM [dbo].[Applications]
WHERE ApplicationName = 'Ed-Fi ODS API'
  
DECLARE @ParentResourceClaimId INT
SELECT @ParentResourceClaimId = ResourceClaimId
FROM [dbo].[ResourceClaims]
WHERE ResourceName = 'relationshipBasedData'
 
INSERT INTO [dbo].[ResourceClaims] ( [DisplayName]
                                     ,[ResourceName]
                                     ,[ClaimName]     
                                     ,[ParentResourceClaimId]
                                     ,[Application_ApplicationId]
                                     )
VALUES ('chartOfAccount'
        ,'chartOfAccount'
        ,'http://ed-fi.org/ods/identity/claims/chartOfAccount'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('localAccount'
        ,'localAccount'
        ,'http://ed-fi.org/ods/identity/claims/localAccount'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('localBudget'
        ,'localBudget'
        ,'http://ed-fi.org/ods/identity/claims/localBudget'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),('localActual'
        ,'localActual'
        ,'http://ed-fi.org/ods/identity/claims/localActual'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		 ('balanceSheetDimension'
        ,'balanceSheetDimension'
        ,'http://ed-fi.org/ods/identity/claims/balanceSheetDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('functionDimension'
        ,'functionDimension'
        ,'http://ed-fi.org/ods/identity/claims/functionDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('fundDimension'
        ,'fundDimension'
        ,'http://ed-fi.org/ods/identity/claims/fundDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),('objectDimension'
        ,'objectDimension'
        ,'http://ed-fi.org/ods/identity/claims/objectDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		 ('operationalUnitDimension'
        ,'operationalUnitDimension'
        ,'http://ed-fi.org/ods/identity/claims/operationalUnitDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('programDimension'
        ,'programDimension'
        ,'http://ed-fi.org/ods/identity/claims/programDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('projectDimension'
        ,'projectDimension'
        ,'http://ed-fi.org/ods/identity/claims/projectDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),('sourceDimension'
        ,'sourceDimension'
        ,'http://ed-fi.org/ods/identity/claims/sourceDimension'
        ,@ParentResourceClaimId
        ,@ApplicationId
        )


SELECT @ParentResourceClaimId = ResourceClaimId
FROM [dbo].[ResourceClaims]
WHERE ResourceName = 'systemDescriptors'
 
 INSERT INTO [dbo].[ResourceClaims] ( [DisplayName]
                                     ,[ResourceName]
                                     ,[ClaimName]     
                                     ,[ParentResourceClaimId]
                                     ,[Application_ApplicationId]
                                     )
VALUES ('reportingTagDescriptor'
        ,'reportingTagDescriptor'
        ,'http://ed-fi.org/ods/identity/claims/reportingTagDescriptor'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('financialCollectionDescriptor'
        ,'financialCollectionDescriptor'
        ,'http://ed-fi.org/ods/identity/claims/financialCollectionDescriptor'
        ,@ParentResourceClaimId
        ,@ApplicationId
        ),
		('accountTypeDescriptor'
        ,'accountTypeDescriptor'
        ,'http://ed-fi.org/ods/identity/claims/accountTypeDescriptor'
        ,@ParentResourceClaimId
        ,@ApplicationId
        )