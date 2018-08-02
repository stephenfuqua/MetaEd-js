CREATE TABLE dbo.edfi_AcademicHonorCategoryType_TrackedDelete
(
       AcademicHonorCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AcademicHonorCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (AcademicHonorCategoryTypeId)
)

CREATE TABLE dbo.edfi_AcademicSubjectDescriptor_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AcademicSubjectDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId)
)

CREATE TABLE dbo.edfi_AcademicWeek_TrackedDelete
(
       SchoolId [INT] NOT NULL,
       WeekIdentifier [NVARCHAR](80) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AcademicWeek_TrackedDelete PRIMARY KEY CLUSTERED (SchoolId, WeekIdentifier)
)

CREATE TABLE dbo.edfi_AccommodationDescriptor_TrackedDelete
(
       AccommodationDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AccommodationDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AccommodationDescriptorId)
)

CREATE TABLE dbo.edfi_AccountCodeDescriptor_TrackedDelete
(
       AccountCodeDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AccountCodeDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AccountCodeDescriptorId)
)

CREATE TABLE dbo.edfi_Account_TrackedDelete
(
       AccountNumber [NVARCHAR](50) NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       FiscalYear [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Account_TrackedDelete PRIMARY KEY CLUSTERED (AccountNumber, EducationOrganizationId, FiscalYear)
)

CREATE TABLE dbo.edfi_AccountabilityRating_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       RatingTitle [NVARCHAR](60) NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AccountabilityRating_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, RatingTitle, SchoolYear)
)

CREATE TABLE dbo.edfi_AchievementCategoryDescriptor_TrackedDelete
(
       AchievementCategoryDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AchievementCategoryDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AchievementCategoryDescriptorId)
)

CREATE TABLE dbo.edfi_Actual_TrackedDelete
(
       AccountNumber [NVARCHAR](50) NOT NULL,
       AsOfDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       FiscalYear [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Actual_TrackedDelete PRIMARY KEY CLUSTERED (AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear)
)

CREATE TABLE dbo.edfi_AdditionalCreditType_TrackedDelete
(
       AdditionalCreditTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AdditionalCreditType_TrackedDelete PRIMARY KEY CLUSTERED (AdditionalCreditTypeId)
)

CREATE TABLE dbo.edfi_AddressType_TrackedDelete
(
       AddressTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AddressType_TrackedDelete PRIMARY KEY CLUSTERED (AddressTypeId)
)

CREATE TABLE dbo.edfi_AdministrationEnvironmentType_TrackedDelete
(
       AdministrationEnvironmentTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AdministrationEnvironmentType_TrackedDelete PRIMARY KEY CLUSTERED (AdministrationEnvironmentTypeId)
)

CREATE TABLE dbo.edfi_AdministrativeFundingControlDescriptor_TrackedDelete
(
       AdministrativeFundingControlDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AdministrativeFundingControlDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AdministrativeFundingControlDescriptorId)
)

CREATE TABLE dbo.edfi_AssessmentCategoryDescriptor_TrackedDelete
(
       AssessmentCategoryDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentCategoryDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentCategoryDescriptorId)
)

CREATE TABLE dbo.edfi_AssessmentFamily_TrackedDelete
(
       AssessmentFamilyTitle [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentFamily_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentFamilyTitle)
)

CREATE TABLE dbo.edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete
(
       AssessmentIdentificationSystemDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentIdentificationSystemDescriptorId)
)

CREATE TABLE dbo.edfi_AssessmentItemCategoryType_TrackedDelete
(
       AssessmentItemCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentItemCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentItemCategoryTypeId)
)

CREATE TABLE dbo.edfi_AssessmentItemResultType_TrackedDelete
(
       AssessmentItemResultTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentItemResultType_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentItemResultTypeId)
)

CREATE TABLE dbo.edfi_AssessmentItem_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       AssessedGradeLevelDescriptorId [INT] NOT NULL,
       AssessmentTitle [NVARCHAR](60) NOT NULL,
       IdentificationCode [NVARCHAR](60) NOT NULL,
       Version [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentItem_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version)
)

CREATE TABLE dbo.edfi_AssessmentPeriodDescriptor_TrackedDelete
(
       AssessmentPeriodDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentPeriodDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentPeriodDescriptorId)
)

CREATE TABLE dbo.edfi_AssessmentReportingMethodType_TrackedDelete
(
       AssessmentReportingMethodTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AssessmentReportingMethodType_TrackedDelete PRIMARY KEY CLUSTERED (AssessmentReportingMethodTypeId)
)

CREATE TABLE dbo.edfi_Assessment_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       AssessedGradeLevelDescriptorId [INT] NOT NULL,
       AssessmentTitle [NVARCHAR](60) NOT NULL,
       Version [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Assessment_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, Version)
)

CREATE TABLE dbo.edfi_AttendanceEventCategoryDescriptor_TrackedDelete
(
       AttendanceEventCategoryDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_AttendanceEventCategoryDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (AttendanceEventCategoryDescriptorId)
)

CREATE TABLE dbo.edfi_BehaviorDescriptor_TrackedDelete
(
       BehaviorDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_BehaviorDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (BehaviorDescriptorId)
)

CREATE TABLE dbo.edfi_BellSchedule_TrackedDelete
(
       BellScheduleName [NVARCHAR](60) NOT NULL,
       Date [DATE] NOT NULL,
       GradeLevelDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_BellSchedule_TrackedDelete PRIMARY KEY CLUSTERED (BellScheduleName, Date, GradeLevelDescriptorId, SchoolId)
)

CREATE TABLE dbo.edfi_Budget_TrackedDelete
(
       AccountNumber [NVARCHAR](50) NOT NULL,
       AsOfDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       FiscalYear [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Budget_TrackedDelete PRIMARY KEY CLUSTERED (AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear)
)

CREATE TABLE dbo.edfi_CalendarDate_TrackedDelete
(
       Date [DATE] NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CalendarDate_TrackedDelete PRIMARY KEY CLUSTERED (Date, SchoolId)
)

CREATE TABLE dbo.edfi_CalendarEventDescriptor_TrackedDelete
(
       CalendarEventDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CalendarEventDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (CalendarEventDescriptorId)
)

CREATE TABLE dbo.edfi_CareerPathwayType_TrackedDelete
(
       CareerPathwayTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CareerPathwayType_TrackedDelete PRIMARY KEY CLUSTERED (CareerPathwayTypeId)
)

CREATE TABLE dbo.edfi_CharterApprovalAgencyType_TrackedDelete
(
       CharterApprovalAgencyTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CharterApprovalAgencyType_TrackedDelete PRIMARY KEY CLUSTERED (CharterApprovalAgencyTypeId)
)

CREATE TABLE dbo.edfi_CharterStatusType_TrackedDelete
(
       CharterStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CharterStatusType_TrackedDelete PRIMARY KEY CLUSTERED (CharterStatusTypeId)
)

CREATE TABLE dbo.edfi_CitizenshipStatusType_TrackedDelete
(
       CitizenshipStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CitizenshipStatusType_TrackedDelete PRIMARY KEY CLUSTERED (CitizenshipStatusTypeId)
)

CREATE TABLE dbo.edfi_ClassPeriod_TrackedDelete
(
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ClassPeriod_TrackedDelete PRIMARY KEY CLUSTERED (ClassPeriodName, SchoolId)
)

CREATE TABLE dbo.edfi_ClassroomPositionDescriptor_TrackedDelete
(
       ClassroomPositionDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ClassroomPositionDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ClassroomPositionDescriptorId)
)

CREATE TABLE dbo.edfi_CohortScopeType_TrackedDelete
(
       CohortScopeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CohortScopeType_TrackedDelete PRIMARY KEY CLUSTERED (CohortScopeTypeId)
)

CREATE TABLE dbo.edfi_CohortType_TrackedDelete
(
       CohortTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CohortType_TrackedDelete PRIMARY KEY CLUSTERED (CohortTypeId)
)

CREATE TABLE dbo.edfi_CohortYearType_TrackedDelete
(
       CohortYearTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CohortYearType_TrackedDelete PRIMARY KEY CLUSTERED (CohortYearTypeId)
)

CREATE TABLE dbo.edfi_Cohort_TrackedDelete
(
       CohortIdentifier [NVARCHAR](20) NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Cohort_TrackedDelete PRIMARY KEY CLUSTERED (CohortIdentifier, EducationOrganizationId)
)

CREATE TABLE dbo.edfi_CompetencyLevelDescriptor_TrackedDelete
(
       CompetencyLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CompetencyLevelDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (CompetencyLevelDescriptorId)
)

CREATE TABLE dbo.edfi_CompetencyObjective_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       Objective [NVARCHAR](60) NOT NULL,
       ObjectiveGradeLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CompetencyObjective_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId)
)

CREATE TABLE dbo.edfi_ContentClassType_TrackedDelete
(
       ContentClassTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ContentClassType_TrackedDelete PRIMARY KEY CLUSTERED (ContentClassTypeId)
)

CREATE TABLE dbo.edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete
(
       ContinuationOfServicesReasonDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ContinuationOfServicesReasonDescriptorId)
)

CREATE TABLE dbo.edfi_ContractedStaff_TrackedDelete
(
       AccountNumber [NVARCHAR](50) NOT NULL,
       AsOfDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       FiscalYear [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ContractedStaff_TrackedDelete PRIMARY KEY CLUSTERED (AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI)
)

CREATE TABLE dbo.edfi_CostRateType_TrackedDelete
(
       CostRateTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CostRateType_TrackedDelete PRIMARY KEY CLUSTERED (CostRateTypeId)
)

CREATE TABLE dbo.edfi_CountryDescriptor_TrackedDelete
(
       CountryDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CountryDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (CountryDescriptorId)
)

CREATE TABLE dbo.edfi_CourseAttemptResultType_TrackedDelete
(
       CourseAttemptResultTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseAttemptResultType_TrackedDelete PRIMARY KEY CLUSTERED (CourseAttemptResultTypeId)
)

CREATE TABLE dbo.edfi_CourseDefinedByType_TrackedDelete
(
       CourseDefinedByTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseDefinedByType_TrackedDelete PRIMARY KEY CLUSTERED (CourseDefinedByTypeId)
)

CREATE TABLE dbo.edfi_CourseGPAApplicabilityType_TrackedDelete
(
       CourseGPAApplicabilityTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseGPAApplicabilityType_TrackedDelete PRIMARY KEY CLUSTERED (CourseGPAApplicabilityTypeId)
)

CREATE TABLE dbo.edfi_CourseIdentificationSystemDescriptor_TrackedDelete
(
       CourseIdentificationSystemDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseIdentificationSystemDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (CourseIdentificationSystemDescriptorId)
)

CREATE TABLE dbo.edfi_CourseLevelCharacteristicType_TrackedDelete
(
       CourseLevelCharacteristicTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseLevelCharacteristicType_TrackedDelete PRIMARY KEY CLUSTERED (CourseLevelCharacteristicTypeId)
)

CREATE TABLE dbo.edfi_CourseOffering_TrackedDelete
(
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseOffering_TrackedDelete PRIMARY KEY CLUSTERED (LocalCourseCode, SchoolId, SchoolYear, TermDescriptorId)
)

CREATE TABLE dbo.edfi_CourseRepeatCodeType_TrackedDelete
(
       CourseRepeatCodeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseRepeatCodeType_TrackedDelete PRIMARY KEY CLUSTERED (CourseRepeatCodeTypeId)
)

CREATE TABLE dbo.edfi_CourseTranscript_TrackedDelete
(
       CourseAttemptResultTypeId [INT] NOT NULL,
       CourseCode [NVARCHAR](60) NOT NULL,
       CourseEducationOrganizationId [INT] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CourseTranscript_TrackedDelete PRIMARY KEY CLUSTERED (CourseAttemptResultTypeId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId)
)

CREATE TABLE dbo.edfi_Course_TrackedDelete
(
       CourseCode [NVARCHAR](60) NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Course_TrackedDelete PRIMARY KEY CLUSTERED (CourseCode, EducationOrganizationId)
)

CREATE TABLE dbo.edfi_CredentialFieldDescriptor_TrackedDelete
(
       CredentialFieldDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CredentialFieldDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (CredentialFieldDescriptorId)
)

CREATE TABLE dbo.edfi_CredentialType_TrackedDelete
(
       CredentialTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CredentialType_TrackedDelete PRIMARY KEY CLUSTERED (CredentialTypeId)
)

CREATE TABLE dbo.edfi_CreditType_TrackedDelete
(
       CreditTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CreditType_TrackedDelete PRIMARY KEY CLUSTERED (CreditTypeId)
)

CREATE TABLE dbo.edfi_CurriculumUsedType_TrackedDelete
(
       CurriculumUsedTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_CurriculumUsedType_TrackedDelete PRIMARY KEY CLUSTERED (CurriculumUsedTypeId)
)

CREATE TABLE dbo.edfi_DeliveryMethodType_TrackedDelete
(
       DeliveryMethodTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DeliveryMethodType_TrackedDelete PRIMARY KEY CLUSTERED (DeliveryMethodTypeId)
)

CREATE TABLE dbo.edfi_Descriptor_TrackedDelete
(
       DescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Descriptor_TrackedDelete PRIMARY KEY CLUSTERED (DescriptorId)
)

CREATE TABLE dbo.edfi_DiagnosisDescriptor_TrackedDelete
(
       DiagnosisDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DiagnosisDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (DiagnosisDescriptorId)
)

CREATE TABLE dbo.edfi_DiplomaLevelType_TrackedDelete
(
       DiplomaLevelTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DiplomaLevelType_TrackedDelete PRIMARY KEY CLUSTERED (DiplomaLevelTypeId)
)

CREATE TABLE dbo.edfi_DiplomaType_TrackedDelete
(
       DiplomaTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DiplomaType_TrackedDelete PRIMARY KEY CLUSTERED (DiplomaTypeId)
)

CREATE TABLE dbo.edfi_DisabilityCategoryType_TrackedDelete
(
       DisabilityCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisabilityCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (DisabilityCategoryTypeId)
)

CREATE TABLE dbo.edfi_DisabilityDescriptor_TrackedDelete
(
       DisabilityDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisabilityDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (DisabilityDescriptorId)
)

CREATE TABLE dbo.edfi_DisabilityDeterminationSourceType_TrackedDelete
(
       DisabilityDeterminationSourceTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisabilityDeterminationSourceType_TrackedDelete PRIMARY KEY CLUSTERED (DisabilityDeterminationSourceTypeId)
)

CREATE TABLE dbo.edfi_DisciplineActionLengthDifferenceReasonType_TrackedDelete
(
       DisciplineActionLengthDifferenceReasonTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisciplineActionLengthDifferenceReasonType_TrackedDelete PRIMARY KEY CLUSTERED (DisciplineActionLengthDifferenceReasonTypeId)
)

CREATE TABLE dbo.edfi_DisciplineAction_TrackedDelete
(
       DisciplineActionIdentifier [NVARCHAR](20) NOT NULL,
       DisciplineDate [DATE] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisciplineAction_TrackedDelete PRIMARY KEY CLUSTERED (DisciplineActionIdentifier, DisciplineDate, StudentUSI)
)

CREATE TABLE dbo.edfi_DisciplineDescriptor_TrackedDelete
(
       DisciplineDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisciplineDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (DisciplineDescriptorId)
)

CREATE TABLE dbo.edfi_DisciplineIncident_TrackedDelete
(
       IncidentIdentifier [NVARCHAR](20) NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_DisciplineIncident_TrackedDelete PRIMARY KEY CLUSTERED (IncidentIdentifier, SchoolId)
)

CREATE TABLE dbo.edfi_EducationContent_TrackedDelete
(
       ContentIdentifier [NVARCHAR](225) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationContent_TrackedDelete PRIMARY KEY CLUSTERED (ContentIdentifier)
)

CREATE TABLE dbo.edfi_EducationOrganizationCategoryType_TrackedDelete
(
       EducationOrganizationCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationCategoryTypeId)
)

CREATE TABLE dbo.edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete
(
       EducationOrganizationIdentificationSystemDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationIdentificationSystemDescriptorId)
)

CREATE TABLE dbo.edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       InterventionPrescriptionEducationOrganizationId [INT] NOT NULL,
       InterventionPrescriptionIdentificationCode [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode)
)

CREATE TABLE dbo.edfi_EducationOrganizationNetworkAssociation_TrackedDelete
(
       EducationOrganizationNetworkId [INT] NOT NULL,
       MemberEducationOrganizationId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationNetworkAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationNetworkId, MemberEducationOrganizationId)
)

CREATE TABLE dbo.edfi_EducationOrganizationNetwork_TrackedDelete
(
       EducationOrganizationNetworkId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationNetwork_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationNetworkId)
)

CREATE TABLE dbo.edfi_EducationOrganizationPeerAssociation_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       PeerEducationOrganizationId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganizationPeerAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, PeerEducationOrganizationId)
)

CREATE TABLE dbo.edfi_EducationOrganization_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationOrganization_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId)
)

CREATE TABLE dbo.edfi_EducationPlanType_TrackedDelete
(
       EducationPlanTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationPlanType_TrackedDelete PRIMARY KEY CLUSTERED (EducationPlanTypeId)
)

CREATE TABLE dbo.edfi_EducationServiceCenter_TrackedDelete
(
       EducationServiceCenterId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationServiceCenter_TrackedDelete PRIMARY KEY CLUSTERED (EducationServiceCenterId)
)

CREATE TABLE dbo.edfi_EducationalEnvironmentType_TrackedDelete
(
       EducationalEnvironmentTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EducationalEnvironmentType_TrackedDelete PRIMARY KEY CLUSTERED (EducationalEnvironmentTypeId)
)

CREATE TABLE dbo.edfi_ElectronicMailType_TrackedDelete
(
       ElectronicMailTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ElectronicMailType_TrackedDelete PRIMARY KEY CLUSTERED (ElectronicMailTypeId)
)

CREATE TABLE dbo.edfi_EmploymentStatusDescriptor_TrackedDelete
(
       EmploymentStatusDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EmploymentStatusDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (EmploymentStatusDescriptorId)
)

CREATE TABLE dbo.edfi_EntryGradeLevelReasonType_TrackedDelete
(
       EntryGradeLevelReasonTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EntryGradeLevelReasonType_TrackedDelete PRIMARY KEY CLUSTERED (EntryGradeLevelReasonTypeId)
)

CREATE TABLE dbo.edfi_EntryTypeDescriptor_TrackedDelete
(
       EntryTypeDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EntryTypeDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (EntryTypeDescriptorId)
)

CREATE TABLE dbo.edfi_EventCircumstanceType_TrackedDelete
(
       EventCircumstanceTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_EventCircumstanceType_TrackedDelete PRIMARY KEY CLUSTERED (EventCircumstanceTypeId)
)

CREATE TABLE dbo.edfi_ExitWithdrawTypeDescriptor_TrackedDelete
(
       ExitWithdrawTypeDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ExitWithdrawTypeDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ExitWithdrawTypeDescriptorId)
)

CREATE TABLE dbo.edfi_FeederSchoolAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       FeederSchoolId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_FeederSchoolAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, FeederSchoolId, SchoolId)
)

CREATE TABLE dbo.edfi_GradeLevelDescriptor_TrackedDelete
(
       GradeLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradeLevelDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (GradeLevelDescriptorId)
)

CREATE TABLE dbo.edfi_GradeType_TrackedDelete
(
       GradeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradeType_TrackedDelete PRIMARY KEY CLUSTERED (GradeTypeId)
)

CREATE TABLE dbo.edfi_Grade_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       GradeTypeId [INT] NOT NULL,
       GradingPeriodBeginDate [DATE] NOT NULL,
       GradingPeriodDescriptorId [INT] NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Grade_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, ClassPeriodName, ClassroomIdentificationCode, GradeTypeId, GradingPeriodBeginDate, GradingPeriodDescriptorId, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_GradebookEntryType_TrackedDelete
(
       GradebookEntryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradebookEntryType_TrackedDelete PRIMARY KEY CLUSTERED (GradebookEntryTypeId)
)

CREATE TABLE dbo.edfi_GradebookEntry_TrackedDelete
(
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       DateAssigned [DATE] NOT NULL,
       GradebookEntryTitle [NVARCHAR](60) NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradebookEntry_TrackedDelete PRIMARY KEY CLUSTERED (ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_GradingPeriodDescriptor_TrackedDelete
(
       GradingPeriodDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradingPeriodDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (GradingPeriodDescriptorId)
)

CREATE TABLE dbo.edfi_GradingPeriod_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       GradingPeriodDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GradingPeriod_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, GradingPeriodDescriptorId, SchoolId)
)

CREATE TABLE dbo.edfi_GraduationPlanTypeDescriptor_TrackedDelete
(
       GraduationPlanTypeDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GraduationPlanTypeDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (GraduationPlanTypeDescriptorId)
)

CREATE TABLE dbo.edfi_GraduationPlan_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       GraduationPlanTypeDescriptorId [INT] NOT NULL,
       GraduationSchoolYear [SMALLINT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GraduationPlan_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear)
)

CREATE TABLE dbo.edfi_GunFreeSchoolsActReportingStatusType_TrackedDelete
(
       GunFreeSchoolsActReportingStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_GunFreeSchoolsActReportingStatusType_TrackedDelete PRIMARY KEY CLUSTERED (GunFreeSchoolsActReportingStatusTypeId)
)

CREATE TABLE dbo.edfi_IdentificationDocumentUseType_TrackedDelete
(
       IdentificationDocumentUseTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_IdentificationDocumentUseType_TrackedDelete PRIMARY KEY CLUSTERED (IdentificationDocumentUseTypeId)
)

CREATE TABLE dbo.edfi_IncidentLocationType_TrackedDelete
(
       IncidentLocationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_IncidentLocationType_TrackedDelete PRIMARY KEY CLUSTERED (IncidentLocationTypeId)
)

CREATE TABLE dbo.edfi_InstitutionTelephoneNumberType_TrackedDelete
(
       InstitutionTelephoneNumberTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InstitutionTelephoneNumberType_TrackedDelete PRIMARY KEY CLUSTERED (InstitutionTelephoneNumberTypeId)
)

CREATE TABLE dbo.edfi_IntegratedTechnologyStatusType_TrackedDelete
(
       IntegratedTechnologyStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_IntegratedTechnologyStatusType_TrackedDelete PRIMARY KEY CLUSTERED (IntegratedTechnologyStatusTypeId)
)

CREATE TABLE dbo.edfi_InteractivityStyleType_TrackedDelete
(
       InteractivityStyleTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InteractivityStyleType_TrackedDelete PRIMARY KEY CLUSTERED (InteractivityStyleTypeId)
)

CREATE TABLE dbo.edfi_InternetAccessType_TrackedDelete
(
       InternetAccessTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InternetAccessType_TrackedDelete PRIMARY KEY CLUSTERED (InternetAccessTypeId)
)

CREATE TABLE dbo.edfi_InterventionClassType_TrackedDelete
(
       InterventionClassTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InterventionClassType_TrackedDelete PRIMARY KEY CLUSTERED (InterventionClassTypeId)
)

CREATE TABLE dbo.edfi_InterventionEffectivenessRatingType_TrackedDelete
(
       InterventionEffectivenessRatingTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InterventionEffectivenessRatingType_TrackedDelete PRIMARY KEY CLUSTERED (InterventionEffectivenessRatingTypeId)
)

CREATE TABLE dbo.edfi_InterventionPrescription_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       InterventionPrescriptionIdentificationCode [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InterventionPrescription_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, InterventionPrescriptionIdentificationCode)
)

CREATE TABLE dbo.edfi_InterventionStudy_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       InterventionStudyIdentificationCode [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_InterventionStudy_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, InterventionStudyIdentificationCode)
)

CREATE TABLE dbo.edfi_Intervention_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       InterventionIdentificationCode [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Intervention_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, InterventionIdentificationCode)
)

CREATE TABLE dbo.edfi_LanguageDescriptor_TrackedDelete
(
       LanguageDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LanguageDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (LanguageDescriptorId)
)

CREATE TABLE dbo.edfi_LanguageUseType_TrackedDelete
(
       LanguageUseTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LanguageUseType_TrackedDelete PRIMARY KEY CLUSTERED (LanguageUseTypeId)
)

CREATE TABLE dbo.edfi_LearningObjective_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       Objective [NVARCHAR](60) NOT NULL,
       ObjectiveGradeLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LearningObjective_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, Objective, ObjectiveGradeLevelDescriptorId)
)

CREATE TABLE dbo.edfi_LearningStandard_TrackedDelete
(
       LearningStandardId [NVARCHAR](60) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LearningStandard_TrackedDelete PRIMARY KEY CLUSTERED (LearningStandardId)
)

CREATE TABLE dbo.edfi_LeaveEventCategoryType_TrackedDelete
(
       LeaveEventCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LeaveEventCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (LeaveEventCategoryTypeId)
)

CREATE TABLE dbo.edfi_LeaveEvent_TrackedDelete
(
       EventDate [DATE] NOT NULL,
       LeaveEventCategoryTypeId [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LeaveEvent_TrackedDelete PRIMARY KEY CLUSTERED (EventDate, LeaveEventCategoryTypeId, StaffUSI)
)

CREATE TABLE dbo.edfi_LevelDescriptor_TrackedDelete
(
       LevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LevelDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (LevelDescriptorId)
)

CREATE TABLE dbo.edfi_LevelOfEducationDescriptor_TrackedDelete
(
       LevelOfEducationDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LevelOfEducationDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (LevelOfEducationDescriptorId)
)

CREATE TABLE dbo.edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete
(
       LimitedEnglishProficiencyDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (LimitedEnglishProficiencyDescriptorId)
)

CREATE TABLE dbo.edfi_LocalEducationAgencyCategoryType_TrackedDelete
(
       LocalEducationAgencyCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LocalEducationAgencyCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (LocalEducationAgencyCategoryTypeId)
)

CREATE TABLE dbo.edfi_LocalEducationAgency_TrackedDelete
(
       LocalEducationAgencyId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_LocalEducationAgency_TrackedDelete PRIMARY KEY CLUSTERED (LocalEducationAgencyId)
)

CREATE TABLE dbo.edfi_Location_TrackedDelete
(
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Location_TrackedDelete PRIMARY KEY CLUSTERED (ClassroomIdentificationCode, SchoolId)
)

CREATE TABLE dbo.edfi_MagnetSpecialProgramEmphasisSchoolType_TrackedDelete
(
       MagnetSpecialProgramEmphasisSchoolTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_MagnetSpecialProgramEmphasisSchoolType_TrackedDelete PRIMARY KEY CLUSTERED (MagnetSpecialProgramEmphasisSchoolTypeId)
)

CREATE TABLE dbo.edfi_MediumOfInstructionType_TrackedDelete
(
       MediumOfInstructionTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_MediumOfInstructionType_TrackedDelete PRIMARY KEY CLUSTERED (MediumOfInstructionTypeId)
)

CREATE TABLE dbo.edfi_MeetingDayType_TrackedDelete
(
       MeetingDayTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_MeetingDayType_TrackedDelete PRIMARY KEY CLUSTERED (MeetingDayTypeId)
)

CREATE TABLE dbo.edfi_MethodCreditEarnedType_TrackedDelete
(
       MethodCreditEarnedTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_MethodCreditEarnedType_TrackedDelete PRIMARY KEY CLUSTERED (MethodCreditEarnedTypeId)
)

CREATE TABLE dbo.edfi_NetworkPurposeType_TrackedDelete
(
       NetworkPurposeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_NetworkPurposeType_TrackedDelete PRIMARY KEY CLUSTERED (NetworkPurposeTypeId)
)

CREATE TABLE dbo.edfi_ObjectiveAssessment_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       AssessedGradeLevelDescriptorId [INT] NOT NULL,
       AssessmentTitle [NVARCHAR](60) NOT NULL,
       IdentificationCode [NVARCHAR](60) NOT NULL,
       Version [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ObjectiveAssessment_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version)
)

CREATE TABLE dbo.edfi_OldEthnicityType_TrackedDelete
(
       OldEthnicityTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_OldEthnicityType_TrackedDelete PRIMARY KEY CLUSTERED (OldEthnicityTypeId)
)

CREATE TABLE dbo.edfi_OpenStaffPosition_TrackedDelete
(
       DatePosted [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       EmploymentStatusDescriptorId [INT] NOT NULL,
       RequisitionNumber [NVARCHAR](20) NOT NULL,
       StaffClassificationDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_OpenStaffPosition_TrackedDelete PRIMARY KEY CLUSTERED (DatePosted, EducationOrganizationId, EmploymentStatusDescriptorId, RequisitionNumber, StaffClassificationDescriptorId)
)

CREATE TABLE dbo.edfi_OperationalStatusType_TrackedDelete
(
       OperationalStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_OperationalStatusType_TrackedDelete PRIMARY KEY CLUSTERED (OperationalStatusTypeId)
)

CREATE TABLE dbo.edfi_OtherNameType_TrackedDelete
(
       OtherNameTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_OtherNameType_TrackedDelete PRIMARY KEY CLUSTERED (OtherNameTypeId)
)

CREATE TABLE dbo.edfi_Parent_TrackedDelete
(
       ParentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Parent_TrackedDelete PRIMARY KEY CLUSTERED (ParentUSI)
)

CREATE TABLE dbo.edfi_Payroll_TrackedDelete
(
       AccountNumber [NVARCHAR](50) NOT NULL,
       AsOfDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       FiscalYear [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Payroll_TrackedDelete PRIMARY KEY CLUSTERED (AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI)
)

CREATE TABLE dbo.edfi_PerformanceBaseConversionType_TrackedDelete
(
       PerformanceBaseConversionTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PerformanceBaseConversionType_TrackedDelete PRIMARY KEY CLUSTERED (PerformanceBaseConversionTypeId)
)

CREATE TABLE dbo.edfi_PerformanceLevelDescriptor_TrackedDelete
(
       PerformanceLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PerformanceLevelDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (PerformanceLevelDescriptorId)
)

CREATE TABLE dbo.edfi_PersonalInformationVerificationType_TrackedDelete
(
       PersonalInformationVerificationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PersonalInformationVerificationType_TrackedDelete PRIMARY KEY CLUSTERED (PersonalInformationVerificationTypeId)
)

CREATE TABLE dbo.edfi_PopulationServedType_TrackedDelete
(
       PopulationServedTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PopulationServedType_TrackedDelete PRIMARY KEY CLUSTERED (PopulationServedTypeId)
)

CREATE TABLE dbo.edfi_PostSecondaryEventCategoryType_TrackedDelete
(
       PostSecondaryEventCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PostSecondaryEventCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (PostSecondaryEventCategoryTypeId)
)

CREATE TABLE dbo.edfi_PostSecondaryEvent_TrackedDelete
(
       EventDate [DATE] NOT NULL,
       PostSecondaryEventCategoryTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PostSecondaryEvent_TrackedDelete PRIMARY KEY CLUSTERED (EventDate, PostSecondaryEventCategoryTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_PostSecondaryInstitutionLevelType_TrackedDelete
(
       PostSecondaryInstitutionLevelTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PostSecondaryInstitutionLevelType_TrackedDelete PRIMARY KEY CLUSTERED (PostSecondaryInstitutionLevelTypeId)
)

CREATE TABLE dbo.edfi_PostingResultType_TrackedDelete
(
       PostingResultTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PostingResultType_TrackedDelete PRIMARY KEY CLUSTERED (PostingResultTypeId)
)

CREATE TABLE dbo.edfi_ProgramAssignmentDescriptor_TrackedDelete
(
       ProgramAssignmentDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ProgramAssignmentDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ProgramAssignmentDescriptorId)
)

CREATE TABLE dbo.edfi_ProgramCharacteristicDescriptor_TrackedDelete
(
       ProgramCharacteristicDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ProgramCharacteristicDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ProgramCharacteristicDescriptorId)
)

CREATE TABLE dbo.edfi_ProgramSponsorType_TrackedDelete
(
       ProgramSponsorTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ProgramSponsorType_TrackedDelete PRIMARY KEY CLUSTERED (ProgramSponsorTypeId)
)

CREATE TABLE dbo.edfi_ProgramType_TrackedDelete
(
       ProgramTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ProgramType_TrackedDelete PRIMARY KEY CLUSTERED (ProgramTypeId)
)

CREATE TABLE dbo.edfi_Program_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Program_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, ProgramName, ProgramTypeId)
)

CREATE TABLE dbo.edfi_PublicationStatusType_TrackedDelete
(
       PublicationStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_PublicationStatusType_TrackedDelete PRIMARY KEY CLUSTERED (PublicationStatusTypeId)
)

CREATE TABLE dbo.edfi_RaceType_TrackedDelete
(
       RaceTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RaceType_TrackedDelete PRIMARY KEY CLUSTERED (RaceTypeId)
)

CREATE TABLE dbo.edfi_ReasonExitedDescriptor_TrackedDelete
(
       ReasonExitedDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ReasonExitedDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ReasonExitedDescriptorId)
)

CREATE TABLE dbo.edfi_ReasonNotTestedType_TrackedDelete
(
       ReasonNotTestedTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ReasonNotTestedType_TrackedDelete PRIMARY KEY CLUSTERED (ReasonNotTestedTypeId)
)

CREATE TABLE dbo.edfi_RecognitionType_TrackedDelete
(
       RecognitionTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RecognitionType_TrackedDelete PRIMARY KEY CLUSTERED (RecognitionTypeId)
)

CREATE TABLE dbo.edfi_RelationType_TrackedDelete
(
       RelationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RelationType_TrackedDelete PRIMARY KEY CLUSTERED (RelationTypeId)
)

CREATE TABLE dbo.edfi_RepeatIdentifierType_TrackedDelete
(
       RepeatIdentifierTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RepeatIdentifierType_TrackedDelete PRIMARY KEY CLUSTERED (RepeatIdentifierTypeId)
)

CREATE TABLE dbo.edfi_ReportCard_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       GradingPeriodBeginDate [DATE] NOT NULL,
       GradingPeriodDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ReportCard_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, GradingPeriodBeginDate, GradingPeriodDescriptorId, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_ReporterDescriptionDescriptor_TrackedDelete
(
       ReporterDescriptionDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ReporterDescriptionDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ReporterDescriptionDescriptorId)
)

CREATE TABLE dbo.edfi_ResidencyStatusDescriptor_TrackedDelete
(
       ResidencyStatusDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ResidencyStatusDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ResidencyStatusDescriptorId)
)

CREATE TABLE dbo.edfi_ResponseIndicatorType_TrackedDelete
(
       ResponseIndicatorTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ResponseIndicatorType_TrackedDelete PRIMARY KEY CLUSTERED (ResponseIndicatorTypeId)
)

CREATE TABLE dbo.edfi_ResponsibilityDescriptor_TrackedDelete
(
       ResponsibilityDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ResponsibilityDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ResponsibilityDescriptorId)
)

CREATE TABLE dbo.edfi_RestraintEventReasonType_TrackedDelete
(
       RestraintEventReasonTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RestraintEventReasonType_TrackedDelete PRIMARY KEY CLUSTERED (RestraintEventReasonTypeId)
)

CREATE TABLE dbo.edfi_RestraintEvent_TrackedDelete
(
       EventDate [DATE] NOT NULL,
       RestraintEventIdentifier [NVARCHAR](20) NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RestraintEvent_TrackedDelete PRIMARY KEY CLUSTERED (EventDate, RestraintEventIdentifier, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_ResultDatatypeType_TrackedDelete
(
       ResultDatatypeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ResultDatatypeType_TrackedDelete PRIMARY KEY CLUSTERED (ResultDatatypeTypeId)
)

CREATE TABLE dbo.edfi_RetestIndicatorType_TrackedDelete
(
       RetestIndicatorTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_RetestIndicatorType_TrackedDelete PRIMARY KEY CLUSTERED (RetestIndicatorTypeId)
)

CREATE TABLE dbo.edfi_SchoolCategoryType_TrackedDelete
(
       SchoolCategoryTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SchoolCategoryType_TrackedDelete PRIMARY KEY CLUSTERED (SchoolCategoryTypeId)
)

CREATE TABLE dbo.edfi_SchoolChoiceImplementStatusType_TrackedDelete
(
       SchoolChoiceImplementStatusTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SchoolChoiceImplementStatusType_TrackedDelete PRIMARY KEY CLUSTERED (SchoolChoiceImplementStatusTypeId)
)

CREATE TABLE dbo.edfi_SchoolFoodServicesEligibilityDescriptor_TrackedDelete
(
       SchoolFoodServicesEligibilityDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SchoolFoodServicesEligibilityDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (SchoolFoodServicesEligibilityDescriptorId)
)

CREATE TABLE dbo.edfi_SchoolType_TrackedDelete
(
       SchoolTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SchoolType_TrackedDelete PRIMARY KEY CLUSTERED (SchoolTypeId)
)

CREATE TABLE dbo.edfi_SchoolYearType_TrackedDelete
(
       SchoolYear [SMALLINT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SchoolYearType_TrackedDelete PRIMARY KEY CLUSTERED (SchoolYear)
)

CREATE TABLE dbo.edfi_School_TrackedDelete
(
       SchoolId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_School_TrackedDelete PRIMARY KEY CLUSTERED (SchoolId)
)

CREATE TABLE dbo.edfi_SectionAttendanceTakenEvent_TrackedDelete
(
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       Date [DATE] NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SectionAttendanceTakenEvent_TrackedDelete PRIMARY KEY CLUSTERED (ClassPeriodName, ClassroomIdentificationCode, Date, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_SectionCharacteristicDescriptor_TrackedDelete
(
       SectionCharacteristicDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SectionCharacteristicDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (SectionCharacteristicDescriptorId)
)

CREATE TABLE dbo.edfi_Section_TrackedDelete
(
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Section_TrackedDelete PRIMARY KEY CLUSTERED (ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_SeparationReasonDescriptor_TrackedDelete
(
       SeparationReasonDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SeparationReasonDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (SeparationReasonDescriptorId)
)

CREATE TABLE dbo.edfi_SeparationType_TrackedDelete
(
       SeparationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SeparationType_TrackedDelete PRIMARY KEY CLUSTERED (SeparationTypeId)
)

CREATE TABLE dbo.edfi_ServiceDescriptor_TrackedDelete
(
       ServiceDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_ServiceDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (ServiceDescriptorId)
)

CREATE TABLE dbo.edfi_Session_TrackedDelete
(
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Session_TrackedDelete PRIMARY KEY CLUSTERED (SchoolId, SchoolYear, TermDescriptorId)
)

CREATE TABLE dbo.edfi_SexType_TrackedDelete
(
       SexTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SexType_TrackedDelete PRIMARY KEY CLUSTERED (SexTypeId)
)

CREATE TABLE dbo.edfi_SpecialEducationSettingDescriptor_TrackedDelete
(
       SpecialEducationSettingDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_SpecialEducationSettingDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (SpecialEducationSettingDescriptorId)
)

CREATE TABLE dbo.edfi_StaffClassificationDescriptor_TrackedDelete
(
       StaffClassificationDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffClassificationDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (StaffClassificationDescriptorId)
)

CREATE TABLE dbo.edfi_StaffCohortAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       CohortIdentifier [NVARCHAR](20) NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffCohortAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI)
)

CREATE TABLE dbo.edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       StaffClassificationDescriptorId [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI)
)

CREATE TABLE dbo.edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       EmploymentStatusDescriptorId [INT] NOT NULL,
       HireDate [DATE] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI)
)

CREATE TABLE dbo.edfi_StaffIdentificationSystemDescriptor_TrackedDelete
(
       StaffIdentificationSystemDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffIdentificationSystemDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (StaffIdentificationSystemDescriptorId)
)

CREATE TABLE dbo.edfi_StaffProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StaffUSI)
)

CREATE TABLE dbo.edfi_StaffSchoolAssociation_TrackedDelete
(
       ProgramAssignmentDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffSchoolAssociation_TrackedDelete PRIMARY KEY CLUSTERED (ProgramAssignmentDescriptorId, SchoolId, StaffUSI)
)

CREATE TABLE dbo.edfi_StaffSectionAssociation_TrackedDelete
(
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       StaffUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StaffSectionAssociation_TrackedDelete PRIMARY KEY CLUSTERED (ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StaffUSI, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_Staff_TrackedDelete
(
       StaffUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Staff_TrackedDelete PRIMARY KEY CLUSTERED (StaffUSI)
)

CREATE TABLE dbo.edfi_StateAbbreviationType_TrackedDelete
(
       StateAbbreviationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StateAbbreviationType_TrackedDelete PRIMARY KEY CLUSTERED (StateAbbreviationTypeId)
)

CREATE TABLE dbo.edfi_StateEducationAgency_TrackedDelete
(
       StateEducationAgencyId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StateEducationAgency_TrackedDelete PRIMARY KEY CLUSTERED (StateEducationAgencyId)
)

CREATE TABLE dbo.edfi_StudentAcademicRecord_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentAcademicRecord_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId)
)

CREATE TABLE dbo.edfi_StudentAssessment_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       AdministrationDate [DATE] NOT NULL,
       AssessedGradeLevelDescriptorId [INT] NOT NULL,
       AssessmentTitle [NVARCHAR](60) NOT NULL,
       StudentUSI [INT] NOT NULL,
       Version [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentAssessment_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, AdministrationDate, AssessedGradeLevelDescriptorId, AssessmentTitle, StudentUSI, Version)
)

CREATE TABLE dbo.edfi_StudentCTEProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentCTEProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentCharacteristicDescriptor_TrackedDelete
(
       StudentCharacteristicDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentCharacteristicDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (StudentCharacteristicDescriptorId)
)

CREATE TABLE dbo.edfi_StudentCohortAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       CohortIdentifier [NVARCHAR](20) NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentCohortAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentCompetencyObjective_TrackedDelete
(
       GradingPeriodBeginDate [DATE] NOT NULL,
       GradingPeriodDescriptorId [INT] NOT NULL,
       Objective [NVARCHAR](60) NOT NULL,
       ObjectiveEducationOrganizationId [INT] NOT NULL,
       ObjectiveGradeLevelDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentCompetencyObjective_TrackedDelete PRIMARY KEY CLUSTERED (GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentDisciplineIncidentAssociation_TrackedDelete
(
       IncidentIdentifier [NVARCHAR](20) NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentDisciplineIncidentAssociation_TrackedDelete PRIMARY KEY CLUSTERED (IncidentIdentifier, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentEducationOrganizationAssociation_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       ResponsibilityDescriptorId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentEducationOrganizationAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentGradebookEntry_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       DateAssigned [DATE] NOT NULL,
       GradebookEntryTitle [NVARCHAR](60) NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentGradebookEntry_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_StudentIdentificationSystemDescriptor_TrackedDelete
(
       StudentIdentificationSystemDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentIdentificationSystemDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (StudentIdentificationSystemDescriptorId)
)

CREATE TABLE dbo.edfi_StudentInterventionAssociation_TrackedDelete
(
       EducationOrganizationId [INT] NOT NULL,
       InterventionIdentificationCode [NVARCHAR](60) NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentInterventionAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EducationOrganizationId, InterventionIdentificationCode, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentInterventionAttendanceEvent_TrackedDelete
(
       AttendanceEventCategoryDescriptorId [INT] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       EventDate [DATE] NOT NULL,
       InterventionIdentificationCode [NVARCHAR](60) NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentInterventionAttendanceEvent_TrackedDelete PRIMARY KEY CLUSTERED (AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentLearningObjective_TrackedDelete
(
       AcademicSubjectDescriptorId [INT] NOT NULL,
       GradingPeriodBeginDate [DATE] NOT NULL,
       GradingPeriodDescriptorId [INT] NOT NULL,
       Objective [NVARCHAR](60) NOT NULL,
       ObjectiveGradeLevelDescriptorId [INT] NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentLearningObjective_TrackedDelete PRIMARY KEY CLUSTERED (AcademicSubjectDescriptorId, GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentMigrantEducationProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentMigrantEducationProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentParentAssociation_TrackedDelete
(
       ParentUSI [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentParentAssociation_TrackedDelete PRIMARY KEY CLUSTERED (ParentUSI, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentParticipationCodeType_TrackedDelete
(
       StudentParticipationCodeTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentParticipationCodeType_TrackedDelete PRIMARY KEY CLUSTERED (StudentParticipationCodeTypeId)
)

CREATE TABLE dbo.edfi_StudentProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentProgramAttendanceEvent_TrackedDelete
(
       AttendanceEventCategoryDescriptorId [INT] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       EventDate [DATE] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentProgramAttendanceEvent_TrackedDelete PRIMARY KEY CLUSTERED (AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentSchoolAssociation_TrackedDelete
(
       EntryDate [DATE] NOT NULL,
       SchoolId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentSchoolAssociation_TrackedDelete PRIMARY KEY CLUSTERED (EntryDate, SchoolId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentSchoolAttendanceEvent_TrackedDelete
(
       AttendanceEventCategoryDescriptorId [INT] NOT NULL,
       EventDate [DATE] NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentSchoolAttendanceEvent_TrackedDelete PRIMARY KEY CLUSTERED (AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, StudentUSI, TermDescriptorId)
)

CREATE TABLE dbo.edfi_StudentSectionAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentSectionAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_StudentSectionAttendanceEvent_TrackedDelete
(
       AttendanceEventCategoryDescriptorId [INT] NOT NULL,
       ClassPeriodName [NVARCHAR](20) NOT NULL,
       ClassroomIdentificationCode [NVARCHAR](20) NOT NULL,
       EventDate [DATE] NOT NULL,
       LocalCourseCode [NVARCHAR](60) NOT NULL,
       SchoolId [INT] NOT NULL,
       SchoolYear [SMALLINT] NOT NULL,
       SequenceOfCourse [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       TermDescriptorId [INT] NOT NULL,
       UniqueSectionCode [NVARCHAR](255) NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentSectionAttendanceEvent_TrackedDelete PRIMARY KEY CLUSTERED (AttendanceEventCategoryDescriptorId, ClassPeriodName, ClassroomIdentificationCode, EventDate, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode)
)

CREATE TABLE dbo.edfi_StudentSpecialEducationProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentSpecialEducationProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_StudentTitleIPartAProgramAssociation_TrackedDelete
(
       BeginDate [DATE] NOT NULL,
       EducationOrganizationId [INT] NOT NULL,
       ProgramEducationOrganizationId [INT] NOT NULL,
       ProgramName [NVARCHAR](60) NOT NULL,
       ProgramTypeId [INT] NOT NULL,
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_StudentTitleIPartAProgramAssociation_TrackedDelete PRIMARY KEY CLUSTERED (BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI)
)

CREATE TABLE dbo.edfi_Student_TrackedDelete
(
       StudentUSI [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_Student_TrackedDelete PRIMARY KEY CLUSTERED (StudentUSI)
)

CREATE TABLE dbo.edfi_TeachingCredentialBasisType_TrackedDelete
(
       TeachingCredentialBasisTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TeachingCredentialBasisType_TrackedDelete PRIMARY KEY CLUSTERED (TeachingCredentialBasisTypeId)
)

CREATE TABLE dbo.edfi_TeachingCredentialDescriptor_TrackedDelete
(
       TeachingCredentialDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TeachingCredentialDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (TeachingCredentialDescriptorId)
)

CREATE TABLE dbo.edfi_TelephoneNumberType_TrackedDelete
(
       TelephoneNumberTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TelephoneNumberType_TrackedDelete PRIMARY KEY CLUSTERED (TelephoneNumberTypeId)
)

CREATE TABLE dbo.edfi_TermDescriptor_TrackedDelete
(
       TermDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TermDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (TermDescriptorId)
)

CREATE TABLE dbo.edfi_TitleIPartAParticipantType_TrackedDelete
(
       TitleIPartAParticipantTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TitleIPartAParticipantType_TrackedDelete PRIMARY KEY CLUSTERED (TitleIPartAParticipantTypeId)
)

CREATE TABLE dbo.edfi_TitleIPartASchoolDesignationType_TrackedDelete
(
       TitleIPartASchoolDesignationTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_TitleIPartASchoolDesignationType_TrackedDelete PRIMARY KEY CLUSTERED (TitleIPartASchoolDesignationTypeId)
)

CREATE TABLE dbo.edfi_VisaType_TrackedDelete
(
       VisaTypeId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_VisaType_TrackedDelete PRIMARY KEY CLUSTERED (VisaTypeId)
)

CREATE TABLE dbo.edfi_WeaponDescriptor_TrackedDelete
(
       WeaponDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       SystemChangeVersion bigint NOT NULL,
       CONSTRAINT PK_edfi_WeaponDescriptor_TrackedDelete PRIMARY KEY CLUSTERED (WeaponDescriptorId)
)

