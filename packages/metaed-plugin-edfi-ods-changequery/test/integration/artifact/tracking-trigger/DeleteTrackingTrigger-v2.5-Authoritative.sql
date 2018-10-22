CREATE TRIGGER [edfi].[AcademicHonorCategoryTypeDeletedForTracking] ON [edfi].[AcademicHonorCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AcademicHonorCategoryType_TrackedDelete(AcademicHonorCategoryTypeId, Id, ChangeVersion)
    SELECT  AcademicHonorCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AcademicHonorCategoryType_TrackedDelete d2 WHERE d2.AcademicHonorCategoryTypeId = d.AcademicHonorCategoryTypeId)
END
GO

ALTER TABLE [edfi].[AcademicHonorCategoryType] ENABLE TRIGGER [AcademicHonorCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AcademicSubjectDescriptorDeletedForTracking] ON [edfi].[AcademicSubjectDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AcademicSubjectDescriptor_TrackedDelete(AcademicSubjectDescriptorId, Id, ChangeVersion)
    SELECT  d.AcademicSubjectDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AcademicSubjectDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AcademicSubjectDescriptor_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId)
END
GO

ALTER TABLE [edfi].[AcademicSubjectDescriptor] ENABLE TRIGGER [AcademicSubjectDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AcademicWeekDeletedForTracking] ON [edfi].[AcademicWeek] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AcademicWeek_TrackedDelete(SchoolId, WeekIdentifier, Id, ChangeVersion)
    SELECT  SchoolId, WeekIdentifier, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AcademicWeek_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId AND d2.WeekIdentifier = d.WeekIdentifier)
END
GO

ALTER TABLE [edfi].[AcademicWeek] ENABLE TRIGGER [AcademicWeekDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccommodationDescriptorDeletedForTracking] ON [edfi].[AccommodationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AccommodationDescriptor_TrackedDelete(AccommodationDescriptorId, Id, ChangeVersion)
    SELECT  d.AccommodationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AccommodationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AccommodationDescriptor_TrackedDelete d2 WHERE d2.AccommodationDescriptorId = d.AccommodationDescriptorId)
END
GO

ALTER TABLE [edfi].[AccommodationDescriptor] ENABLE TRIGGER [AccommodationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountCodeDescriptorDeletedForTracking] ON [edfi].[AccountCodeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AccountCodeDescriptor_TrackedDelete(AccountCodeDescriptorId, Id, ChangeVersion)
    SELECT  d.AccountCodeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AccountCodeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AccountCodeDescriptor_TrackedDelete d2 WHERE d2.AccountCodeDescriptorId = d.AccountCodeDescriptorId)
END
GO

ALTER TABLE [edfi].[AccountCodeDescriptor] ENABLE TRIGGER [AccountCodeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountDeletedForTracking] ON [edfi].[Account] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Account_TrackedDelete(AccountNumber, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountNumber, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Account_TrackedDelete d2 WHERE d2.AccountNumber = d.AccountNumber AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Account] ENABLE TRIGGER [AccountDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountabilityRatingDeletedForTracking] ON [edfi].[AccountabilityRating] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AccountabilityRating_TrackedDelete(EducationOrganizationId, RatingTitle, SchoolYear, Id, ChangeVersion)
    SELECT  EducationOrganizationId, RatingTitle, SchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AccountabilityRating_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.RatingTitle = d.RatingTitle AND d2.SchoolYear = d.SchoolYear)
END
GO

ALTER TABLE [edfi].[AccountabilityRating] ENABLE TRIGGER [AccountabilityRatingDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AchievementCategoryDescriptorDeletedForTracking] ON [edfi].[AchievementCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AchievementCategoryDescriptor_TrackedDelete(AchievementCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AchievementCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AchievementCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AchievementCategoryDescriptor_TrackedDelete d2 WHERE d2.AchievementCategoryDescriptorId = d.AchievementCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AchievementCategoryDescriptor] ENABLE TRIGGER [AchievementCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ActualDeletedForTracking] ON [edfi].[Actual] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Actual_TrackedDelete(AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Actual_TrackedDelete d2 WHERE d2.AccountNumber = d.AccountNumber AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Actual] ENABLE TRIGGER [ActualDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdditionalCreditTypeDeletedForTracking] ON [edfi].[AdditionalCreditType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AdditionalCreditType_TrackedDelete(AdditionalCreditTypeId, Id, ChangeVersion)
    SELECT  AdditionalCreditTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AdditionalCreditType_TrackedDelete d2 WHERE d2.AdditionalCreditTypeId = d.AdditionalCreditTypeId)
END
GO

ALTER TABLE [edfi].[AdditionalCreditType] ENABLE TRIGGER [AdditionalCreditTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AddressTypeDeletedForTracking] ON [edfi].[AddressType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AddressType_TrackedDelete(AddressTypeId, Id, ChangeVersion)
    SELECT  AddressTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AddressType_TrackedDelete d2 WHERE d2.AddressTypeId = d.AddressTypeId)
END
GO

ALTER TABLE [edfi].[AddressType] ENABLE TRIGGER [AddressTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdministrationEnvironmentTypeDeletedForTracking] ON [edfi].[AdministrationEnvironmentType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AdministrationEnvironmentType_TrackedDelete(AdministrationEnvironmentTypeId, Id, ChangeVersion)
    SELECT  AdministrationEnvironmentTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AdministrationEnvironmentType_TrackedDelete d2 WHERE d2.AdministrationEnvironmentTypeId = d.AdministrationEnvironmentTypeId)
END
GO

ALTER TABLE [edfi].[AdministrationEnvironmentType] ENABLE TRIGGER [AdministrationEnvironmentTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdministrativeFundingControlDescriptorDeletedForTracking] ON [edfi].[AdministrativeFundingControlDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AdministrativeFundingControlDescriptor_TrackedDelete(AdministrativeFundingControlDescriptorId, Id, ChangeVersion)
    SELECT  d.AdministrativeFundingControlDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AdministrativeFundingControlDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AdministrativeFundingControlDescriptor_TrackedDelete d2 WHERE d2.AdministrativeFundingControlDescriptorId = d.AdministrativeFundingControlDescriptorId)
END
GO

ALTER TABLE [edfi].[AdministrativeFundingControlDescriptor] ENABLE TRIGGER [AdministrativeFundingControlDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentCategoryDescriptorDeletedForTracking] ON [edfi].[AssessmentCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentCategoryDescriptor_TrackedDelete(AssessmentCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentCategoryDescriptor_TrackedDelete d2 WHERE d2.AssessmentCategoryDescriptorId = d.AssessmentCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentCategoryDescriptor] ENABLE TRIGGER [AssessmentCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentDeletedForTracking] ON [edfi].[Assessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Assessment_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, Version, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, Version, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Assessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.Version = d.Version)
END
GO

ALTER TABLE [edfi].[Assessment] ENABLE TRIGGER [AssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentFamilyDeletedForTracking] ON [edfi].[AssessmentFamily] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentFamily_TrackedDelete(AssessmentFamilyTitle, Id, ChangeVersion)
    SELECT  AssessmentFamilyTitle, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentFamily_TrackedDelete d2 WHERE d2.AssessmentFamilyTitle = d.AssessmentFamilyTitle)
END
GO

ALTER TABLE [edfi].[AssessmentFamily] ENABLE TRIGGER [AssessmentFamilyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[AssessmentIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete(AssessmentIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.AssessmentIdentificationSystemDescriptorId = d.AssessmentIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentIdentificationSystemDescriptor] ENABLE TRIGGER [AssessmentIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemCategoryTypeDeletedForTracking] ON [edfi].[AssessmentItemCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentItemCategoryType_TrackedDelete(AssessmentItemCategoryTypeId, Id, ChangeVersion)
    SELECT  AssessmentItemCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentItemCategoryType_TrackedDelete d2 WHERE d2.AssessmentItemCategoryTypeId = d.AssessmentItemCategoryTypeId)
END
GO

ALTER TABLE [edfi].[AssessmentItemCategoryType] ENABLE TRIGGER [AssessmentItemCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemDeletedForTracking] ON [edfi].[AssessmentItem] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentItem_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentItem_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.IdentificationCode = d.IdentificationCode AND d2.Version = d.Version)
END
GO

ALTER TABLE [edfi].[AssessmentItem] ENABLE TRIGGER [AssessmentItemDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemResultTypeDeletedForTracking] ON [edfi].[AssessmentItemResultType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentItemResultType_TrackedDelete(AssessmentItemResultTypeId, Id, ChangeVersion)
    SELECT  AssessmentItemResultTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentItemResultType_TrackedDelete d2 WHERE d2.AssessmentItemResultTypeId = d.AssessmentItemResultTypeId)
END
GO

ALTER TABLE [edfi].[AssessmentItemResultType] ENABLE TRIGGER [AssessmentItemResultTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentPeriodDescriptorDeletedForTracking] ON [edfi].[AssessmentPeriodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentPeriodDescriptor_TrackedDelete(AssessmentPeriodDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentPeriodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentPeriodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentPeriodDescriptor_TrackedDelete d2 WHERE d2.AssessmentPeriodDescriptorId = d.AssessmentPeriodDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentPeriodDescriptor] ENABLE TRIGGER [AssessmentPeriodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentReportingMethodTypeDeletedForTracking] ON [edfi].[AssessmentReportingMethodType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AssessmentReportingMethodType_TrackedDelete(AssessmentReportingMethodTypeId, Id, ChangeVersion)
    SELECT  AssessmentReportingMethodTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AssessmentReportingMethodType_TrackedDelete d2 WHERE d2.AssessmentReportingMethodTypeId = d.AssessmentReportingMethodTypeId)
END
GO

ALTER TABLE [edfi].[AssessmentReportingMethodType] ENABLE TRIGGER [AssessmentReportingMethodTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AttendanceEventCategoryDescriptorDeletedForTracking] ON [edfi].[AttendanceEventCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_AttendanceEventCategoryDescriptor_TrackedDelete(AttendanceEventCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AttendanceEventCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AttendanceEventCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_AttendanceEventCategoryDescriptor_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AttendanceEventCategoryDescriptor] ENABLE TRIGGER [AttendanceEventCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BehaviorDescriptorDeletedForTracking] ON [edfi].[BehaviorDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_BehaviorDescriptor_TrackedDelete(BehaviorDescriptorId, Id, ChangeVersion)
    SELECT  d.BehaviorDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.BehaviorDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_BehaviorDescriptor_TrackedDelete d2 WHERE d2.BehaviorDescriptorId = d.BehaviorDescriptorId)
END
GO

ALTER TABLE [edfi].[BehaviorDescriptor] ENABLE TRIGGER [BehaviorDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BellScheduleDeletedForTracking] ON [edfi].[BellSchedule] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_BellSchedule_TrackedDelete(BellScheduleName, Date, GradeLevelDescriptorId, SchoolId, Id, ChangeVersion)
    SELECT  BellScheduleName, Date, GradeLevelDescriptorId, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_BellSchedule_TrackedDelete d2 WHERE d2.BellScheduleName = d.BellScheduleName AND d2.Date = d.Date AND d2.GradeLevelDescriptorId = d.GradeLevelDescriptorId AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[BellSchedule] ENABLE TRIGGER [BellScheduleDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BudgetDeletedForTracking] ON [edfi].[Budget] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Budget_TrackedDelete(AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Budget_TrackedDelete d2 WHERE d2.AccountNumber = d.AccountNumber AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Budget] ENABLE TRIGGER [BudgetDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarDateDeletedForTracking] ON [edfi].[CalendarDate] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CalendarDate_TrackedDelete(Date, SchoolId, Id, ChangeVersion)
    SELECT  Date, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CalendarDate_TrackedDelete d2 WHERE d2.Date = d.Date AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[CalendarDate] ENABLE TRIGGER [CalendarDateDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarEventDescriptorDeletedForTracking] ON [edfi].[CalendarEventDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CalendarEventDescriptor_TrackedDelete(CalendarEventDescriptorId, Id, ChangeVersion)
    SELECT  d.CalendarEventDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CalendarEventDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CalendarEventDescriptor_TrackedDelete d2 WHERE d2.CalendarEventDescriptorId = d.CalendarEventDescriptorId)
END
GO

ALTER TABLE [edfi].[CalendarEventDescriptor] ENABLE TRIGGER [CalendarEventDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CareerPathwayTypeDeletedForTracking] ON [edfi].[CareerPathwayType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CareerPathwayType_TrackedDelete(CareerPathwayTypeId, Id, ChangeVersion)
    SELECT  CareerPathwayTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CareerPathwayType_TrackedDelete d2 WHERE d2.CareerPathwayTypeId = d.CareerPathwayTypeId)
END
GO

ALTER TABLE [edfi].[CareerPathwayType] ENABLE TRIGGER [CareerPathwayTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CharterApprovalAgencyTypeDeletedForTracking] ON [edfi].[CharterApprovalAgencyType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CharterApprovalAgencyType_TrackedDelete(CharterApprovalAgencyTypeId, Id, ChangeVersion)
    SELECT  CharterApprovalAgencyTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CharterApprovalAgencyType_TrackedDelete d2 WHERE d2.CharterApprovalAgencyTypeId = d.CharterApprovalAgencyTypeId)
END
GO

ALTER TABLE [edfi].[CharterApprovalAgencyType] ENABLE TRIGGER [CharterApprovalAgencyTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CharterStatusTypeDeletedForTracking] ON [edfi].[CharterStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CharterStatusType_TrackedDelete(CharterStatusTypeId, Id, ChangeVersion)
    SELECT  CharterStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CharterStatusType_TrackedDelete d2 WHERE d2.CharterStatusTypeId = d.CharterStatusTypeId)
END
GO

ALTER TABLE [edfi].[CharterStatusType] ENABLE TRIGGER [CharterStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CitizenshipStatusTypeDeletedForTracking] ON [edfi].[CitizenshipStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CitizenshipStatusType_TrackedDelete(CitizenshipStatusTypeId, Id, ChangeVersion)
    SELECT  CitizenshipStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CitizenshipStatusType_TrackedDelete d2 WHERE d2.CitizenshipStatusTypeId = d.CitizenshipStatusTypeId)
END
GO

ALTER TABLE [edfi].[CitizenshipStatusType] ENABLE TRIGGER [CitizenshipStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ClassPeriodDeletedForTracking] ON [edfi].[ClassPeriod] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ClassPeriod_TrackedDelete(ClassPeriodName, SchoolId, Id, ChangeVersion)
    SELECT  ClassPeriodName, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ClassPeriod_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[ClassPeriod] ENABLE TRIGGER [ClassPeriodDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ClassroomPositionDescriptorDeletedForTracking] ON [edfi].[ClassroomPositionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ClassroomPositionDescriptor_TrackedDelete(ClassroomPositionDescriptorId, Id, ChangeVersion)
    SELECT  d.ClassroomPositionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ClassroomPositionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ClassroomPositionDescriptor_TrackedDelete d2 WHERE d2.ClassroomPositionDescriptorId = d.ClassroomPositionDescriptorId)
END
GO

ALTER TABLE [edfi].[ClassroomPositionDescriptor] ENABLE TRIGGER [ClassroomPositionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortDeletedForTracking] ON [edfi].[Cohort] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Cohort_TrackedDelete(CohortIdentifier, EducationOrganizationId, Id, ChangeVersion)
    SELECT  CohortIdentifier, EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Cohort_TrackedDelete d2 WHERE d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[Cohort] ENABLE TRIGGER [CohortDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortScopeTypeDeletedForTracking] ON [edfi].[CohortScopeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CohortScopeType_TrackedDelete(CohortScopeTypeId, Id, ChangeVersion)
    SELECT  CohortScopeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CohortScopeType_TrackedDelete d2 WHERE d2.CohortScopeTypeId = d.CohortScopeTypeId)
END
GO

ALTER TABLE [edfi].[CohortScopeType] ENABLE TRIGGER [CohortScopeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortTypeDeletedForTracking] ON [edfi].[CohortType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CohortType_TrackedDelete(CohortTypeId, Id, ChangeVersion)
    SELECT  CohortTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CohortType_TrackedDelete d2 WHERE d2.CohortTypeId = d.CohortTypeId)
END
GO

ALTER TABLE [edfi].[CohortType] ENABLE TRIGGER [CohortTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortYearTypeDeletedForTracking] ON [edfi].[CohortYearType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CohortYearType_TrackedDelete(CohortYearTypeId, Id, ChangeVersion)
    SELECT  CohortYearTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CohortYearType_TrackedDelete d2 WHERE d2.CohortYearTypeId = d.CohortYearTypeId)
END
GO

ALTER TABLE [edfi].[CohortYearType] ENABLE TRIGGER [CohortYearTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CompetencyLevelDescriptorDeletedForTracking] ON [edfi].[CompetencyLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CompetencyLevelDescriptor_TrackedDelete(CompetencyLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.CompetencyLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CompetencyLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CompetencyLevelDescriptor_TrackedDelete d2 WHERE d2.CompetencyLevelDescriptorId = d.CompetencyLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[CompetencyLevelDescriptor] ENABLE TRIGGER [CompetencyLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CompetencyObjectiveDeletedForTracking] ON [edfi].[CompetencyObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CompetencyObjective_TrackedDelete(EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CompetencyObjective_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[CompetencyObjective] ENABLE TRIGGER [CompetencyObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContentClassTypeDeletedForTracking] ON [edfi].[ContentClassType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ContentClassType_TrackedDelete(ContentClassTypeId, Id, ChangeVersion)
    SELECT  ContentClassTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ContentClassType_TrackedDelete d2 WHERE d2.ContentClassTypeId = d.ContentClassTypeId)
END
GO

ALTER TABLE [edfi].[ContentClassType] ENABLE TRIGGER [ContentClassTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContinuationOfServicesReasonDescriptorDeletedForTracking] ON [edfi].[ContinuationOfServicesReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete(ContinuationOfServicesReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.ContinuationOfServicesReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ContinuationOfServicesReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete d2 WHERE d2.ContinuationOfServicesReasonDescriptorId = d.ContinuationOfServicesReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[ContinuationOfServicesReasonDescriptor] ENABLE TRIGGER [ContinuationOfServicesReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContractedStaffDeletedForTracking] ON [edfi].[ContractedStaff] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ContractedStaff_TrackedDelete(AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    SELECT  AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ContractedStaff_TrackedDelete d2 WHERE d2.AccountNumber = d.AccountNumber AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[ContractedStaff] ENABLE TRIGGER [ContractedStaffDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CostRateTypeDeletedForTracking] ON [edfi].[CostRateType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CostRateType_TrackedDelete(CostRateTypeId, Id, ChangeVersion)
    SELECT  CostRateTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CostRateType_TrackedDelete d2 WHERE d2.CostRateTypeId = d.CostRateTypeId)
END
GO

ALTER TABLE [edfi].[CostRateType] ENABLE TRIGGER [CostRateTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CountryDescriptorDeletedForTracking] ON [edfi].[CountryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CountryDescriptor_TrackedDelete(CountryDescriptorId, Id, ChangeVersion)
    SELECT  d.CountryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CountryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CountryDescriptor_TrackedDelete d2 WHERE d2.CountryDescriptorId = d.CountryDescriptorId)
END
GO

ALTER TABLE [edfi].[CountryDescriptor] ENABLE TRIGGER [CountryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseAttemptResultTypeDeletedForTracking] ON [edfi].[CourseAttemptResultType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseAttemptResultType_TrackedDelete(CourseAttemptResultTypeId, Id, ChangeVersion)
    SELECT  CourseAttemptResultTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseAttemptResultType_TrackedDelete d2 WHERE d2.CourseAttemptResultTypeId = d.CourseAttemptResultTypeId)
END
GO

ALTER TABLE [edfi].[CourseAttemptResultType] ENABLE TRIGGER [CourseAttemptResultTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseDefinedByTypeDeletedForTracking] ON [edfi].[CourseDefinedByType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseDefinedByType_TrackedDelete(CourseDefinedByTypeId, Id, ChangeVersion)
    SELECT  CourseDefinedByTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseDefinedByType_TrackedDelete d2 WHERE d2.CourseDefinedByTypeId = d.CourseDefinedByTypeId)
END
GO

ALTER TABLE [edfi].[CourseDefinedByType] ENABLE TRIGGER [CourseDefinedByTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseDeletedForTracking] ON [edfi].[Course] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Course_TrackedDelete(CourseCode, EducationOrganizationId, Id, ChangeVersion)
    SELECT  CourseCode, EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Course_TrackedDelete d2 WHERE d2.CourseCode = d.CourseCode AND d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[Course] ENABLE TRIGGER [CourseDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseGPAApplicabilityTypeDeletedForTracking] ON [edfi].[CourseGPAApplicabilityType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseGPAApplicabilityType_TrackedDelete(CourseGPAApplicabilityTypeId, Id, ChangeVersion)
    SELECT  CourseGPAApplicabilityTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseGPAApplicabilityType_TrackedDelete d2 WHERE d2.CourseGPAApplicabilityTypeId = d.CourseGPAApplicabilityTypeId)
END
GO

ALTER TABLE [edfi].[CourseGPAApplicabilityType] ENABLE TRIGGER [CourseGPAApplicabilityTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[CourseIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseIdentificationSystemDescriptor_TrackedDelete(CourseIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.CourseIdentificationSystemDescriptorId = d.CourseIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseIdentificationSystemDescriptor] ENABLE TRIGGER [CourseIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseLevelCharacteristicTypeDeletedForTracking] ON [edfi].[CourseLevelCharacteristicType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseLevelCharacteristicType_TrackedDelete(CourseLevelCharacteristicTypeId, Id, ChangeVersion)
    SELECT  CourseLevelCharacteristicTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseLevelCharacteristicType_TrackedDelete d2 WHERE d2.CourseLevelCharacteristicTypeId = d.CourseLevelCharacteristicTypeId)
END
GO

ALTER TABLE [edfi].[CourseLevelCharacteristicType] ENABLE TRIGGER [CourseLevelCharacteristicTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseOfferingDeletedForTracking] ON [edfi].[CourseOffering] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseOffering_TrackedDelete(LocalCourseCode, SchoolId, SchoolYear, TermDescriptorId, Id, ChangeVersion)
    SELECT  LocalCourseCode, SchoolId, SchoolYear, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseOffering_TrackedDelete d2 WHERE d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseOffering] ENABLE TRIGGER [CourseOfferingDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseRepeatCodeTypeDeletedForTracking] ON [edfi].[CourseRepeatCodeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseRepeatCodeType_TrackedDelete(CourseRepeatCodeTypeId, Id, ChangeVersion)
    SELECT  CourseRepeatCodeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseRepeatCodeType_TrackedDelete d2 WHERE d2.CourseRepeatCodeTypeId = d.CourseRepeatCodeTypeId)
END
GO

ALTER TABLE [edfi].[CourseRepeatCodeType] ENABLE TRIGGER [CourseRepeatCodeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseTranscriptDeletedForTracking] ON [edfi].[CourseTranscript] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CourseTranscript_TrackedDelete(CourseAttemptResultTypeId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    SELECT  CourseAttemptResultTypeId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CourseTranscript_TrackedDelete d2 WHERE d2.CourseAttemptResultTypeId = d.CourseAttemptResultTypeId AND d2.CourseCode = d.CourseCode AND d2.CourseEducationOrganizationId = d.CourseEducationOrganizationId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.SchoolYear = d.SchoolYear AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseTranscript] ENABLE TRIGGER [CourseTranscriptDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CredentialFieldDescriptorDeletedForTracking] ON [edfi].[CredentialFieldDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CredentialFieldDescriptor_TrackedDelete(CredentialFieldDescriptorId, Id, ChangeVersion)
    SELECT  d.CredentialFieldDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CredentialFieldDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CredentialFieldDescriptor_TrackedDelete d2 WHERE d2.CredentialFieldDescriptorId = d.CredentialFieldDescriptorId)
END
GO

ALTER TABLE [edfi].[CredentialFieldDescriptor] ENABLE TRIGGER [CredentialFieldDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CredentialTypeDeletedForTracking] ON [edfi].[CredentialType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CredentialType_TrackedDelete(CredentialTypeId, Id, ChangeVersion)
    SELECT  CredentialTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CredentialType_TrackedDelete d2 WHERE d2.CredentialTypeId = d.CredentialTypeId)
END
GO

ALTER TABLE [edfi].[CredentialType] ENABLE TRIGGER [CredentialTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CreditTypeDeletedForTracking] ON [edfi].[CreditType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CreditType_TrackedDelete(CreditTypeId, Id, ChangeVersion)
    SELECT  CreditTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CreditType_TrackedDelete d2 WHERE d2.CreditTypeId = d.CreditTypeId)
END
GO

ALTER TABLE [edfi].[CreditType] ENABLE TRIGGER [CreditTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CurriculumUsedTypeDeletedForTracking] ON [edfi].[CurriculumUsedType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_CurriculumUsedType_TrackedDelete(CurriculumUsedTypeId, Id, ChangeVersion)
    SELECT  CurriculumUsedTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_CurriculumUsedType_TrackedDelete d2 WHERE d2.CurriculumUsedTypeId = d.CurriculumUsedTypeId)
END
GO

ALTER TABLE [edfi].[CurriculumUsedType] ENABLE TRIGGER [CurriculumUsedTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DeliveryMethodTypeDeletedForTracking] ON [edfi].[DeliveryMethodType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DeliveryMethodType_TrackedDelete(DeliveryMethodTypeId, Id, ChangeVersion)
    SELECT  DeliveryMethodTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DeliveryMethodType_TrackedDelete d2 WHERE d2.DeliveryMethodTypeId = d.DeliveryMethodTypeId)
END
GO

ALTER TABLE [edfi].[DeliveryMethodType] ENABLE TRIGGER [DeliveryMethodTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DescriptorDeletedForTracking] ON [edfi].[Descriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Descriptor_TrackedDelete(DescriptorId, Id, ChangeVersion)
    SELECT  DescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Descriptor_TrackedDelete d2 WHERE d2.DescriptorId = d.DescriptorId)
END
GO

ALTER TABLE [edfi].[Descriptor] ENABLE TRIGGER [DescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiagnosisDescriptorDeletedForTracking] ON [edfi].[DiagnosisDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DiagnosisDescriptor_TrackedDelete(DiagnosisDescriptorId, Id, ChangeVersion)
    SELECT  d.DiagnosisDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DiagnosisDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DiagnosisDescriptor_TrackedDelete d2 WHERE d2.DiagnosisDescriptorId = d.DiagnosisDescriptorId)
END
GO

ALTER TABLE [edfi].[DiagnosisDescriptor] ENABLE TRIGGER [DiagnosisDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiplomaLevelTypeDeletedForTracking] ON [edfi].[DiplomaLevelType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DiplomaLevelType_TrackedDelete(DiplomaLevelTypeId, Id, ChangeVersion)
    SELECT  DiplomaLevelTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DiplomaLevelType_TrackedDelete d2 WHERE d2.DiplomaLevelTypeId = d.DiplomaLevelTypeId)
END
GO

ALTER TABLE [edfi].[DiplomaLevelType] ENABLE TRIGGER [DiplomaLevelTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiplomaTypeDeletedForTracking] ON [edfi].[DiplomaType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DiplomaType_TrackedDelete(DiplomaTypeId, Id, ChangeVersion)
    SELECT  DiplomaTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DiplomaType_TrackedDelete d2 WHERE d2.DiplomaTypeId = d.DiplomaTypeId)
END
GO

ALTER TABLE [edfi].[DiplomaType] ENABLE TRIGGER [DiplomaTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityCategoryTypeDeletedForTracking] ON [edfi].[DisabilityCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisabilityCategoryType_TrackedDelete(DisabilityCategoryTypeId, Id, ChangeVersion)
    SELECT  DisabilityCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisabilityCategoryType_TrackedDelete d2 WHERE d2.DisabilityCategoryTypeId = d.DisabilityCategoryTypeId)
END
GO

ALTER TABLE [edfi].[DisabilityCategoryType] ENABLE TRIGGER [DisabilityCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityDescriptorDeletedForTracking] ON [edfi].[DisabilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisabilityDescriptor_TrackedDelete(DisabilityDescriptorId, Id, ChangeVersion)
    SELECT  d.DisabilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisabilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisabilityDescriptor_TrackedDelete d2 WHERE d2.DisabilityDescriptorId = d.DisabilityDescriptorId)
END
GO

ALTER TABLE [edfi].[DisabilityDescriptor] ENABLE TRIGGER [DisabilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityDeterminationSourceTypeDeletedForTracking] ON [edfi].[DisabilityDeterminationSourceType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisabilityDeterminationSourceType_TrackedDelete(DisabilityDeterminationSourceTypeId, Id, ChangeVersion)
    SELECT  DisabilityDeterminationSourceTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisabilityDeterminationSourceType_TrackedDelete d2 WHERE d2.DisabilityDeterminationSourceTypeId = d.DisabilityDeterminationSourceTypeId)
END
GO

ALTER TABLE [edfi].[DisabilityDeterminationSourceType] ENABLE TRIGGER [DisabilityDeterminationSourceTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineActionDeletedForTracking] ON [edfi].[DisciplineAction] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisciplineAction_TrackedDelete(DisciplineActionIdentifier, DisciplineDate, StudentUSI, Id, ChangeVersion)
    SELECT  DisciplineActionIdentifier, DisciplineDate, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisciplineAction_TrackedDelete d2 WHERE d2.DisciplineActionIdentifier = d.DisciplineActionIdentifier AND d2.DisciplineDate = d.DisciplineDate AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[DisciplineAction] ENABLE TRIGGER [DisciplineActionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineActionLengthDifferenceReasonTypeDeletedForTracking] ON [edfi].[DisciplineActionLengthDifferenceReasonType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisciplineActionLengthDifferenceReasonType_TrackedDelete(DisciplineActionLengthDifferenceReasonTypeId, Id, ChangeVersion)
    SELECT  DisciplineActionLengthDifferenceReasonTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisciplineActionLengthDifferenceReasonType_TrackedDelete d2 WHERE d2.DisciplineActionLengthDifferenceReasonTypeId = d.DisciplineActionLengthDifferenceReasonTypeId)
END
GO

ALTER TABLE [edfi].[DisciplineActionLengthDifferenceReasonType] ENABLE TRIGGER [DisciplineActionLengthDifferenceReasonTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineDescriptorDeletedForTracking] ON [edfi].[DisciplineDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisciplineDescriptor_TrackedDelete(DisciplineDescriptorId, Id, ChangeVersion)
    SELECT  d.DisciplineDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisciplineDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisciplineDescriptor_TrackedDelete d2 WHERE d2.DisciplineDescriptorId = d.DisciplineDescriptorId)
END
GO

ALTER TABLE [edfi].[DisciplineDescriptor] ENABLE TRIGGER [DisciplineDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineIncidentDeletedForTracking] ON [edfi].[DisciplineIncident] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_DisciplineIncident_TrackedDelete(IncidentIdentifier, SchoolId, Id, ChangeVersion)
    SELECT  IncidentIdentifier, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_DisciplineIncident_TrackedDelete d2 WHERE d2.IncidentIdentifier = d.IncidentIdentifier AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[DisciplineIncident] ENABLE TRIGGER [DisciplineIncidentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationContentDeletedForTracking] ON [edfi].[EducationContent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationContent_TrackedDelete(ContentIdentifier, Id, ChangeVersion)
    SELECT  ContentIdentifier, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationContent_TrackedDelete d2 WHERE d2.ContentIdentifier = d.ContentIdentifier)
END
GO

ALTER TABLE [edfi].[EducationContent] ENABLE TRIGGER [EducationContentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationCategoryTypeDeletedForTracking] ON [edfi].[EducationOrganizationCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationCategoryType_TrackedDelete(EducationOrganizationCategoryTypeId, Id, ChangeVersion)
    SELECT  EducationOrganizationCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationCategoryType_TrackedDelete d2 WHERE d2.EducationOrganizationCategoryTypeId = d.EducationOrganizationCategoryTypeId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationCategoryType] ENABLE TRIGGER [EducationOrganizationCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationDeletedForTracking] ON [edfi].[EducationOrganization] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganization_TrackedDelete(EducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganization_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganization] ENABLE TRIGGER [EducationOrganizationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[EducationOrganizationIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete(EducationOrganizationIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.EducationOrganizationIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EducationOrganizationIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.EducationOrganizationIdentificationSystemDescriptorId = d.EducationOrganizationIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationIdentificationSystemDescriptor] ENABLE TRIGGER [EducationOrganizationIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationInterventionPrescriptionAssociationDeletedForTracking] ON [edfi].[EducationOrganizationInterventionPrescriptionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete(EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionPrescriptionEducationOrganizationId = d.InterventionPrescriptionEducationOrganizationId AND d2.InterventionPrescriptionIdentificationCode = d.InterventionPrescriptionIdentificationCode)
END
GO

ALTER TABLE [edfi].[EducationOrganizationInterventionPrescriptionAssociation] ENABLE TRIGGER [EducationOrganizationInterventionPrescriptionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationNetworkAssociationDeletedForTracking] ON [edfi].[EducationOrganizationNetworkAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationNetworkAssociation_TrackedDelete(EducationOrganizationNetworkId, MemberEducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationNetworkId, MemberEducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationNetworkAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationNetworkId = d.EducationOrganizationNetworkId AND d2.MemberEducationOrganizationId = d.MemberEducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationNetworkAssociation] ENABLE TRIGGER [EducationOrganizationNetworkAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationNetworkDeletedForTracking] ON [edfi].[EducationOrganizationNetwork] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationNetwork_TrackedDelete(EducationOrganizationNetworkId, Id, ChangeVersion)
    SELECT  d.EducationOrganizationNetworkId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.EducationOrganizationNetworkId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationNetwork_TrackedDelete d2 WHERE d2.EducationOrganizationNetworkId = d.EducationOrganizationNetworkId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationNetwork] ENABLE TRIGGER [EducationOrganizationNetworkDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationPeerAssociationDeletedForTracking] ON [edfi].[EducationOrganizationPeerAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationOrganizationPeerAssociation_TrackedDelete(EducationOrganizationId, PeerEducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, PeerEducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationOrganizationPeerAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.PeerEducationOrganizationId = d.PeerEducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationPeerAssociation] ENABLE TRIGGER [EducationOrganizationPeerAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationPlanTypeDeletedForTracking] ON [edfi].[EducationPlanType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationPlanType_TrackedDelete(EducationPlanTypeId, Id, ChangeVersion)
    SELECT  EducationPlanTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationPlanType_TrackedDelete d2 WHERE d2.EducationPlanTypeId = d.EducationPlanTypeId)
END
GO

ALTER TABLE [edfi].[EducationPlanType] ENABLE TRIGGER [EducationPlanTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationServiceCenterDeletedForTracking] ON [edfi].[EducationServiceCenter] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationServiceCenter_TrackedDelete(EducationServiceCenterId, Id, ChangeVersion)
    SELECT  d.EducationServiceCenterId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.EducationServiceCenterId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationServiceCenter_TrackedDelete d2 WHERE d2.EducationServiceCenterId = d.EducationServiceCenterId)
END
GO

ALTER TABLE [edfi].[EducationServiceCenter] ENABLE TRIGGER [EducationServiceCenterDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationalEnvironmentTypeDeletedForTracking] ON [edfi].[EducationalEnvironmentType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EducationalEnvironmentType_TrackedDelete(EducationalEnvironmentTypeId, Id, ChangeVersion)
    SELECT  EducationalEnvironmentTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EducationalEnvironmentType_TrackedDelete d2 WHERE d2.EducationalEnvironmentTypeId = d.EducationalEnvironmentTypeId)
END
GO

ALTER TABLE [edfi].[EducationalEnvironmentType] ENABLE TRIGGER [EducationalEnvironmentTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ElectronicMailTypeDeletedForTracking] ON [edfi].[ElectronicMailType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ElectronicMailType_TrackedDelete(ElectronicMailTypeId, Id, ChangeVersion)
    SELECT  ElectronicMailTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ElectronicMailType_TrackedDelete d2 WHERE d2.ElectronicMailTypeId = d.ElectronicMailTypeId)
END
GO

ALTER TABLE [edfi].[ElectronicMailType] ENABLE TRIGGER [ElectronicMailTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EmploymentStatusDescriptorDeletedForTracking] ON [edfi].[EmploymentStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EmploymentStatusDescriptor_TrackedDelete(EmploymentStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.EmploymentStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EmploymentStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EmploymentStatusDescriptor_TrackedDelete d2 WHERE d2.EmploymentStatusDescriptorId = d.EmploymentStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[EmploymentStatusDescriptor] ENABLE TRIGGER [EmploymentStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EntryGradeLevelReasonTypeDeletedForTracking] ON [edfi].[EntryGradeLevelReasonType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EntryGradeLevelReasonType_TrackedDelete(EntryGradeLevelReasonTypeId, Id, ChangeVersion)
    SELECT  EntryGradeLevelReasonTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EntryGradeLevelReasonType_TrackedDelete d2 WHERE d2.EntryGradeLevelReasonTypeId = d.EntryGradeLevelReasonTypeId)
END
GO

ALTER TABLE [edfi].[EntryGradeLevelReasonType] ENABLE TRIGGER [EntryGradeLevelReasonTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EntryTypeDescriptorDeletedForTracking] ON [edfi].[EntryTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EntryTypeDescriptor_TrackedDelete(EntryTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.EntryTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EntryTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EntryTypeDescriptor_TrackedDelete d2 WHERE d2.EntryTypeDescriptorId = d.EntryTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[EntryTypeDescriptor] ENABLE TRIGGER [EntryTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EventCircumstanceTypeDeletedForTracking] ON [edfi].[EventCircumstanceType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_EventCircumstanceType_TrackedDelete(EventCircumstanceTypeId, Id, ChangeVersion)
    SELECT  EventCircumstanceTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_EventCircumstanceType_TrackedDelete d2 WHERE d2.EventCircumstanceTypeId = d.EventCircumstanceTypeId)
END
GO

ALTER TABLE [edfi].[EventCircumstanceType] ENABLE TRIGGER [EventCircumstanceTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ExitWithdrawTypeDescriptorDeletedForTracking] ON [edfi].[ExitWithdrawTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ExitWithdrawTypeDescriptor_TrackedDelete(ExitWithdrawTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ExitWithdrawTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ExitWithdrawTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ExitWithdrawTypeDescriptor_TrackedDelete d2 WHERE d2.ExitWithdrawTypeDescriptorId = d.ExitWithdrawTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ExitWithdrawTypeDescriptor] ENABLE TRIGGER [ExitWithdrawTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[FeederSchoolAssociationDeletedForTracking] ON [edfi].[FeederSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_FeederSchoolAssociation_TrackedDelete(BeginDate, FeederSchoolId, SchoolId, Id, ChangeVersion)
    SELECT  BeginDate, FeederSchoolId, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_FeederSchoolAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.FeederSchoolId = d.FeederSchoolId AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[FeederSchoolAssociation] ENABLE TRIGGER [FeederSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeDeletedForTracking] ON [edfi].[Grade] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Grade_TrackedDelete(BeginDate, ClassPeriodName, ClassroomIdentificationCode, GradeTypeId, GradingPeriodBeginDate, GradingPeriodDescriptorId, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  BeginDate, ClassPeriodName, ClassroomIdentificationCode, GradeTypeId, GradingPeriodBeginDate, GradingPeriodDescriptorId, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Grade_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.GradeTypeId = d.GradeTypeId AND d2.GradingPeriodBeginDate = d.GradingPeriodBeginDate AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[Grade] ENABLE TRIGGER [GradeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeLevelDescriptorDeletedForTracking] ON [edfi].[GradeLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradeLevelDescriptor_TrackedDelete(GradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.GradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradeLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradeLevelDescriptor_TrackedDelete d2 WHERE d2.GradeLevelDescriptorId = d.GradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[GradeLevelDescriptor] ENABLE TRIGGER [GradeLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeTypeDeletedForTracking] ON [edfi].[GradeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradeType_TrackedDelete(GradeTypeId, Id, ChangeVersion)
    SELECT  GradeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradeType_TrackedDelete d2 WHERE d2.GradeTypeId = d.GradeTypeId)
END
GO

ALTER TABLE [edfi].[GradeType] ENABLE TRIGGER [GradeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradebookEntryDeletedForTracking] ON [edfi].[GradebookEntry] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradebookEntry_TrackedDelete(ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradebookEntry_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.DateAssigned = d.DateAssigned AND d2.GradebookEntryTitle = d.GradebookEntryTitle AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[GradebookEntry] ENABLE TRIGGER [GradebookEntryDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradebookEntryTypeDeletedForTracking] ON [edfi].[GradebookEntryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradebookEntryType_TrackedDelete(GradebookEntryTypeId, Id, ChangeVersion)
    SELECT  GradebookEntryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradebookEntryType_TrackedDelete d2 WHERE d2.GradebookEntryTypeId = d.GradebookEntryTypeId)
END
GO

ALTER TABLE [edfi].[GradebookEntryType] ENABLE TRIGGER [GradebookEntryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradingPeriodDeletedForTracking] ON [edfi].[GradingPeriod] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradingPeriod_TrackedDelete(BeginDate, GradingPeriodDescriptorId, SchoolId, Id, ChangeVersion)
    SELECT  BeginDate, GradingPeriodDescriptorId, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradingPeriod_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[GradingPeriod] ENABLE TRIGGER [GradingPeriodDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradingPeriodDescriptorDeletedForTracking] ON [edfi].[GradingPeriodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GradingPeriodDescriptor_TrackedDelete(GradingPeriodDescriptorId, Id, ChangeVersion)
    SELECT  d.GradingPeriodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradingPeriodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GradingPeriodDescriptor_TrackedDelete d2 WHERE d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId)
END
GO

ALTER TABLE [edfi].[GradingPeriodDescriptor] ENABLE TRIGGER [GradingPeriodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GraduationPlanDeletedForTracking] ON [edfi].[GraduationPlan] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GraduationPlan_TrackedDelete(EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear, Id, ChangeVersion)
    SELECT  EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GraduationPlan_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.GraduationPlanTypeDescriptorId = d.GraduationPlanTypeDescriptorId AND d2.GraduationSchoolYear = d.GraduationSchoolYear)
END
GO

ALTER TABLE [edfi].[GraduationPlan] ENABLE TRIGGER [GraduationPlanDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GraduationPlanTypeDescriptorDeletedForTracking] ON [edfi].[GraduationPlanTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GraduationPlanTypeDescriptor_TrackedDelete(GraduationPlanTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.GraduationPlanTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GraduationPlanTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GraduationPlanTypeDescriptor_TrackedDelete d2 WHERE d2.GraduationPlanTypeDescriptorId = d.GraduationPlanTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[GraduationPlanTypeDescriptor] ENABLE TRIGGER [GraduationPlanTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GunFreeSchoolsActReportingStatusTypeDeletedForTracking] ON [edfi].[GunFreeSchoolsActReportingStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_GunFreeSchoolsActReportingStatusType_TrackedDelete(GunFreeSchoolsActReportingStatusTypeId, Id, ChangeVersion)
    SELECT  GunFreeSchoolsActReportingStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_GunFreeSchoolsActReportingStatusType_TrackedDelete d2 WHERE d2.GunFreeSchoolsActReportingStatusTypeId = d.GunFreeSchoolsActReportingStatusTypeId)
END
GO

ALTER TABLE [edfi].[GunFreeSchoolsActReportingStatusType] ENABLE TRIGGER [GunFreeSchoolsActReportingStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[IdentificationDocumentUseTypeDeletedForTracking] ON [edfi].[IdentificationDocumentUseType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_IdentificationDocumentUseType_TrackedDelete(IdentificationDocumentUseTypeId, Id, ChangeVersion)
    SELECT  IdentificationDocumentUseTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_IdentificationDocumentUseType_TrackedDelete d2 WHERE d2.IdentificationDocumentUseTypeId = d.IdentificationDocumentUseTypeId)
END
GO

ALTER TABLE [edfi].[IdentificationDocumentUseType] ENABLE TRIGGER [IdentificationDocumentUseTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[IncidentLocationTypeDeletedForTracking] ON [edfi].[IncidentLocationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_IncidentLocationType_TrackedDelete(IncidentLocationTypeId, Id, ChangeVersion)
    SELECT  IncidentLocationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_IncidentLocationType_TrackedDelete d2 WHERE d2.IncidentLocationTypeId = d.IncidentLocationTypeId)
END
GO

ALTER TABLE [edfi].[IncidentLocationType] ENABLE TRIGGER [IncidentLocationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InstitutionTelephoneNumberTypeDeletedForTracking] ON [edfi].[InstitutionTelephoneNumberType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InstitutionTelephoneNumberType_TrackedDelete(InstitutionTelephoneNumberTypeId, Id, ChangeVersion)
    SELECT  InstitutionTelephoneNumberTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InstitutionTelephoneNumberType_TrackedDelete d2 WHERE d2.InstitutionTelephoneNumberTypeId = d.InstitutionTelephoneNumberTypeId)
END
GO

ALTER TABLE [edfi].[InstitutionTelephoneNumberType] ENABLE TRIGGER [InstitutionTelephoneNumberTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[IntegratedTechnologyStatusTypeDeletedForTracking] ON [edfi].[IntegratedTechnologyStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_IntegratedTechnologyStatusType_TrackedDelete(IntegratedTechnologyStatusTypeId, Id, ChangeVersion)
    SELECT  IntegratedTechnologyStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_IntegratedTechnologyStatusType_TrackedDelete d2 WHERE d2.IntegratedTechnologyStatusTypeId = d.IntegratedTechnologyStatusTypeId)
END
GO

ALTER TABLE [edfi].[IntegratedTechnologyStatusType] ENABLE TRIGGER [IntegratedTechnologyStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InteractivityStyleTypeDeletedForTracking] ON [edfi].[InteractivityStyleType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InteractivityStyleType_TrackedDelete(InteractivityStyleTypeId, Id, ChangeVersion)
    SELECT  InteractivityStyleTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InteractivityStyleType_TrackedDelete d2 WHERE d2.InteractivityStyleTypeId = d.InteractivityStyleTypeId)
END
GO

ALTER TABLE [edfi].[InteractivityStyleType] ENABLE TRIGGER [InteractivityStyleTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InternetAccessTypeDeletedForTracking] ON [edfi].[InternetAccessType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InternetAccessType_TrackedDelete(InternetAccessTypeId, Id, ChangeVersion)
    SELECT  InternetAccessTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InternetAccessType_TrackedDelete d2 WHERE d2.InternetAccessTypeId = d.InternetAccessTypeId)
END
GO

ALTER TABLE [edfi].[InternetAccessType] ENABLE TRIGGER [InternetAccessTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionClassTypeDeletedForTracking] ON [edfi].[InterventionClassType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InterventionClassType_TrackedDelete(InterventionClassTypeId, Id, ChangeVersion)
    SELECT  InterventionClassTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InterventionClassType_TrackedDelete d2 WHERE d2.InterventionClassTypeId = d.InterventionClassTypeId)
END
GO

ALTER TABLE [edfi].[InterventionClassType] ENABLE TRIGGER [InterventionClassTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionDeletedForTracking] ON [edfi].[Intervention] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Intervention_TrackedDelete(EducationOrganizationId, InterventionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Intervention_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode)
END
GO

ALTER TABLE [edfi].[Intervention] ENABLE TRIGGER [InterventionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionEffectivenessRatingTypeDeletedForTracking] ON [edfi].[InterventionEffectivenessRatingType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InterventionEffectivenessRatingType_TrackedDelete(InterventionEffectivenessRatingTypeId, Id, ChangeVersion)
    SELECT  InterventionEffectivenessRatingTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InterventionEffectivenessRatingType_TrackedDelete d2 WHERE d2.InterventionEffectivenessRatingTypeId = d.InterventionEffectivenessRatingTypeId)
END
GO

ALTER TABLE [edfi].[InterventionEffectivenessRatingType] ENABLE TRIGGER [InterventionEffectivenessRatingTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionPrescriptionDeletedForTracking] ON [edfi].[InterventionPrescription] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InterventionPrescription_TrackedDelete(EducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InterventionPrescription_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionPrescriptionIdentificationCode = d.InterventionPrescriptionIdentificationCode)
END
GO

ALTER TABLE [edfi].[InterventionPrescription] ENABLE TRIGGER [InterventionPrescriptionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionStudyDeletedForTracking] ON [edfi].[InterventionStudy] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_InterventionStudy_TrackedDelete(EducationOrganizationId, InterventionStudyIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionStudyIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_InterventionStudy_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionStudyIdentificationCode = d.InterventionStudyIdentificationCode)
END
GO

ALTER TABLE [edfi].[InterventionStudy] ENABLE TRIGGER [InterventionStudyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LanguageDescriptorDeletedForTracking] ON [edfi].[LanguageDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LanguageDescriptor_TrackedDelete(LanguageDescriptorId, Id, ChangeVersion)
    SELECT  d.LanguageDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LanguageDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LanguageDescriptor_TrackedDelete d2 WHERE d2.LanguageDescriptorId = d.LanguageDescriptorId)
END
GO

ALTER TABLE [edfi].[LanguageDescriptor] ENABLE TRIGGER [LanguageDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LanguageUseTypeDeletedForTracking] ON [edfi].[LanguageUseType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LanguageUseType_TrackedDelete(LanguageUseTypeId, Id, ChangeVersion)
    SELECT  LanguageUseTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LanguageUseType_TrackedDelete d2 WHERE d2.LanguageUseTypeId = d.LanguageUseTypeId)
END
GO

ALTER TABLE [edfi].[LanguageUseType] ENABLE TRIGGER [LanguageUseTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LearningObjectiveDeletedForTracking] ON [edfi].[LearningObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LearningObjective_TrackedDelete(AcademicSubjectDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LearningObjective_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[LearningObjective] ENABLE TRIGGER [LearningObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LearningStandardDeletedForTracking] ON [edfi].[LearningStandard] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LearningStandard_TrackedDelete(LearningStandardId, Id, ChangeVersion)
    SELECT  LearningStandardId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LearningStandard_TrackedDelete d2 WHERE d2.LearningStandardId = d.LearningStandardId)
END
GO

ALTER TABLE [edfi].[LearningStandard] ENABLE TRIGGER [LearningStandardDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LeaveEventCategoryTypeDeletedForTracking] ON [edfi].[LeaveEventCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LeaveEventCategoryType_TrackedDelete(LeaveEventCategoryTypeId, Id, ChangeVersion)
    SELECT  LeaveEventCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LeaveEventCategoryType_TrackedDelete d2 WHERE d2.LeaveEventCategoryTypeId = d.LeaveEventCategoryTypeId)
END
GO

ALTER TABLE [edfi].[LeaveEventCategoryType] ENABLE TRIGGER [LeaveEventCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LeaveEventDeletedForTracking] ON [edfi].[LeaveEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LeaveEvent_TrackedDelete(EventDate, LeaveEventCategoryTypeId, StaffUSI, Id, ChangeVersion)
    SELECT  EventDate, LeaveEventCategoryTypeId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LeaveEvent_TrackedDelete d2 WHERE d2.EventDate = d.EventDate AND d2.LeaveEventCategoryTypeId = d.LeaveEventCategoryTypeId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[LeaveEvent] ENABLE TRIGGER [LeaveEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LevelDescriptorDeletedForTracking] ON [edfi].[LevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LevelDescriptor_TrackedDelete(LevelDescriptorId, Id, ChangeVersion)
    SELECT  d.LevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LevelDescriptor_TrackedDelete d2 WHERE d2.LevelDescriptorId = d.LevelDescriptorId)
END
GO

ALTER TABLE [edfi].[LevelDescriptor] ENABLE TRIGGER [LevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LevelOfEducationDescriptorDeletedForTracking] ON [edfi].[LevelOfEducationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LevelOfEducationDescriptor_TrackedDelete(LevelOfEducationDescriptorId, Id, ChangeVersion)
    SELECT  d.LevelOfEducationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LevelOfEducationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LevelOfEducationDescriptor_TrackedDelete d2 WHERE d2.LevelOfEducationDescriptorId = d.LevelOfEducationDescriptorId)
END
GO

ALTER TABLE [edfi].[LevelOfEducationDescriptor] ENABLE TRIGGER [LevelOfEducationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LimitedEnglishProficiencyDescriptorDeletedForTracking] ON [edfi].[LimitedEnglishProficiencyDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete(LimitedEnglishProficiencyDescriptorId, Id, ChangeVersion)
    SELECT  d.LimitedEnglishProficiencyDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LimitedEnglishProficiencyDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete d2 WHERE d2.LimitedEnglishProficiencyDescriptorId = d.LimitedEnglishProficiencyDescriptorId)
END
GO

ALTER TABLE [edfi].[LimitedEnglishProficiencyDescriptor] ENABLE TRIGGER [LimitedEnglishProficiencyDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocalEducationAgencyCategoryTypeDeletedForTracking] ON [edfi].[LocalEducationAgencyCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LocalEducationAgencyCategoryType_TrackedDelete(LocalEducationAgencyCategoryTypeId, Id, ChangeVersion)
    SELECT  LocalEducationAgencyCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LocalEducationAgencyCategoryType_TrackedDelete d2 WHERE d2.LocalEducationAgencyCategoryTypeId = d.LocalEducationAgencyCategoryTypeId)
END
GO

ALTER TABLE [edfi].[LocalEducationAgencyCategoryType] ENABLE TRIGGER [LocalEducationAgencyCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocalEducationAgencyDeletedForTracking] ON [edfi].[LocalEducationAgency] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_LocalEducationAgency_TrackedDelete(LocalEducationAgencyId, Id, ChangeVersion)
    SELECT  d.LocalEducationAgencyId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.LocalEducationAgencyId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_LocalEducationAgency_TrackedDelete d2 WHERE d2.LocalEducationAgencyId = d.LocalEducationAgencyId)
END
GO

ALTER TABLE [edfi].[LocalEducationAgency] ENABLE TRIGGER [LocalEducationAgencyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocationDeletedForTracking] ON [edfi].[Location] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Location_TrackedDelete(ClassroomIdentificationCode, SchoolId, Id, ChangeVersion)
    SELECT  ClassroomIdentificationCode, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Location_TrackedDelete d2 WHERE d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[Location] ENABLE TRIGGER [LocationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MagnetSpecialProgramEmphasisSchoolTypeDeletedForTracking] ON [edfi].[MagnetSpecialProgramEmphasisSchoolType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_MagnetSpecialProgramEmphasisSchoolType_TrackedDelete(MagnetSpecialProgramEmphasisSchoolTypeId, Id, ChangeVersion)
    SELECT  MagnetSpecialProgramEmphasisSchoolTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_MagnetSpecialProgramEmphasisSchoolType_TrackedDelete d2 WHERE d2.MagnetSpecialProgramEmphasisSchoolTypeId = d.MagnetSpecialProgramEmphasisSchoolTypeId)
END
GO

ALTER TABLE [edfi].[MagnetSpecialProgramEmphasisSchoolType] ENABLE TRIGGER [MagnetSpecialProgramEmphasisSchoolTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MediumOfInstructionTypeDeletedForTracking] ON [edfi].[MediumOfInstructionType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_MediumOfInstructionType_TrackedDelete(MediumOfInstructionTypeId, Id, ChangeVersion)
    SELECT  MediumOfInstructionTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_MediumOfInstructionType_TrackedDelete d2 WHERE d2.MediumOfInstructionTypeId = d.MediumOfInstructionTypeId)
END
GO

ALTER TABLE [edfi].[MediumOfInstructionType] ENABLE TRIGGER [MediumOfInstructionTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MeetingDayTypeDeletedForTracking] ON [edfi].[MeetingDayType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_MeetingDayType_TrackedDelete(MeetingDayTypeId, Id, ChangeVersion)
    SELECT  MeetingDayTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_MeetingDayType_TrackedDelete d2 WHERE d2.MeetingDayTypeId = d.MeetingDayTypeId)
END
GO

ALTER TABLE [edfi].[MeetingDayType] ENABLE TRIGGER [MeetingDayTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MethodCreditEarnedTypeDeletedForTracking] ON [edfi].[MethodCreditEarnedType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_MethodCreditEarnedType_TrackedDelete(MethodCreditEarnedTypeId, Id, ChangeVersion)
    SELECT  MethodCreditEarnedTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_MethodCreditEarnedType_TrackedDelete d2 WHERE d2.MethodCreditEarnedTypeId = d.MethodCreditEarnedTypeId)
END
GO

ALTER TABLE [edfi].[MethodCreditEarnedType] ENABLE TRIGGER [MethodCreditEarnedTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[NetworkPurposeTypeDeletedForTracking] ON [edfi].[NetworkPurposeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_NetworkPurposeType_TrackedDelete(NetworkPurposeTypeId, Id, ChangeVersion)
    SELECT  NetworkPurposeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_NetworkPurposeType_TrackedDelete d2 WHERE d2.NetworkPurposeTypeId = d.NetworkPurposeTypeId)
END
GO

ALTER TABLE [edfi].[NetworkPurposeType] ENABLE TRIGGER [NetworkPurposeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ObjectiveAssessmentDeletedForTracking] ON [edfi].[ObjectiveAssessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ObjectiveAssessment_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, IdentificationCode, Version, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ObjectiveAssessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.IdentificationCode = d.IdentificationCode AND d2.Version = d.Version)
END
GO

ALTER TABLE [edfi].[ObjectiveAssessment] ENABLE TRIGGER [ObjectiveAssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OldEthnicityTypeDeletedForTracking] ON [edfi].[OldEthnicityType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_OldEthnicityType_TrackedDelete(OldEthnicityTypeId, Id, ChangeVersion)
    SELECT  OldEthnicityTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_OldEthnicityType_TrackedDelete d2 WHERE d2.OldEthnicityTypeId = d.OldEthnicityTypeId)
END
GO

ALTER TABLE [edfi].[OldEthnicityType] ENABLE TRIGGER [OldEthnicityTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OpenStaffPositionDeletedForTracking] ON [edfi].[OpenStaffPosition] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_OpenStaffPosition_TrackedDelete(DatePosted, EducationOrganizationId, EmploymentStatusDescriptorId, RequisitionNumber, StaffClassificationDescriptorId, Id, ChangeVersion)
    SELECT  DatePosted, EducationOrganizationId, EmploymentStatusDescriptorId, RequisitionNumber, StaffClassificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_OpenStaffPosition_TrackedDelete d2 WHERE d2.DatePosted = d.DatePosted AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EmploymentStatusDescriptorId = d.EmploymentStatusDescriptorId AND d2.RequisitionNumber = d.RequisitionNumber AND d2.StaffClassificationDescriptorId = d.StaffClassificationDescriptorId)
END
GO

ALTER TABLE [edfi].[OpenStaffPosition] ENABLE TRIGGER [OpenStaffPositionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OperationalStatusTypeDeletedForTracking] ON [edfi].[OperationalStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_OperationalStatusType_TrackedDelete(OperationalStatusTypeId, Id, ChangeVersion)
    SELECT  OperationalStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_OperationalStatusType_TrackedDelete d2 WHERE d2.OperationalStatusTypeId = d.OperationalStatusTypeId)
END
GO

ALTER TABLE [edfi].[OperationalStatusType] ENABLE TRIGGER [OperationalStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OtherNameTypeDeletedForTracking] ON [edfi].[OtherNameType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_OtherNameType_TrackedDelete(OtherNameTypeId, Id, ChangeVersion)
    SELECT  OtherNameTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_OtherNameType_TrackedDelete d2 WHERE d2.OtherNameTypeId = d.OtherNameTypeId)
END
GO

ALTER TABLE [edfi].[OtherNameType] ENABLE TRIGGER [OtherNameTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ParentDeletedForTracking] ON [edfi].[Parent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Parent_TrackedDelete(ParentUSI, Id, ChangeVersion)
    SELECT  ParentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Parent_TrackedDelete d2 WHERE d2.ParentUSI = d.ParentUSI)
END
GO

ALTER TABLE [edfi].[Parent] ENABLE TRIGGER [ParentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PayrollDeletedForTracking] ON [edfi].[Payroll] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Payroll_TrackedDelete(AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    SELECT  AccountNumber, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Payroll_TrackedDelete d2 WHERE d2.AccountNumber = d.AccountNumber AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[Payroll] ENABLE TRIGGER [PayrollDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PerformanceBaseConversionTypeDeletedForTracking] ON [edfi].[PerformanceBaseConversionType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PerformanceBaseConversionType_TrackedDelete(PerformanceBaseConversionTypeId, Id, ChangeVersion)
    SELECT  PerformanceBaseConversionTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PerformanceBaseConversionType_TrackedDelete d2 WHERE d2.PerformanceBaseConversionTypeId = d.PerformanceBaseConversionTypeId)
END
GO

ALTER TABLE [edfi].[PerformanceBaseConversionType] ENABLE TRIGGER [PerformanceBaseConversionTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PerformanceLevelDescriptorDeletedForTracking] ON [edfi].[PerformanceLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PerformanceLevelDescriptor_TrackedDelete(PerformanceLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.PerformanceLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PerformanceLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PerformanceLevelDescriptor_TrackedDelete d2 WHERE d2.PerformanceLevelDescriptorId = d.PerformanceLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[PerformanceLevelDescriptor] ENABLE TRIGGER [PerformanceLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PersonalInformationVerificationTypeDeletedForTracking] ON [edfi].[PersonalInformationVerificationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PersonalInformationVerificationType_TrackedDelete(PersonalInformationVerificationTypeId, Id, ChangeVersion)
    SELECT  PersonalInformationVerificationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PersonalInformationVerificationType_TrackedDelete d2 WHERE d2.PersonalInformationVerificationTypeId = d.PersonalInformationVerificationTypeId)
END
GO

ALTER TABLE [edfi].[PersonalInformationVerificationType] ENABLE TRIGGER [PersonalInformationVerificationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PopulationServedTypeDeletedForTracking] ON [edfi].[PopulationServedType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PopulationServedType_TrackedDelete(PopulationServedTypeId, Id, ChangeVersion)
    SELECT  PopulationServedTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PopulationServedType_TrackedDelete d2 WHERE d2.PopulationServedTypeId = d.PopulationServedTypeId)
END
GO

ALTER TABLE [edfi].[PopulationServedType] ENABLE TRIGGER [PopulationServedTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryEventCategoryTypeDeletedForTracking] ON [edfi].[PostSecondaryEventCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PostSecondaryEventCategoryType_TrackedDelete(PostSecondaryEventCategoryTypeId, Id, ChangeVersion)
    SELECT  PostSecondaryEventCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PostSecondaryEventCategoryType_TrackedDelete d2 WHERE d2.PostSecondaryEventCategoryTypeId = d.PostSecondaryEventCategoryTypeId)
END
GO

ALTER TABLE [edfi].[PostSecondaryEventCategoryType] ENABLE TRIGGER [PostSecondaryEventCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryEventDeletedForTracking] ON [edfi].[PostSecondaryEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PostSecondaryEvent_TrackedDelete(EventDate, PostSecondaryEventCategoryTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  EventDate, PostSecondaryEventCategoryTypeId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PostSecondaryEvent_TrackedDelete d2 WHERE d2.EventDate = d.EventDate AND d2.PostSecondaryEventCategoryTypeId = d.PostSecondaryEventCategoryTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[PostSecondaryEvent] ENABLE TRIGGER [PostSecondaryEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryInstitutionLevelTypeDeletedForTracking] ON [edfi].[PostSecondaryInstitutionLevelType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PostSecondaryInstitutionLevelType_TrackedDelete(PostSecondaryInstitutionLevelTypeId, Id, ChangeVersion)
    SELECT  PostSecondaryInstitutionLevelTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PostSecondaryInstitutionLevelType_TrackedDelete d2 WHERE d2.PostSecondaryInstitutionLevelTypeId = d.PostSecondaryInstitutionLevelTypeId)
END
GO

ALTER TABLE [edfi].[PostSecondaryInstitutionLevelType] ENABLE TRIGGER [PostSecondaryInstitutionLevelTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostingResultTypeDeletedForTracking] ON [edfi].[PostingResultType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PostingResultType_TrackedDelete(PostingResultTypeId, Id, ChangeVersion)
    SELECT  PostingResultTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PostingResultType_TrackedDelete d2 WHERE d2.PostingResultTypeId = d.PostingResultTypeId)
END
GO

ALTER TABLE [edfi].[PostingResultType] ENABLE TRIGGER [PostingResultTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramAssignmentDescriptorDeletedForTracking] ON [edfi].[ProgramAssignmentDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ProgramAssignmentDescriptor_TrackedDelete(ProgramAssignmentDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramAssignmentDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramAssignmentDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ProgramAssignmentDescriptor_TrackedDelete d2 WHERE d2.ProgramAssignmentDescriptorId = d.ProgramAssignmentDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramAssignmentDescriptor] ENABLE TRIGGER [ProgramAssignmentDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramCharacteristicDescriptorDeletedForTracking] ON [edfi].[ProgramCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ProgramCharacteristicDescriptor_TrackedDelete(ProgramCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ProgramCharacteristicDescriptor_TrackedDelete d2 WHERE d2.ProgramCharacteristicDescriptorId = d.ProgramCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramCharacteristicDescriptor] ENABLE TRIGGER [ProgramCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramDeletedForTracking] ON [edfi].[Program] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Program_TrackedDelete(EducationOrganizationId, ProgramName, ProgramTypeId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, ProgramName, ProgramTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Program_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId)
END
GO

ALTER TABLE [edfi].[Program] ENABLE TRIGGER [ProgramDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramSponsorTypeDeletedForTracking] ON [edfi].[ProgramSponsorType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ProgramSponsorType_TrackedDelete(ProgramSponsorTypeId, Id, ChangeVersion)
    SELECT  ProgramSponsorTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ProgramSponsorType_TrackedDelete d2 WHERE d2.ProgramSponsorTypeId = d.ProgramSponsorTypeId)
END
GO

ALTER TABLE [edfi].[ProgramSponsorType] ENABLE TRIGGER [ProgramSponsorTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramTypeDeletedForTracking] ON [edfi].[ProgramType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ProgramType_TrackedDelete(ProgramTypeId, Id, ChangeVersion)
    SELECT  ProgramTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ProgramType_TrackedDelete d2 WHERE d2.ProgramTypeId = d.ProgramTypeId)
END
GO

ALTER TABLE [edfi].[ProgramType] ENABLE TRIGGER [ProgramTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PublicationStatusTypeDeletedForTracking] ON [edfi].[PublicationStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_PublicationStatusType_TrackedDelete(PublicationStatusTypeId, Id, ChangeVersion)
    SELECT  PublicationStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_PublicationStatusType_TrackedDelete d2 WHERE d2.PublicationStatusTypeId = d.PublicationStatusTypeId)
END
GO

ALTER TABLE [edfi].[PublicationStatusType] ENABLE TRIGGER [PublicationStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RaceTypeDeletedForTracking] ON [edfi].[RaceType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RaceType_TrackedDelete(RaceTypeId, Id, ChangeVersion)
    SELECT  RaceTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RaceType_TrackedDelete d2 WHERE d2.RaceTypeId = d.RaceTypeId)
END
GO

ALTER TABLE [edfi].[RaceType] ENABLE TRIGGER [RaceTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReasonExitedDescriptorDeletedForTracking] ON [edfi].[ReasonExitedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ReasonExitedDescriptor_TrackedDelete(ReasonExitedDescriptorId, Id, ChangeVersion)
    SELECT  d.ReasonExitedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ReasonExitedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ReasonExitedDescriptor_TrackedDelete d2 WHERE d2.ReasonExitedDescriptorId = d.ReasonExitedDescriptorId)
END
GO

ALTER TABLE [edfi].[ReasonExitedDescriptor] ENABLE TRIGGER [ReasonExitedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReasonNotTestedTypeDeletedForTracking] ON [edfi].[ReasonNotTestedType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ReasonNotTestedType_TrackedDelete(ReasonNotTestedTypeId, Id, ChangeVersion)
    SELECT  ReasonNotTestedTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ReasonNotTestedType_TrackedDelete d2 WHERE d2.ReasonNotTestedTypeId = d.ReasonNotTestedTypeId)
END
GO

ALTER TABLE [edfi].[ReasonNotTestedType] ENABLE TRIGGER [ReasonNotTestedTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RecognitionTypeDeletedForTracking] ON [edfi].[RecognitionType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RecognitionType_TrackedDelete(RecognitionTypeId, Id, ChangeVersion)
    SELECT  RecognitionTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RecognitionType_TrackedDelete d2 WHERE d2.RecognitionTypeId = d.RecognitionTypeId)
END
GO

ALTER TABLE [edfi].[RecognitionType] ENABLE TRIGGER [RecognitionTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RelationTypeDeletedForTracking] ON [edfi].[RelationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RelationType_TrackedDelete(RelationTypeId, Id, ChangeVersion)
    SELECT  RelationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RelationType_TrackedDelete d2 WHERE d2.RelationTypeId = d.RelationTypeId)
END
GO

ALTER TABLE [edfi].[RelationType] ENABLE TRIGGER [RelationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RepeatIdentifierTypeDeletedForTracking] ON [edfi].[RepeatIdentifierType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RepeatIdentifierType_TrackedDelete(RepeatIdentifierTypeId, Id, ChangeVersion)
    SELECT  RepeatIdentifierTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RepeatIdentifierType_TrackedDelete d2 WHERE d2.RepeatIdentifierTypeId = d.RepeatIdentifierTypeId)
END
GO

ALTER TABLE [edfi].[RepeatIdentifierType] ENABLE TRIGGER [RepeatIdentifierTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReportCardDeletedForTracking] ON [edfi].[ReportCard] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ReportCard_TrackedDelete(EducationOrganizationId, GradingPeriodBeginDate, GradingPeriodDescriptorId, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, GradingPeriodBeginDate, GradingPeriodDescriptorId, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ReportCard_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.GradingPeriodBeginDate = d.GradingPeriodBeginDate AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[ReportCard] ENABLE TRIGGER [ReportCardDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReporterDescriptionDescriptorDeletedForTracking] ON [edfi].[ReporterDescriptionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ReporterDescriptionDescriptor_TrackedDelete(ReporterDescriptionDescriptorId, Id, ChangeVersion)
    SELECT  d.ReporterDescriptionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ReporterDescriptionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ReporterDescriptionDescriptor_TrackedDelete d2 WHERE d2.ReporterDescriptionDescriptorId = d.ReporterDescriptionDescriptorId)
END
GO

ALTER TABLE [edfi].[ReporterDescriptionDescriptor] ENABLE TRIGGER [ReporterDescriptionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResidencyStatusDescriptorDeletedForTracking] ON [edfi].[ResidencyStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ResidencyStatusDescriptor_TrackedDelete(ResidencyStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.ResidencyStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResidencyStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ResidencyStatusDescriptor_TrackedDelete d2 WHERE d2.ResidencyStatusDescriptorId = d.ResidencyStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[ResidencyStatusDescriptor] ENABLE TRIGGER [ResidencyStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResponseIndicatorTypeDeletedForTracking] ON [edfi].[ResponseIndicatorType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ResponseIndicatorType_TrackedDelete(ResponseIndicatorTypeId, Id, ChangeVersion)
    SELECT  ResponseIndicatorTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ResponseIndicatorType_TrackedDelete d2 WHERE d2.ResponseIndicatorTypeId = d.ResponseIndicatorTypeId)
END
GO

ALTER TABLE [edfi].[ResponseIndicatorType] ENABLE TRIGGER [ResponseIndicatorTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResponsibilityDescriptorDeletedForTracking] ON [edfi].[ResponsibilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ResponsibilityDescriptor_TrackedDelete(ResponsibilityDescriptorId, Id, ChangeVersion)
    SELECT  d.ResponsibilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResponsibilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ResponsibilityDescriptor_TrackedDelete d2 WHERE d2.ResponsibilityDescriptorId = d.ResponsibilityDescriptorId)
END
GO

ALTER TABLE [edfi].[ResponsibilityDescriptor] ENABLE TRIGGER [ResponsibilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RestraintEventDeletedForTracking] ON [edfi].[RestraintEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RestraintEvent_TrackedDelete(EventDate, RestraintEventIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  EventDate, RestraintEventIdentifier, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RestraintEvent_TrackedDelete d2 WHERE d2.EventDate = d.EventDate AND d2.RestraintEventIdentifier = d.RestraintEventIdentifier AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[RestraintEvent] ENABLE TRIGGER [RestraintEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RestraintEventReasonTypeDeletedForTracking] ON [edfi].[RestraintEventReasonType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RestraintEventReasonType_TrackedDelete(RestraintEventReasonTypeId, Id, ChangeVersion)
    SELECT  RestraintEventReasonTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RestraintEventReasonType_TrackedDelete d2 WHERE d2.RestraintEventReasonTypeId = d.RestraintEventReasonTypeId)
END
GO

ALTER TABLE [edfi].[RestraintEventReasonType] ENABLE TRIGGER [RestraintEventReasonTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResultDatatypeTypeDeletedForTracking] ON [edfi].[ResultDatatypeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ResultDatatypeType_TrackedDelete(ResultDatatypeTypeId, Id, ChangeVersion)
    SELECT  ResultDatatypeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ResultDatatypeType_TrackedDelete d2 WHERE d2.ResultDatatypeTypeId = d.ResultDatatypeTypeId)
END
GO

ALTER TABLE [edfi].[ResultDatatypeType] ENABLE TRIGGER [ResultDatatypeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RetestIndicatorTypeDeletedForTracking] ON [edfi].[RetestIndicatorType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_RetestIndicatorType_TrackedDelete(RetestIndicatorTypeId, Id, ChangeVersion)
    SELECT  RetestIndicatorTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_RetestIndicatorType_TrackedDelete d2 WHERE d2.RetestIndicatorTypeId = d.RetestIndicatorTypeId)
END
GO

ALTER TABLE [edfi].[RetestIndicatorType] ENABLE TRIGGER [RetestIndicatorTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolCategoryTypeDeletedForTracking] ON [edfi].[SchoolCategoryType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SchoolCategoryType_TrackedDelete(SchoolCategoryTypeId, Id, ChangeVersion)
    SELECT  SchoolCategoryTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SchoolCategoryType_TrackedDelete d2 WHERE d2.SchoolCategoryTypeId = d.SchoolCategoryTypeId)
END
GO

ALTER TABLE [edfi].[SchoolCategoryType] ENABLE TRIGGER [SchoolCategoryTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolChoiceImplementStatusTypeDeletedForTracking] ON [edfi].[SchoolChoiceImplementStatusType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SchoolChoiceImplementStatusType_TrackedDelete(SchoolChoiceImplementStatusTypeId, Id, ChangeVersion)
    SELECT  SchoolChoiceImplementStatusTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SchoolChoiceImplementStatusType_TrackedDelete d2 WHERE d2.SchoolChoiceImplementStatusTypeId = d.SchoolChoiceImplementStatusTypeId)
END
GO

ALTER TABLE [edfi].[SchoolChoiceImplementStatusType] ENABLE TRIGGER [SchoolChoiceImplementStatusTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolDeletedForTracking] ON [edfi].[School] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_School_TrackedDelete(SchoolId, Id, ChangeVersion)
    SELECT  d.SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.SchoolId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_School_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[School] ENABLE TRIGGER [SchoolDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolFoodServicesEligibilityDescriptorDeletedForTracking] ON [edfi].[SchoolFoodServicesEligibilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SchoolFoodServicesEligibilityDescriptor_TrackedDelete(SchoolFoodServicesEligibilityDescriptorId, Id, ChangeVersion)
    SELECT  d.SchoolFoodServicesEligibilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SchoolFoodServicesEligibilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SchoolFoodServicesEligibilityDescriptor_TrackedDelete d2 WHERE d2.SchoolFoodServicesEligibilityDescriptorId = d.SchoolFoodServicesEligibilityDescriptorId)
END
GO

ALTER TABLE [edfi].[SchoolFoodServicesEligibilityDescriptor] ENABLE TRIGGER [SchoolFoodServicesEligibilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolTypeDeletedForTracking] ON [edfi].[SchoolType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SchoolType_TrackedDelete(SchoolTypeId, Id, ChangeVersion)
    SELECT  SchoolTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SchoolType_TrackedDelete d2 WHERE d2.SchoolTypeId = d.SchoolTypeId)
END
GO

ALTER TABLE [edfi].[SchoolType] ENABLE TRIGGER [SchoolTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionAttendanceTakenEventDeletedForTracking] ON [edfi].[SectionAttendanceTakenEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SectionAttendanceTakenEvent_TrackedDelete(ClassPeriodName, ClassroomIdentificationCode, Date, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  ClassPeriodName, ClassroomIdentificationCode, Date, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SectionAttendanceTakenEvent_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.Date = d.Date AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[SectionAttendanceTakenEvent] ENABLE TRIGGER [SectionAttendanceTakenEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionCharacteristicDescriptorDeletedForTracking] ON [edfi].[SectionCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SectionCharacteristicDescriptor_TrackedDelete(SectionCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.SectionCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SectionCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SectionCharacteristicDescriptor_TrackedDelete d2 WHERE d2.SectionCharacteristicDescriptorId = d.SectionCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[SectionCharacteristicDescriptor] ENABLE TRIGGER [SectionCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionDeletedForTracking] ON [edfi].[Section] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Section_TrackedDelete(ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Section_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[Section] ENABLE TRIGGER [SectionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SeparationReasonDescriptorDeletedForTracking] ON [edfi].[SeparationReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SeparationReasonDescriptor_TrackedDelete(SeparationReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.SeparationReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SeparationReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SeparationReasonDescriptor_TrackedDelete d2 WHERE d2.SeparationReasonDescriptorId = d.SeparationReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[SeparationReasonDescriptor] ENABLE TRIGGER [SeparationReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SeparationTypeDeletedForTracking] ON [edfi].[SeparationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SeparationType_TrackedDelete(SeparationTypeId, Id, ChangeVersion)
    SELECT  SeparationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SeparationType_TrackedDelete d2 WHERE d2.SeparationTypeId = d.SeparationTypeId)
END
GO

ALTER TABLE [edfi].[SeparationType] ENABLE TRIGGER [SeparationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ServiceDescriptorDeletedForTracking] ON [edfi].[ServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_ServiceDescriptor_TrackedDelete(ServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.ServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_ServiceDescriptor_TrackedDelete d2 WHERE d2.ServiceDescriptorId = d.ServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[ServiceDescriptor] ENABLE TRIGGER [ServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SessionDeletedForTracking] ON [edfi].[Session] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Session_TrackedDelete(SchoolId, SchoolYear, TermDescriptorId, Id, ChangeVersion)
    SELECT  SchoolId, SchoolYear, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Session_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[Session] ENABLE TRIGGER [SessionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SexTypeDeletedForTracking] ON [edfi].[SexType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SexType_TrackedDelete(SexTypeId, Id, ChangeVersion)
    SELECT  SexTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SexType_TrackedDelete d2 WHERE d2.SexTypeId = d.SexTypeId)
END
GO

ALTER TABLE [edfi].[SexType] ENABLE TRIGGER [SexTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SpecialEducationSettingDescriptorDeletedForTracking] ON [edfi].[SpecialEducationSettingDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_SpecialEducationSettingDescriptor_TrackedDelete(SpecialEducationSettingDescriptorId, Id, ChangeVersion)
    SELECT  d.SpecialEducationSettingDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SpecialEducationSettingDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_SpecialEducationSettingDescriptor_TrackedDelete d2 WHERE d2.SpecialEducationSettingDescriptorId = d.SpecialEducationSettingDescriptorId)
END
GO

ALTER TABLE [edfi].[SpecialEducationSettingDescriptor] ENABLE TRIGGER [SpecialEducationSettingDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffClassificationDescriptorDeletedForTracking] ON [edfi].[StaffClassificationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffClassificationDescriptor_TrackedDelete(StaffClassificationDescriptorId, Id, ChangeVersion)
    SELECT  d.StaffClassificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StaffClassificationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffClassificationDescriptor_TrackedDelete d2 WHERE d2.StaffClassificationDescriptorId = d.StaffClassificationDescriptorId)
END
GO

ALTER TABLE [edfi].[StaffClassificationDescriptor] ENABLE TRIGGER [StaffClassificationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffCohortAssociationDeletedForTracking] ON [edfi].[StaffCohortAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffCohortAssociation_TrackedDelete(BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffCohortAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffCohortAssociation] ENABLE TRIGGER [StaffCohortAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffDeletedForTracking] ON [edfi].[Staff] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Staff_TrackedDelete(StaffUSI, Id, ChangeVersion)
    SELECT  StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Staff_TrackedDelete d2 WHERE d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[Staff] ENABLE TRIGGER [StaffDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffEducationOrganizationAssignmentAssociationDeletedForTracking] ON [edfi].[StaffEducationOrganizationAssignmentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete(BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StaffClassificationDescriptorId = d.StaffClassificationDescriptorId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffEducationOrganizationAssignmentAssociation] ENABLE TRIGGER [StaffEducationOrganizationAssignmentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffEducationOrganizationEmploymentAssociationDeletedForTracking] ON [edfi].[StaffEducationOrganizationEmploymentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete(EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EmploymentStatusDescriptorId = d.EmploymentStatusDescriptorId AND d2.HireDate = d.HireDate AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffEducationOrganizationEmploymentAssociation] ENABLE TRIGGER [StaffEducationOrganizationEmploymentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[StaffIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffIdentificationSystemDescriptor_TrackedDelete(StaffIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.StaffIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StaffIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.StaffIdentificationSystemDescriptorId = d.StaffIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[StaffIdentificationSystemDescriptor] ENABLE TRIGGER [StaffIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffProgramAssociationDeletedForTracking] ON [edfi].[StaffProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffProgramAssociation_TrackedDelete(BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffProgramAssociation] ENABLE TRIGGER [StaffProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffSchoolAssociationDeletedForTracking] ON [edfi].[StaffSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffSchoolAssociation_TrackedDelete(ProgramAssignmentDescriptorId, SchoolId, StaffUSI, Id, ChangeVersion)
    SELECT  ProgramAssignmentDescriptorId, SchoolId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffSchoolAssociation_TrackedDelete d2 WHERE d2.ProgramAssignmentDescriptorId = d.ProgramAssignmentDescriptorId AND d2.SchoolId = d.SchoolId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffSchoolAssociation] ENABLE TRIGGER [StaffSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffSectionAssociationDeletedForTracking] ON [edfi].[StaffSectionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StaffSectionAssociation_TrackedDelete(ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StaffUSI, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StaffUSI, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StaffSectionAssociation_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.StaffUSI = d.StaffUSI AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[StaffSectionAssociation] ENABLE TRIGGER [StaffSectionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StateAbbreviationTypeDeletedForTracking] ON [edfi].[StateAbbreviationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StateAbbreviationType_TrackedDelete(StateAbbreviationTypeId, Id, ChangeVersion)
    SELECT  StateAbbreviationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StateAbbreviationType_TrackedDelete d2 WHERE d2.StateAbbreviationTypeId = d.StateAbbreviationTypeId)
END
GO

ALTER TABLE [edfi].[StateAbbreviationType] ENABLE TRIGGER [StateAbbreviationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StateEducationAgencyDeletedForTracking] ON [edfi].[StateEducationAgency] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StateEducationAgency_TrackedDelete(StateEducationAgencyId, Id, ChangeVersion)
    SELECT  d.StateEducationAgencyId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.StateEducationAgencyId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StateEducationAgency_TrackedDelete d2 WHERE d2.StateEducationAgencyId = d.StateEducationAgencyId)
END
GO

ALTER TABLE [edfi].[StateEducationAgency] ENABLE TRIGGER [StateEducationAgencyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentAcademicRecordDeletedForTracking] ON [edfi].[StudentAcademicRecord] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentAcademicRecord_TrackedDelete(EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentAcademicRecord_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.SchoolYear = d.SchoolYear AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentAcademicRecord] ENABLE TRIGGER [StudentAcademicRecordDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentAssessmentDeletedForTracking] ON [edfi].[StudentAssessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentAssessment_TrackedDelete(AcademicSubjectDescriptorId, AdministrationDate, AssessedGradeLevelDescriptorId, AssessmentTitle, StudentUSI, Version, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AdministrationDate, AssessedGradeLevelDescriptorId, AssessmentTitle, StudentUSI, Version, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentAssessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AdministrationDate = d.AdministrationDate AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.StudentUSI = d.StudentUSI AND d2.Version = d.Version)
END
GO

ALTER TABLE [edfi].[StudentAssessment] ENABLE TRIGGER [StudentAssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCTEProgramAssociationDeletedForTracking] ON [edfi].[StudentCTEProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentCTEProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.StudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeId = b.ProgramTypeId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentCTEProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCTEProgramAssociation] ENABLE TRIGGER [StudentCTEProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCharacteristicDescriptorDeletedForTracking] ON [edfi].[StudentCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentCharacteristicDescriptor_TrackedDelete(StudentCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.StudentCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StudentCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentCharacteristicDescriptor_TrackedDelete d2 WHERE d2.StudentCharacteristicDescriptorId = d.StudentCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentCharacteristicDescriptor] ENABLE TRIGGER [StudentCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCohortAssociationDeletedForTracking] ON [edfi].[StudentCohortAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentCohortAssociation_TrackedDelete(BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentCohortAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCohortAssociation] ENABLE TRIGGER [StudentCohortAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCompetencyObjectiveDeletedForTracking] ON [edfi].[StudentCompetencyObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentCompetencyObjective_TrackedDelete(GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentCompetencyObjective_TrackedDelete d2 WHERE d2.GradingPeriodBeginDate = d.GradingPeriodBeginDate AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.Objective = d.Objective AND d2.ObjectiveEducationOrganizationId = d.ObjectiveEducationOrganizationId AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCompetencyObjective] ENABLE TRIGGER [StudentCompetencyObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentDeletedForTracking] ON [edfi].[Student] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_Student_TrackedDelete(StudentUSI, Id, ChangeVersion)
    SELECT  StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_Student_TrackedDelete d2 WHERE d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[Student] ENABLE TRIGGER [StudentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentDisciplineIncidentAssociationDeletedForTracking] ON [edfi].[StudentDisciplineIncidentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentDisciplineIncidentAssociation_TrackedDelete(IncidentIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  IncidentIdentifier, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentDisciplineIncidentAssociation_TrackedDelete d2 WHERE d2.IncidentIdentifier = d.IncidentIdentifier AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentDisciplineIncidentAssociation] ENABLE TRIGGER [StudentDisciplineIncidentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentEducationOrganizationAssociationDeletedForTracking] ON [edfi].[StudentEducationOrganizationAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentEducationOrganizationAssociation_TrackedDelete(EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentEducationOrganizationAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ResponsibilityDescriptorId = d.ResponsibilityDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentEducationOrganizationAssociation] ENABLE TRIGGER [StudentEducationOrganizationAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentGradebookEntryDeletedForTracking] ON [edfi].[StudentGradebookEntry] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentGradebookEntry_TrackedDelete(BeginDate, ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  BeginDate, ClassPeriodName, ClassroomIdentificationCode, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentGradebookEntry_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.DateAssigned = d.DateAssigned AND d2.GradebookEntryTitle = d.GradebookEntryTitle AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[StudentGradebookEntry] ENABLE TRIGGER [StudentGradebookEntryDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[StudentIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentIdentificationSystemDescriptor_TrackedDelete(StudentIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.StudentIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StudentIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.StudentIdentificationSystemDescriptorId = d.StudentIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentIdentificationSystemDescriptor] ENABLE TRIGGER [StudentIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentInterventionAssociationDeletedForTracking] ON [edfi].[StudentInterventionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentInterventionAssociation_TrackedDelete(EducationOrganizationId, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionIdentificationCode, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentInterventionAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentInterventionAssociation] ENABLE TRIGGER [StudentInterventionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentInterventionAttendanceEventDeletedForTracking] ON [edfi].[StudentInterventionAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentInterventionAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentInterventionAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EventDate = d.EventDate AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentInterventionAttendanceEvent] ENABLE TRIGGER [StudentInterventionAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentLearningObjectiveDeletedForTracking] ON [edfi].[StudentLearningObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentLearningObjective_TrackedDelete(AcademicSubjectDescriptorId, GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, GradingPeriodBeginDate, GradingPeriodDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentLearningObjective_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.GradingPeriodBeginDate = d.GradingPeriodBeginDate AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentLearningObjective] ENABLE TRIGGER [StudentLearningObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentMigrantEducationProgramAssociationDeletedForTracking] ON [edfi].[StudentMigrantEducationProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentMigrantEducationProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.StudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeId = b.ProgramTypeId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentMigrantEducationProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentMigrantEducationProgramAssociation] ENABLE TRIGGER [StudentMigrantEducationProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentParentAssociationDeletedForTracking] ON [edfi].[StudentParentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentParentAssociation_TrackedDelete(ParentUSI, StudentUSI, Id, ChangeVersion)
    SELECT  ParentUSI, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentParentAssociation_TrackedDelete d2 WHERE d2.ParentUSI = d.ParentUSI AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentParentAssociation] ENABLE TRIGGER [StudentParentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentParticipationCodeTypeDeletedForTracking] ON [edfi].[StudentParticipationCodeType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentParticipationCodeType_TrackedDelete(StudentParticipationCodeTypeId, Id, ChangeVersion)
    SELECT  StudentParticipationCodeTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentParticipationCodeType_TrackedDelete d2 WHERE d2.StudentParticipationCodeTypeId = d.StudentParticipationCodeTypeId)
END
GO

ALTER TABLE [edfi].[StudentParticipationCodeType] ENABLE TRIGGER [StudentParticipationCodeTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentProgramAssociationDeletedForTracking] ON [edfi].[StudentProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentProgramAssociation] ENABLE TRIGGER [StudentProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentProgramAttendanceEventDeletedForTracking] ON [edfi].[StudentProgramAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentProgramAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentProgramAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EventDate = d.EventDate AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentProgramAttendanceEvent] ENABLE TRIGGER [StudentProgramAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSchoolAssociationDeletedForTracking] ON [edfi].[StudentSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentSchoolAssociation_TrackedDelete(EntryDate, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  EntryDate, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentSchoolAssociation_TrackedDelete d2 WHERE d2.EntryDate = d.EntryDate AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSchoolAssociation] ENABLE TRIGGER [StudentSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSchoolAttendanceEventDeletedForTracking] ON [edfi].[StudentSchoolAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentSchoolAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, StudentUSI, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentSchoolAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EventDate = d.EventDate AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentSchoolAttendanceEvent] ENABLE TRIGGER [StudentSchoolAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSectionAssociationDeletedForTracking] ON [edfi].[StudentSectionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentSectionAssociation_TrackedDelete(BeginDate, ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  BeginDate, ClassPeriodName, ClassroomIdentificationCode, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentSectionAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[StudentSectionAssociation] ENABLE TRIGGER [StudentSectionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSectionAttendanceEventDeletedForTracking] ON [edfi].[StudentSectionAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentSectionAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, ClassPeriodName, ClassroomIdentificationCode, EventDate, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, ClassPeriodName, ClassroomIdentificationCode, EventDate, LocalCourseCode, SchoolId, SchoolYear, SequenceOfCourse, StudentUSI, TermDescriptorId, UniqueSectionCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentSectionAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.ClassPeriodName = d.ClassPeriodName AND d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.EventDate = d.EventDate AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SequenceOfCourse = d.SequenceOfCourse AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId AND d2.UniqueSectionCode = d.UniqueSectionCode)
END
GO

ALTER TABLE [edfi].[StudentSectionAttendanceEvent] ENABLE TRIGGER [StudentSectionAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSpecialEducationProgramAssociationDeletedForTracking] ON [edfi].[StudentSpecialEducationProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentSpecialEducationProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.StudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeId = b.ProgramTypeId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentSpecialEducationProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSpecialEducationProgramAssociation] ENABLE TRIGGER [StudentSpecialEducationProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentTitleIPartAProgramAssociationDeletedForTracking] ON [edfi].[StudentTitleIPartAProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_StudentTitleIPartAProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.StudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeId = b.ProgramTypeId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_StudentTitleIPartAProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeId = d.ProgramTypeId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentTitleIPartAProgramAssociation] ENABLE TRIGGER [StudentTitleIPartAProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TeachingCredentialBasisTypeDeletedForTracking] ON [edfi].[TeachingCredentialBasisType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TeachingCredentialBasisType_TrackedDelete(TeachingCredentialBasisTypeId, Id, ChangeVersion)
    SELECT  TeachingCredentialBasisTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TeachingCredentialBasisType_TrackedDelete d2 WHERE d2.TeachingCredentialBasisTypeId = d.TeachingCredentialBasisTypeId)
END
GO

ALTER TABLE [edfi].[TeachingCredentialBasisType] ENABLE TRIGGER [TeachingCredentialBasisTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TeachingCredentialDescriptorDeletedForTracking] ON [edfi].[TeachingCredentialDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TeachingCredentialDescriptor_TrackedDelete(TeachingCredentialDescriptorId, Id, ChangeVersion)
    SELECT  d.TeachingCredentialDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TeachingCredentialDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TeachingCredentialDescriptor_TrackedDelete d2 WHERE d2.TeachingCredentialDescriptorId = d.TeachingCredentialDescriptorId)
END
GO

ALTER TABLE [edfi].[TeachingCredentialDescriptor] ENABLE TRIGGER [TeachingCredentialDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TelephoneNumberTypeDeletedForTracking] ON [edfi].[TelephoneNumberType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TelephoneNumberType_TrackedDelete(TelephoneNumberTypeId, Id, ChangeVersion)
    SELECT  TelephoneNumberTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TelephoneNumberType_TrackedDelete d2 WHERE d2.TelephoneNumberTypeId = d.TelephoneNumberTypeId)
END
GO

ALTER TABLE [edfi].[TelephoneNumberType] ENABLE TRIGGER [TelephoneNumberTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TermDescriptorDeletedForTracking] ON [edfi].[TermDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TermDescriptor_TrackedDelete(TermDescriptorId, Id, ChangeVersion)
    SELECT  d.TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TermDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TermDescriptor_TrackedDelete d2 WHERE d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[TermDescriptor] ENABLE TRIGGER [TermDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TitleIPartAParticipantTypeDeletedForTracking] ON [edfi].[TitleIPartAParticipantType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TitleIPartAParticipantType_TrackedDelete(TitleIPartAParticipantTypeId, Id, ChangeVersion)
    SELECT  TitleIPartAParticipantTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TitleIPartAParticipantType_TrackedDelete d2 WHERE d2.TitleIPartAParticipantTypeId = d.TitleIPartAParticipantTypeId)
END
GO

ALTER TABLE [edfi].[TitleIPartAParticipantType] ENABLE TRIGGER [TitleIPartAParticipantTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TitleIPartASchoolDesignationTypeDeletedForTracking] ON [edfi].[TitleIPartASchoolDesignationType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_TitleIPartASchoolDesignationType_TrackedDelete(TitleIPartASchoolDesignationTypeId, Id, ChangeVersion)
    SELECT  TitleIPartASchoolDesignationTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_TitleIPartASchoolDesignationType_TrackedDelete d2 WHERE d2.TitleIPartASchoolDesignationTypeId = d.TitleIPartASchoolDesignationTypeId)
END
GO

ALTER TABLE [edfi].[TitleIPartASchoolDesignationType] ENABLE TRIGGER [TitleIPartASchoolDesignationTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[VisaTypeDeletedForTracking] ON [edfi].[VisaType] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_VisaType_TrackedDelete(VisaTypeId, Id, ChangeVersion)
    SELECT  VisaTypeId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_VisaType_TrackedDelete d2 WHERE d2.VisaTypeId = d.VisaTypeId)
END
GO

ALTER TABLE [edfi].[VisaType] ENABLE TRIGGER [VisaTypeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[WeaponDescriptorDeletedForTracking] ON [edfi].[WeaponDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO dbo.edfi_WeaponDescriptor_TrackedDelete(WeaponDescriptorId, Id, ChangeVersion)
    SELECT  d.WeaponDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.WeaponDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM dbo.edfi_WeaponDescriptor_TrackedDelete d2 WHERE d2.WeaponDescriptorId = d.WeaponDescriptorId)
END
GO

ALTER TABLE [edfi].[WeaponDescriptor] ENABLE TRIGGER [WeaponDescriptorDeletedForTracking]
GO


