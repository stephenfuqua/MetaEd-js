CREATE TRIGGER [edfi].[AbsenceEventCategoryDescriptorDeletedForTracking] ON [edfi].[AbsenceEventCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AbsenceEventCategoryDescriptor_TrackedDelete(AbsenceEventCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AbsenceEventCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AbsenceEventCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AbsenceEventCategoryDescriptor_TrackedDelete d2 WHERE d2.AbsenceEventCategoryDescriptorId = d.AbsenceEventCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AbsenceEventCategoryDescriptor] ENABLE TRIGGER [AbsenceEventCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AcademicHonorCategoryDescriptorDeletedForTracking] ON [edfi].[AcademicHonorCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AcademicHonorCategoryDescriptor_TrackedDelete(AcademicHonorCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AcademicHonorCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AcademicHonorCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AcademicHonorCategoryDescriptor_TrackedDelete d2 WHERE d2.AcademicHonorCategoryDescriptorId = d.AcademicHonorCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AcademicHonorCategoryDescriptor] ENABLE TRIGGER [AcademicHonorCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AcademicSubjectDescriptorDeletedForTracking] ON [edfi].[AcademicSubjectDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AcademicSubjectDescriptor_TrackedDelete(AcademicSubjectDescriptorId, Id, ChangeVersion)
    SELECT  d.AcademicSubjectDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AcademicSubjectDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AcademicSubjectDescriptor_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId)
END
GO

ALTER TABLE [edfi].[AcademicSubjectDescriptor] ENABLE TRIGGER [AcademicSubjectDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AcademicWeekDeletedForTracking] ON [edfi].[AcademicWeek] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AcademicWeek_TrackedDelete(SchoolId, WeekIdentifier, Id, ChangeVersion)
    SELECT  SchoolId, WeekIdentifier, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AcademicWeek_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId AND d2.WeekIdentifier = d.WeekIdentifier)
END
GO

ALTER TABLE [edfi].[AcademicWeek] ENABLE TRIGGER [AcademicWeekDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccommodationDescriptorDeletedForTracking] ON [edfi].[AccommodationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AccommodationDescriptor_TrackedDelete(AccommodationDescriptorId, Id, ChangeVersion)
    SELECT  d.AccommodationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AccommodationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AccommodationDescriptor_TrackedDelete d2 WHERE d2.AccommodationDescriptorId = d.AccommodationDescriptorId)
END
GO

ALTER TABLE [edfi].[AccommodationDescriptor] ENABLE TRIGGER [AccommodationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountClassificationDescriptorDeletedForTracking] ON [edfi].[AccountClassificationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AccountClassificationDescriptor_TrackedDelete(AccountClassificationDescriptorId, Id, ChangeVersion)
    SELECT  d.AccountClassificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AccountClassificationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AccountClassificationDescriptor_TrackedDelete d2 WHERE d2.AccountClassificationDescriptorId = d.AccountClassificationDescriptorId)
END
GO

ALTER TABLE [edfi].[AccountClassificationDescriptor] ENABLE TRIGGER [AccountClassificationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountCodeDeletedForTracking] ON [edfi].[AccountCode] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AccountCode_TrackedDelete(AccountClassificationDescriptorId, AccountCodeNumber, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountClassificationDescriptorId, AccountCodeNumber, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AccountCode_TrackedDelete d2 WHERE d2.AccountClassificationDescriptorId = d.AccountClassificationDescriptorId AND d2.AccountCodeNumber = d.AccountCodeNumber AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[AccountCode] ENABLE TRIGGER [AccountCodeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountDeletedForTracking] ON [edfi].[Account] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Account_TrackedDelete(AccountIdentifier, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountIdentifier, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Account_TrackedDelete d2 WHERE d2.AccountIdentifier = d.AccountIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Account] ENABLE TRIGGER [AccountDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AccountabilityRatingDeletedForTracking] ON [edfi].[AccountabilityRating] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AccountabilityRating_TrackedDelete(EducationOrganizationId, RatingTitle, SchoolYear, Id, ChangeVersion)
    SELECT  EducationOrganizationId, RatingTitle, SchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AccountabilityRating_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.RatingTitle = d.RatingTitle AND d2.SchoolYear = d.SchoolYear)
END
GO

ALTER TABLE [edfi].[AccountabilityRating] ENABLE TRIGGER [AccountabilityRatingDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AchievementCategoryDescriptorDeletedForTracking] ON [edfi].[AchievementCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AchievementCategoryDescriptor_TrackedDelete(AchievementCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AchievementCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AchievementCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AchievementCategoryDescriptor_TrackedDelete d2 WHERE d2.AchievementCategoryDescriptorId = d.AchievementCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AchievementCategoryDescriptor] ENABLE TRIGGER [AchievementCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ActualDeletedForTracking] ON [edfi].[Actual] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Actual_TrackedDelete(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Actual_TrackedDelete d2 WHERE d2.AccountIdentifier = d.AccountIdentifier AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Actual] ENABLE TRIGGER [ActualDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdditionalCreditTypeDescriptorDeletedForTracking] ON [edfi].[AdditionalCreditTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AdditionalCreditTypeDescriptor_TrackedDelete(AdditionalCreditTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.AdditionalCreditTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AdditionalCreditTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AdditionalCreditTypeDescriptor_TrackedDelete d2 WHERE d2.AdditionalCreditTypeDescriptorId = d.AdditionalCreditTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[AdditionalCreditTypeDescriptor] ENABLE TRIGGER [AdditionalCreditTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AddressTypeDescriptorDeletedForTracking] ON [edfi].[AddressTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AddressTypeDescriptor_TrackedDelete(AddressTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.AddressTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AddressTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AddressTypeDescriptor_TrackedDelete d2 WHERE d2.AddressTypeDescriptorId = d.AddressTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[AddressTypeDescriptor] ENABLE TRIGGER [AddressTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdministrationEnvironmentDescriptorDeletedForTracking] ON [edfi].[AdministrationEnvironmentDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AdministrationEnvironmentDescriptor_TrackedDelete(AdministrationEnvironmentDescriptorId, Id, ChangeVersion)
    SELECT  d.AdministrationEnvironmentDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AdministrationEnvironmentDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AdministrationEnvironmentDescriptor_TrackedDelete d2 WHERE d2.AdministrationEnvironmentDescriptorId = d.AdministrationEnvironmentDescriptorId)
END
GO

ALTER TABLE [edfi].[AdministrationEnvironmentDescriptor] ENABLE TRIGGER [AdministrationEnvironmentDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AdministrativeFundingControlDescriptorDeletedForTracking] ON [edfi].[AdministrativeFundingControlDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AdministrativeFundingControlDescriptor_TrackedDelete(AdministrativeFundingControlDescriptorId, Id, ChangeVersion)
    SELECT  d.AdministrativeFundingControlDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AdministrativeFundingControlDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AdministrativeFundingControlDescriptor_TrackedDelete d2 WHERE d2.AdministrativeFundingControlDescriptorId = d.AdministrativeFundingControlDescriptorId)
END
GO

ALTER TABLE [edfi].[AdministrativeFundingControlDescriptor] ENABLE TRIGGER [AdministrativeFundingControlDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentCategoryDescriptorDeletedForTracking] ON [edfi].[AssessmentCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentCategoryDescriptor_TrackedDelete(AssessmentCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentCategoryDescriptor_TrackedDelete d2 WHERE d2.AssessmentCategoryDescriptorId = d.AssessmentCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentCategoryDescriptor] ENABLE TRIGGER [AssessmentCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentDeletedForTracking] ON [edfi].[Assessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Assessment_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Assessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.AssessmentVersion = d.AssessmentVersion)
END
GO

ALTER TABLE [edfi].[Assessment] ENABLE TRIGGER [AssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[AssessmentIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete(AssessmentIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.AssessmentIdentificationSystemDescriptorId = d.AssessmentIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentIdentificationSystemDescriptor] ENABLE TRIGGER [AssessmentIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemCategoryDescriptorDeletedForTracking] ON [edfi].[AssessmentItemCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentItemCategoryDescriptor_TrackedDelete(AssessmentItemCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentItemCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentItemCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentItemCategoryDescriptor_TrackedDelete d2 WHERE d2.AssessmentItemCategoryDescriptorId = d.AssessmentItemCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentItemCategoryDescriptor] ENABLE TRIGGER [AssessmentItemCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemDeletedForTracking] ON [edfi].[AssessmentItem] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentItem_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, IdentificationCode, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, IdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentItem_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.AssessmentVersion = d.AssessmentVersion AND d2.IdentificationCode = d.IdentificationCode)
END
GO

ALTER TABLE [edfi].[AssessmentItem] ENABLE TRIGGER [AssessmentItemDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentItemResultDescriptorDeletedForTracking] ON [edfi].[AssessmentItemResultDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentItemResultDescriptor_TrackedDelete(AssessmentItemResultDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentItemResultDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentItemResultDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentItemResultDescriptor_TrackedDelete d2 WHERE d2.AssessmentItemResultDescriptorId = d.AssessmentItemResultDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentItemResultDescriptor] ENABLE TRIGGER [AssessmentItemResultDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentPeriodDescriptorDeletedForTracking] ON [edfi].[AssessmentPeriodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentPeriodDescriptor_TrackedDelete(AssessmentPeriodDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentPeriodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentPeriodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentPeriodDescriptor_TrackedDelete d2 WHERE d2.AssessmentPeriodDescriptorId = d.AssessmentPeriodDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentPeriodDescriptor] ENABLE TRIGGER [AssessmentPeriodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AssessmentReportingMethodDescriptorDeletedForTracking] ON [edfi].[AssessmentReportingMethodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AssessmentReportingMethodDescriptor_TrackedDelete(AssessmentReportingMethodDescriptorId, Id, ChangeVersion)
    SELECT  d.AssessmentReportingMethodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AssessmentReportingMethodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AssessmentReportingMethodDescriptor_TrackedDelete d2 WHERE d2.AssessmentReportingMethodDescriptorId = d.AssessmentReportingMethodDescriptorId)
END
GO

ALTER TABLE [edfi].[AssessmentReportingMethodDescriptor] ENABLE TRIGGER [AssessmentReportingMethodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AttemptStatusDescriptorDeletedForTracking] ON [edfi].[AttemptStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AttemptStatusDescriptor_TrackedDelete(AttemptStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.AttemptStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AttemptStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AttemptStatusDescriptor_TrackedDelete d2 WHERE d2.AttemptStatusDescriptorId = d.AttemptStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[AttemptStatusDescriptor] ENABLE TRIGGER [AttemptStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[AttendanceEventCategoryDescriptorDeletedForTracking] ON [edfi].[AttendanceEventCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_AttendanceEventCategoryDescriptor_TrackedDelete(AttendanceEventCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.AttendanceEventCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.AttendanceEventCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_AttendanceEventCategoryDescriptor_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[AttendanceEventCategoryDescriptor] ENABLE TRIGGER [AttendanceEventCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BehaviorDescriptorDeletedForTracking] ON [edfi].[BehaviorDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_BehaviorDescriptor_TrackedDelete(BehaviorDescriptorId, Id, ChangeVersion)
    SELECT  d.BehaviorDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.BehaviorDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_BehaviorDescriptor_TrackedDelete d2 WHERE d2.BehaviorDescriptorId = d.BehaviorDescriptorId)
END
GO

ALTER TABLE [edfi].[BehaviorDescriptor] ENABLE TRIGGER [BehaviorDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BellScheduleDeletedForTracking] ON [edfi].[BellSchedule] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_BellSchedule_TrackedDelete(BellScheduleName, SchoolId, Id, ChangeVersion)
    SELECT  BellScheduleName, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_BellSchedule_TrackedDelete d2 WHERE d2.BellScheduleName = d.BellScheduleName AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[BellSchedule] ENABLE TRIGGER [BellScheduleDeletedForTracking]
GO


CREATE TRIGGER [edfi].[BudgetDeletedForTracking] ON [edfi].[Budget] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Budget_TrackedDelete(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    SELECT  AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Budget_TrackedDelete d2 WHERE d2.AccountIdentifier = d.AccountIdentifier AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear)
END
GO

ALTER TABLE [edfi].[Budget] ENABLE TRIGGER [BudgetDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarDateDeletedForTracking] ON [edfi].[CalendarDate] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CalendarDate_TrackedDelete(CalendarCode, Date, SchoolId, SchoolYear, Id, ChangeVersion)
    SELECT  CalendarCode, Date, SchoolId, SchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CalendarDate_TrackedDelete d2 WHERE d2.CalendarCode = d.CalendarCode AND d2.Date = d.Date AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear)
END
GO

ALTER TABLE [edfi].[CalendarDate] ENABLE TRIGGER [CalendarDateDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarDeletedForTracking] ON [edfi].[Calendar] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Calendar_TrackedDelete(CalendarCode, SchoolId, SchoolYear, Id, ChangeVersion)
    SELECT  CalendarCode, SchoolId, SchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Calendar_TrackedDelete d2 WHERE d2.CalendarCode = d.CalendarCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear)
END
GO

ALTER TABLE [edfi].[Calendar] ENABLE TRIGGER [CalendarDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarEventDescriptorDeletedForTracking] ON [edfi].[CalendarEventDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CalendarEventDescriptor_TrackedDelete(CalendarEventDescriptorId, Id, ChangeVersion)
    SELECT  d.CalendarEventDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CalendarEventDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CalendarEventDescriptor_TrackedDelete d2 WHERE d2.CalendarEventDescriptorId = d.CalendarEventDescriptorId)
END
GO

ALTER TABLE [edfi].[CalendarEventDescriptor] ENABLE TRIGGER [CalendarEventDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CalendarTypeDescriptorDeletedForTracking] ON [edfi].[CalendarTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CalendarTypeDescriptor_TrackedDelete(CalendarTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CalendarTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CalendarTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CalendarTypeDescriptor_TrackedDelete d2 WHERE d2.CalendarTypeDescriptorId = d.CalendarTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CalendarTypeDescriptor] ENABLE TRIGGER [CalendarTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CareerPathwayDescriptorDeletedForTracking] ON [edfi].[CareerPathwayDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CareerPathwayDescriptor_TrackedDelete(CareerPathwayDescriptorId, Id, ChangeVersion)
    SELECT  d.CareerPathwayDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CareerPathwayDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CareerPathwayDescriptor_TrackedDelete d2 WHERE d2.CareerPathwayDescriptorId = d.CareerPathwayDescriptorId)
END
GO

ALTER TABLE [edfi].[CareerPathwayDescriptor] ENABLE TRIGGER [CareerPathwayDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CharterApprovalAgencyTypeDescriptorDeletedForTracking] ON [edfi].[CharterApprovalAgencyTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CharterApprovalAgencyTypeDescriptor_TrackedDelete(CharterApprovalAgencyTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CharterApprovalAgencyTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CharterApprovalAgencyTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CharterApprovalAgencyTypeDescriptor_TrackedDelete d2 WHERE d2.CharterApprovalAgencyTypeDescriptorId = d.CharterApprovalAgencyTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CharterApprovalAgencyTypeDescriptor] ENABLE TRIGGER [CharterApprovalAgencyTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CharterStatusDescriptorDeletedForTracking] ON [edfi].[CharterStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CharterStatusDescriptor_TrackedDelete(CharterStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.CharterStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CharterStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CharterStatusDescriptor_TrackedDelete d2 WHERE d2.CharterStatusDescriptorId = d.CharterStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[CharterStatusDescriptor] ENABLE TRIGGER [CharterStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CitizenshipStatusDescriptorDeletedForTracking] ON [edfi].[CitizenshipStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CitizenshipStatusDescriptor_TrackedDelete(CitizenshipStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.CitizenshipStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CitizenshipStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CitizenshipStatusDescriptor_TrackedDelete d2 WHERE d2.CitizenshipStatusDescriptorId = d.CitizenshipStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[CitizenshipStatusDescriptor] ENABLE TRIGGER [CitizenshipStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ClassPeriodDeletedForTracking] ON [edfi].[ClassPeriod] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ClassPeriod_TrackedDelete(ClassPeriodName, SchoolId, Id, ChangeVersion)
    SELECT  ClassPeriodName, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ClassPeriod_TrackedDelete d2 WHERE d2.ClassPeriodName = d.ClassPeriodName AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[ClassPeriod] ENABLE TRIGGER [ClassPeriodDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ClassroomPositionDescriptorDeletedForTracking] ON [edfi].[ClassroomPositionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ClassroomPositionDescriptor_TrackedDelete(ClassroomPositionDescriptorId, Id, ChangeVersion)
    SELECT  d.ClassroomPositionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ClassroomPositionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ClassroomPositionDescriptor_TrackedDelete d2 WHERE d2.ClassroomPositionDescriptorId = d.ClassroomPositionDescriptorId)
END
GO

ALTER TABLE [edfi].[ClassroomPositionDescriptor] ENABLE TRIGGER [ClassroomPositionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortDeletedForTracking] ON [edfi].[Cohort] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Cohort_TrackedDelete(CohortIdentifier, EducationOrganizationId, Id, ChangeVersion)
    SELECT  CohortIdentifier, EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Cohort_TrackedDelete d2 WHERE d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[Cohort] ENABLE TRIGGER [CohortDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortScopeDescriptorDeletedForTracking] ON [edfi].[CohortScopeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CohortScopeDescriptor_TrackedDelete(CohortScopeDescriptorId, Id, ChangeVersion)
    SELECT  d.CohortScopeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CohortScopeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CohortScopeDescriptor_TrackedDelete d2 WHERE d2.CohortScopeDescriptorId = d.CohortScopeDescriptorId)
END
GO

ALTER TABLE [edfi].[CohortScopeDescriptor] ENABLE TRIGGER [CohortScopeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortTypeDescriptorDeletedForTracking] ON [edfi].[CohortTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CohortTypeDescriptor_TrackedDelete(CohortTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CohortTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CohortTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CohortTypeDescriptor_TrackedDelete d2 WHERE d2.CohortTypeDescriptorId = d.CohortTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CohortTypeDescriptor] ENABLE TRIGGER [CohortTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CohortYearTypeDescriptorDeletedForTracking] ON [edfi].[CohortYearTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CohortYearTypeDescriptor_TrackedDelete(CohortYearTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CohortYearTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CohortYearTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CohortYearTypeDescriptor_TrackedDelete d2 WHERE d2.CohortYearTypeDescriptorId = d.CohortYearTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CohortYearTypeDescriptor] ENABLE TRIGGER [CohortYearTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CommunityOrganizationDeletedForTracking] ON [edfi].[CommunityOrganization] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CommunityOrganization_TrackedDelete(CommunityOrganizationId, Id, ChangeVersion)
    SELECT  d.CommunityOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.CommunityOrganizationId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CommunityOrganization_TrackedDelete d2 WHERE d2.CommunityOrganizationId = d.CommunityOrganizationId)
END
GO

ALTER TABLE [edfi].[CommunityOrganization] ENABLE TRIGGER [CommunityOrganizationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CommunityProviderDeletedForTracking] ON [edfi].[CommunityProvider] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CommunityProvider_TrackedDelete(CommunityProviderId, Id, ChangeVersion)
    SELECT  d.CommunityProviderId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.CommunityProviderId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CommunityProvider_TrackedDelete d2 WHERE d2.CommunityProviderId = d.CommunityProviderId)
END
GO

ALTER TABLE [edfi].[CommunityProvider] ENABLE TRIGGER [CommunityProviderDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CommunityProviderLicenseDeletedForTracking] ON [edfi].[CommunityProviderLicense] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CommunityProviderLicense_TrackedDelete(CommunityProviderId, LicenseIdentifier, LicensingOrganization, Id, ChangeVersion)
    SELECT  CommunityProviderId, LicenseIdentifier, LicensingOrganization, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CommunityProviderLicense_TrackedDelete d2 WHERE d2.CommunityProviderId = d.CommunityProviderId AND d2.LicenseIdentifier = d.LicenseIdentifier AND d2.LicensingOrganization = d.LicensingOrganization)
END
GO

ALTER TABLE [edfi].[CommunityProviderLicense] ENABLE TRIGGER [CommunityProviderLicenseDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CompetencyLevelDescriptorDeletedForTracking] ON [edfi].[CompetencyLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CompetencyLevelDescriptor_TrackedDelete(CompetencyLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.CompetencyLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CompetencyLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CompetencyLevelDescriptor_TrackedDelete d2 WHERE d2.CompetencyLevelDescriptorId = d.CompetencyLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[CompetencyLevelDescriptor] ENABLE TRIGGER [CompetencyLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CompetencyObjectiveDeletedForTracking] ON [edfi].[CompetencyObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CompetencyObjective_TrackedDelete(EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CompetencyObjective_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[CompetencyObjective] ENABLE TRIGGER [CompetencyObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContactTypeDescriptorDeletedForTracking] ON [edfi].[ContactTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ContactTypeDescriptor_TrackedDelete(ContactTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ContactTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ContactTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ContactTypeDescriptor_TrackedDelete d2 WHERE d2.ContactTypeDescriptorId = d.ContactTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ContactTypeDescriptor] ENABLE TRIGGER [ContactTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContentClassDescriptorDeletedForTracking] ON [edfi].[ContentClassDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ContentClassDescriptor_TrackedDelete(ContentClassDescriptorId, Id, ChangeVersion)
    SELECT  d.ContentClassDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ContentClassDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ContentClassDescriptor_TrackedDelete d2 WHERE d2.ContentClassDescriptorId = d.ContentClassDescriptorId)
END
GO

ALTER TABLE [edfi].[ContentClassDescriptor] ENABLE TRIGGER [ContentClassDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContinuationOfServicesReasonDescriptorDeletedForTracking] ON [edfi].[ContinuationOfServicesReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete(ContinuationOfServicesReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.ContinuationOfServicesReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ContinuationOfServicesReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ContinuationOfServicesReasonDescriptor_TrackedDelete d2 WHERE d2.ContinuationOfServicesReasonDescriptorId = d.ContinuationOfServicesReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[ContinuationOfServicesReasonDescriptor] ENABLE TRIGGER [ContinuationOfServicesReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ContractedStaffDeletedForTracking] ON [edfi].[ContractedStaff] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ContractedStaff_TrackedDelete(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    SELECT  AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ContractedStaff_TrackedDelete d2 WHERE d2.AccountIdentifier = d.AccountIdentifier AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[ContractedStaff] ENABLE TRIGGER [ContractedStaffDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CostRateDescriptorDeletedForTracking] ON [edfi].[CostRateDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CostRateDescriptor_TrackedDelete(CostRateDescriptorId, Id, ChangeVersion)
    SELECT  d.CostRateDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CostRateDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CostRateDescriptor_TrackedDelete d2 WHERE d2.CostRateDescriptorId = d.CostRateDescriptorId)
END
GO

ALTER TABLE [edfi].[CostRateDescriptor] ENABLE TRIGGER [CostRateDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CountryDescriptorDeletedForTracking] ON [edfi].[CountryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CountryDescriptor_TrackedDelete(CountryDescriptorId, Id, ChangeVersion)
    SELECT  d.CountryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CountryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CountryDescriptor_TrackedDelete d2 WHERE d2.CountryDescriptorId = d.CountryDescriptorId)
END
GO

ALTER TABLE [edfi].[CountryDescriptor] ENABLE TRIGGER [CountryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseAttemptResultDescriptorDeletedForTracking] ON [edfi].[CourseAttemptResultDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseAttemptResultDescriptor_TrackedDelete(CourseAttemptResultDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseAttemptResultDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseAttemptResultDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseAttemptResultDescriptor_TrackedDelete d2 WHERE d2.CourseAttemptResultDescriptorId = d.CourseAttemptResultDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseAttemptResultDescriptor] ENABLE TRIGGER [CourseAttemptResultDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseDefinedByDescriptorDeletedForTracking] ON [edfi].[CourseDefinedByDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseDefinedByDescriptor_TrackedDelete(CourseDefinedByDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseDefinedByDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseDefinedByDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseDefinedByDescriptor_TrackedDelete d2 WHERE d2.CourseDefinedByDescriptorId = d.CourseDefinedByDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseDefinedByDescriptor] ENABLE TRIGGER [CourseDefinedByDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseDeletedForTracking] ON [edfi].[Course] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Course_TrackedDelete(CourseCode, EducationOrganizationId, Id, ChangeVersion)
    SELECT  CourseCode, EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Course_TrackedDelete d2 WHERE d2.CourseCode = d.CourseCode AND d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[Course] ENABLE TRIGGER [CourseDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseGPAApplicabilityDescriptorDeletedForTracking] ON [edfi].[CourseGPAApplicabilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseGPAApplicabilityDescriptor_TrackedDelete(CourseGPAApplicabilityDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseGPAApplicabilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseGPAApplicabilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseGPAApplicabilityDescriptor_TrackedDelete d2 WHERE d2.CourseGPAApplicabilityDescriptorId = d.CourseGPAApplicabilityDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseGPAApplicabilityDescriptor] ENABLE TRIGGER [CourseGPAApplicabilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[CourseIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseIdentificationSystemDescriptor_TrackedDelete(CourseIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.CourseIdentificationSystemDescriptorId = d.CourseIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseIdentificationSystemDescriptor] ENABLE TRIGGER [CourseIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseLevelCharacteristicDescriptorDeletedForTracking] ON [edfi].[CourseLevelCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseLevelCharacteristicDescriptor_TrackedDelete(CourseLevelCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseLevelCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseLevelCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseLevelCharacteristicDescriptor_TrackedDelete d2 WHERE d2.CourseLevelCharacteristicDescriptorId = d.CourseLevelCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseLevelCharacteristicDescriptor] ENABLE TRIGGER [CourseLevelCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseOfferingDeletedForTracking] ON [edfi].[CourseOffering] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseOffering_TrackedDelete(LocalCourseCode, SchoolId, SchoolYear, SessionName, Id, ChangeVersion)
    SELECT  LocalCourseCode, SchoolId, SchoolYear, SessionName, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseOffering_TrackedDelete d2 WHERE d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SessionName = d.SessionName)
END
GO

ALTER TABLE [edfi].[CourseOffering] ENABLE TRIGGER [CourseOfferingDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseRepeatCodeDescriptorDeletedForTracking] ON [edfi].[CourseRepeatCodeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseRepeatCodeDescriptor_TrackedDelete(CourseRepeatCodeDescriptorId, Id, ChangeVersion)
    SELECT  d.CourseRepeatCodeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CourseRepeatCodeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseRepeatCodeDescriptor_TrackedDelete d2 WHERE d2.CourseRepeatCodeDescriptorId = d.CourseRepeatCodeDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseRepeatCodeDescriptor] ENABLE TRIGGER [CourseRepeatCodeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CourseTranscriptDeletedForTracking] ON [edfi].[CourseTranscript] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CourseTranscript_TrackedDelete(CourseAttemptResultDescriptorId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    SELECT  CourseAttemptResultDescriptorId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CourseTranscript_TrackedDelete d2 WHERE d2.CourseAttemptResultDescriptorId = d.CourseAttemptResultDescriptorId AND d2.CourseCode = d.CourseCode AND d2.CourseEducationOrganizationId = d.CourseEducationOrganizationId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.SchoolYear = d.SchoolYear AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[CourseTranscript] ENABLE TRIGGER [CourseTranscriptDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CredentialDeletedForTracking] ON [edfi].[Credential] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Credential_TrackedDelete(CredentialIdentifier, StateOfIssueStateAbbreviationDescriptorId, Id, ChangeVersion)
    SELECT  CredentialIdentifier, StateOfIssueStateAbbreviationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Credential_TrackedDelete d2 WHERE d2.CredentialIdentifier = d.CredentialIdentifier AND d2.StateOfIssueStateAbbreviationDescriptorId = d.StateOfIssueStateAbbreviationDescriptorId)
END
GO

ALTER TABLE [edfi].[Credential] ENABLE TRIGGER [CredentialDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CredentialFieldDescriptorDeletedForTracking] ON [edfi].[CredentialFieldDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CredentialFieldDescriptor_TrackedDelete(CredentialFieldDescriptorId, Id, ChangeVersion)
    SELECT  d.CredentialFieldDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CredentialFieldDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CredentialFieldDescriptor_TrackedDelete d2 WHERE d2.CredentialFieldDescriptorId = d.CredentialFieldDescriptorId)
END
GO

ALTER TABLE [edfi].[CredentialFieldDescriptor] ENABLE TRIGGER [CredentialFieldDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CredentialTypeDescriptorDeletedForTracking] ON [edfi].[CredentialTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CredentialTypeDescriptor_TrackedDelete(CredentialTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CredentialTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CredentialTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CredentialTypeDescriptor_TrackedDelete d2 WHERE d2.CredentialTypeDescriptorId = d.CredentialTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CredentialTypeDescriptor] ENABLE TRIGGER [CredentialTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CreditTypeDescriptorDeletedForTracking] ON [edfi].[CreditTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CreditTypeDescriptor_TrackedDelete(CreditTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.CreditTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CreditTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CreditTypeDescriptor_TrackedDelete d2 WHERE d2.CreditTypeDescriptorId = d.CreditTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[CreditTypeDescriptor] ENABLE TRIGGER [CreditTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[CurriculumUsedDescriptorDeletedForTracking] ON [edfi].[CurriculumUsedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_CurriculumUsedDescriptor_TrackedDelete(CurriculumUsedDescriptorId, Id, ChangeVersion)
    SELECT  d.CurriculumUsedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.CurriculumUsedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_CurriculumUsedDescriptor_TrackedDelete d2 WHERE d2.CurriculumUsedDescriptorId = d.CurriculumUsedDescriptorId)
END
GO

ALTER TABLE [edfi].[CurriculumUsedDescriptor] ENABLE TRIGGER [CurriculumUsedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DeliveryMethodDescriptorDeletedForTracking] ON [edfi].[DeliveryMethodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DeliveryMethodDescriptor_TrackedDelete(DeliveryMethodDescriptorId, Id, ChangeVersion)
    SELECT  d.DeliveryMethodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DeliveryMethodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DeliveryMethodDescriptor_TrackedDelete d2 WHERE d2.DeliveryMethodDescriptorId = d.DeliveryMethodDescriptorId)
END
GO

ALTER TABLE [edfi].[DeliveryMethodDescriptor] ENABLE TRIGGER [DeliveryMethodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DescriptorDeletedForTracking] ON [edfi].[Descriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Descriptor_TrackedDelete(DescriptorId, Id, ChangeVersion)
    SELECT  DescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Descriptor_TrackedDelete d2 WHERE d2.DescriptorId = d.DescriptorId)
END
GO

ALTER TABLE [edfi].[Descriptor] ENABLE TRIGGER [DescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiagnosisDescriptorDeletedForTracking] ON [edfi].[DiagnosisDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DiagnosisDescriptor_TrackedDelete(DiagnosisDescriptorId, Id, ChangeVersion)
    SELECT  d.DiagnosisDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DiagnosisDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DiagnosisDescriptor_TrackedDelete d2 WHERE d2.DiagnosisDescriptorId = d.DiagnosisDescriptorId)
END
GO

ALTER TABLE [edfi].[DiagnosisDescriptor] ENABLE TRIGGER [DiagnosisDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiplomaLevelDescriptorDeletedForTracking] ON [edfi].[DiplomaLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DiplomaLevelDescriptor_TrackedDelete(DiplomaLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.DiplomaLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DiplomaLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DiplomaLevelDescriptor_TrackedDelete d2 WHERE d2.DiplomaLevelDescriptorId = d.DiplomaLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[DiplomaLevelDescriptor] ENABLE TRIGGER [DiplomaLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DiplomaTypeDescriptorDeletedForTracking] ON [edfi].[DiplomaTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DiplomaTypeDescriptor_TrackedDelete(DiplomaTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.DiplomaTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DiplomaTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DiplomaTypeDescriptor_TrackedDelete d2 WHERE d2.DiplomaTypeDescriptorId = d.DiplomaTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[DiplomaTypeDescriptor] ENABLE TRIGGER [DiplomaTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityDescriptorDeletedForTracking] ON [edfi].[DisabilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisabilityDescriptor_TrackedDelete(DisabilityDescriptorId, Id, ChangeVersion)
    SELECT  d.DisabilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisabilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisabilityDescriptor_TrackedDelete d2 WHERE d2.DisabilityDescriptorId = d.DisabilityDescriptorId)
END
GO

ALTER TABLE [edfi].[DisabilityDescriptor] ENABLE TRIGGER [DisabilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityDesignationDescriptorDeletedForTracking] ON [edfi].[DisabilityDesignationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisabilityDesignationDescriptor_TrackedDelete(DisabilityDesignationDescriptorId, Id, ChangeVersion)
    SELECT  d.DisabilityDesignationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisabilityDesignationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisabilityDesignationDescriptor_TrackedDelete d2 WHERE d2.DisabilityDesignationDescriptorId = d.DisabilityDesignationDescriptorId)
END
GO

ALTER TABLE [edfi].[DisabilityDesignationDescriptor] ENABLE TRIGGER [DisabilityDesignationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisabilityDeterminationSourceTypeDescriptorDeletedForTracking] ON [edfi].[DisabilityDeterminationSourceTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisabilityDeterminationSourceTypeDescriptor_TrackedDelete(DisabilityDeterminationSourceTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.DisabilityDeterminationSourceTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisabilityDeterminationSourceTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisabilityDeterminationSourceTypeDescriptor_TrackedDelete d2 WHERE d2.DisabilityDeterminationSourceTypeDescriptorId = d.DisabilityDeterminationSourceTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[DisabilityDeterminationSourceTypeDescriptor] ENABLE TRIGGER [DisabilityDeterminationSourceTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineActionDeletedForTracking] ON [edfi].[DisciplineAction] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisciplineAction_TrackedDelete(DisciplineActionIdentifier, DisciplineDate, StudentUSI, Id, ChangeVersion)
    SELECT  DisciplineActionIdentifier, DisciplineDate, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisciplineAction_TrackedDelete d2 WHERE d2.DisciplineActionIdentifier = d.DisciplineActionIdentifier AND d2.DisciplineDate = d.DisciplineDate AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[DisciplineAction] ENABLE TRIGGER [DisciplineActionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineActionLengthDifferenceReasonDescriptorDeletedForTracking] ON [edfi].[DisciplineActionLengthDifferenceReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisciplineActionLengthDifferenceReasonDescriptor_TrackedDelete(DisciplineActionLengthDifferenceReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.DisciplineActionLengthDifferenceReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisciplineActionLengthDifferenceReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisciplineActionLengthDifferenceReasonDescriptor_TrackedDelete d2 WHERE d2.DisciplineActionLengthDifferenceReasonDescriptorId = d.DisciplineActionLengthDifferenceReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[DisciplineActionLengthDifferenceReasonDescriptor] ENABLE TRIGGER [DisciplineActionLengthDifferenceReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineDescriptorDeletedForTracking] ON [edfi].[DisciplineDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisciplineDescriptor_TrackedDelete(DisciplineDescriptorId, Id, ChangeVersion)
    SELECT  d.DisciplineDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.DisciplineDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisciplineDescriptor_TrackedDelete d2 WHERE d2.DisciplineDescriptorId = d.DisciplineDescriptorId)
END
GO

ALTER TABLE [edfi].[DisciplineDescriptor] ENABLE TRIGGER [DisciplineDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[DisciplineIncidentDeletedForTracking] ON [edfi].[DisciplineIncident] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_DisciplineIncident_TrackedDelete(IncidentIdentifier, SchoolId, Id, ChangeVersion)
    SELECT  IncidentIdentifier, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_DisciplineIncident_TrackedDelete d2 WHERE d2.IncidentIdentifier = d.IncidentIdentifier AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[DisciplineIncident] ENABLE TRIGGER [DisciplineIncidentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationContentDeletedForTracking] ON [edfi].[EducationContent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationContent_TrackedDelete(ContentIdentifier, Id, ChangeVersion)
    SELECT  ContentIdentifier, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationContent_TrackedDelete d2 WHERE d2.ContentIdentifier = d.ContentIdentifier)
END
GO

ALTER TABLE [edfi].[EducationContent] ENABLE TRIGGER [EducationContentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationCategoryDescriptorDeletedForTracking] ON [edfi].[EducationOrganizationCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationCategoryDescriptor_TrackedDelete(EducationOrganizationCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.EducationOrganizationCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EducationOrganizationCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationCategoryDescriptor_TrackedDelete d2 WHERE d2.EducationOrganizationCategoryDescriptorId = d.EducationOrganizationCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationCategoryDescriptor] ENABLE TRIGGER [EducationOrganizationCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationDeletedForTracking] ON [edfi].[EducationOrganization] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganization_TrackedDelete(EducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganization_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganization] ENABLE TRIGGER [EducationOrganizationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[EducationOrganizationIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete(EducationOrganizationIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.EducationOrganizationIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EducationOrganizationIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.EducationOrganizationIdentificationSystemDescriptorId = d.EducationOrganizationIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationIdentificationSystemDescriptor] ENABLE TRIGGER [EducationOrganizationIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationInterventionPrescriptionAssociationDeletedForTracking] ON [edfi].[EducationOrganizationInterventionPrescriptionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete(EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationInterventionPrescriptionAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionPrescriptionEducationOrganizationId = d.InterventionPrescriptionEducationOrganizationId AND d2.InterventionPrescriptionIdentificationCode = d.InterventionPrescriptionIdentificationCode)
END
GO

ALTER TABLE [edfi].[EducationOrganizationInterventionPrescriptionAssociation] ENABLE TRIGGER [EducationOrganizationInterventionPrescriptionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationNetworkAssociationDeletedForTracking] ON [edfi].[EducationOrganizationNetworkAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationNetworkAssociation_TrackedDelete(EducationOrganizationNetworkId, MemberEducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationNetworkId, MemberEducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationNetworkAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationNetworkId = d.EducationOrganizationNetworkId AND d2.MemberEducationOrganizationId = d.MemberEducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationNetworkAssociation] ENABLE TRIGGER [EducationOrganizationNetworkAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationNetworkDeletedForTracking] ON [edfi].[EducationOrganizationNetwork] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationNetwork_TrackedDelete(EducationOrganizationNetworkId, Id, ChangeVersion)
    SELECT  d.EducationOrganizationNetworkId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.EducationOrganizationNetworkId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationNetwork_TrackedDelete d2 WHERE d2.EducationOrganizationNetworkId = d.EducationOrganizationNetworkId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationNetwork] ENABLE TRIGGER [EducationOrganizationNetworkDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationOrganizationPeerAssociationDeletedForTracking] ON [edfi].[EducationOrganizationPeerAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationOrganizationPeerAssociation_TrackedDelete(EducationOrganizationId, PeerEducationOrganizationId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, PeerEducationOrganizationId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationOrganizationPeerAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.PeerEducationOrganizationId = d.PeerEducationOrganizationId)
END
GO

ALTER TABLE [edfi].[EducationOrganizationPeerAssociation] ENABLE TRIGGER [EducationOrganizationPeerAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationPlanDescriptorDeletedForTracking] ON [edfi].[EducationPlanDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationPlanDescriptor_TrackedDelete(EducationPlanDescriptorId, Id, ChangeVersion)
    SELECT  d.EducationPlanDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EducationPlanDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationPlanDescriptor_TrackedDelete d2 WHERE d2.EducationPlanDescriptorId = d.EducationPlanDescriptorId)
END
GO

ALTER TABLE [edfi].[EducationPlanDescriptor] ENABLE TRIGGER [EducationPlanDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationServiceCenterDeletedForTracking] ON [edfi].[EducationServiceCenter] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationServiceCenter_TrackedDelete(EducationServiceCenterId, Id, ChangeVersion)
    SELECT  d.EducationServiceCenterId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.EducationServiceCenterId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationServiceCenter_TrackedDelete d2 WHERE d2.EducationServiceCenterId = d.EducationServiceCenterId)
END
GO

ALTER TABLE [edfi].[EducationServiceCenter] ENABLE TRIGGER [EducationServiceCenterDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EducationalEnvironmentDescriptorDeletedForTracking] ON [edfi].[EducationalEnvironmentDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EducationalEnvironmentDescriptor_TrackedDelete(EducationalEnvironmentDescriptorId, Id, ChangeVersion)
    SELECT  d.EducationalEnvironmentDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EducationalEnvironmentDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EducationalEnvironmentDescriptor_TrackedDelete d2 WHERE d2.EducationalEnvironmentDescriptorId = d.EducationalEnvironmentDescriptorId)
END
GO

ALTER TABLE [edfi].[EducationalEnvironmentDescriptor] ENABLE TRIGGER [EducationalEnvironmentDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ElectronicMailTypeDescriptorDeletedForTracking] ON [edfi].[ElectronicMailTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ElectronicMailTypeDescriptor_TrackedDelete(ElectronicMailTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ElectronicMailTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ElectronicMailTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ElectronicMailTypeDescriptor_TrackedDelete d2 WHERE d2.ElectronicMailTypeDescriptorId = d.ElectronicMailTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ElectronicMailTypeDescriptor] ENABLE TRIGGER [ElectronicMailTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EmploymentStatusDescriptorDeletedForTracking] ON [edfi].[EmploymentStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EmploymentStatusDescriptor_TrackedDelete(EmploymentStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.EmploymentStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EmploymentStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EmploymentStatusDescriptor_TrackedDelete d2 WHERE d2.EmploymentStatusDescriptorId = d.EmploymentStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[EmploymentStatusDescriptor] ENABLE TRIGGER [EmploymentStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EntryGradeLevelReasonDescriptorDeletedForTracking] ON [edfi].[EntryGradeLevelReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EntryGradeLevelReasonDescriptor_TrackedDelete(EntryGradeLevelReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.EntryGradeLevelReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EntryGradeLevelReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EntryGradeLevelReasonDescriptor_TrackedDelete d2 WHERE d2.EntryGradeLevelReasonDescriptorId = d.EntryGradeLevelReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[EntryGradeLevelReasonDescriptor] ENABLE TRIGGER [EntryGradeLevelReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EntryTypeDescriptorDeletedForTracking] ON [edfi].[EntryTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EntryTypeDescriptor_TrackedDelete(EntryTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.EntryTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EntryTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EntryTypeDescriptor_TrackedDelete d2 WHERE d2.EntryTypeDescriptorId = d.EntryTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[EntryTypeDescriptor] ENABLE TRIGGER [EntryTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[EventCircumstanceDescriptorDeletedForTracking] ON [edfi].[EventCircumstanceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_EventCircumstanceDescriptor_TrackedDelete(EventCircumstanceDescriptorId, Id, ChangeVersion)
    SELECT  d.EventCircumstanceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.EventCircumstanceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_EventCircumstanceDescriptor_TrackedDelete d2 WHERE d2.EventCircumstanceDescriptorId = d.EventCircumstanceDescriptorId)
END
GO

ALTER TABLE [edfi].[EventCircumstanceDescriptor] ENABLE TRIGGER [EventCircumstanceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ExitWithdrawTypeDescriptorDeletedForTracking] ON [edfi].[ExitWithdrawTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ExitWithdrawTypeDescriptor_TrackedDelete(ExitWithdrawTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ExitWithdrawTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ExitWithdrawTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ExitWithdrawTypeDescriptor_TrackedDelete d2 WHERE d2.ExitWithdrawTypeDescriptorId = d.ExitWithdrawTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ExitWithdrawTypeDescriptor] ENABLE TRIGGER [ExitWithdrawTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[FeederSchoolAssociationDeletedForTracking] ON [edfi].[FeederSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_FeederSchoolAssociation_TrackedDelete(BeginDate, FeederSchoolId, SchoolId, Id, ChangeVersion)
    SELECT  BeginDate, FeederSchoolId, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_FeederSchoolAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.FeederSchoolId = d.FeederSchoolId AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[FeederSchoolAssociation] ENABLE TRIGGER [FeederSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GeneralStudentProgramAssociationDeletedForTracking] ON [edfi].[GeneralStudentProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GeneralStudentProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GeneralStudentProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[GeneralStudentProgramAssociation] ENABLE TRIGGER [GeneralStudentProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeDeletedForTracking] ON [edfi].[Grade] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Grade_TrackedDelete(BeginDate, GradeTypeDescriptorId, GradingPeriodDescriptorId, GradingPeriodSchoolYear, GradingPeriodSequence, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, GradeTypeDescriptorId, GradingPeriodDescriptorId, GradingPeriodSchoolYear, GradingPeriodSequence, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Grade_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.GradeTypeDescriptorId = d.GradeTypeDescriptorId AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.GradingPeriodSchoolYear = d.GradingPeriodSchoolYear AND d2.GradingPeriodSequence = d.GradingPeriodSequence AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[Grade] ENABLE TRIGGER [GradeDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeLevelDescriptorDeletedForTracking] ON [edfi].[GradeLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradeLevelDescriptor_TrackedDelete(GradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.GradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradeLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradeLevelDescriptor_TrackedDelete d2 WHERE d2.GradeLevelDescriptorId = d.GradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[GradeLevelDescriptor] ENABLE TRIGGER [GradeLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradeTypeDescriptorDeletedForTracking] ON [edfi].[GradeTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradeTypeDescriptor_TrackedDelete(GradeTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.GradeTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradeTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradeTypeDescriptor_TrackedDelete d2 WHERE d2.GradeTypeDescriptorId = d.GradeTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[GradeTypeDescriptor] ENABLE TRIGGER [GradeTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradebookEntryDeletedForTracking] ON [edfi].[GradebookEntry] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradebookEntry_TrackedDelete(DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    SELECT  DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradebookEntry_TrackedDelete d2 WHERE d2.DateAssigned = d.DateAssigned AND d2.GradebookEntryTitle = d.GradebookEntryTitle AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName)
END
GO

ALTER TABLE [edfi].[GradebookEntry] ENABLE TRIGGER [GradebookEntryDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradebookEntryTypeDescriptorDeletedForTracking] ON [edfi].[GradebookEntryTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradebookEntryTypeDescriptor_TrackedDelete(GradebookEntryTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.GradebookEntryTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradebookEntryTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradebookEntryTypeDescriptor_TrackedDelete d2 WHERE d2.GradebookEntryTypeDescriptorId = d.GradebookEntryTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[GradebookEntryTypeDescriptor] ENABLE TRIGGER [GradebookEntryTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradingPeriodDeletedForTracking] ON [edfi].[GradingPeriod] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradingPeriod_TrackedDelete(GradingPeriodDescriptorId, PeriodSequence, SchoolId, SchoolYear, Id, ChangeVersion)
    SELECT  GradingPeriodDescriptorId, PeriodSequence, SchoolId, SchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradingPeriod_TrackedDelete d2 WHERE d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.PeriodSequence = d.PeriodSequence AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear)
END
GO

ALTER TABLE [edfi].[GradingPeriod] ENABLE TRIGGER [GradingPeriodDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GradingPeriodDescriptorDeletedForTracking] ON [edfi].[GradingPeriodDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GradingPeriodDescriptor_TrackedDelete(GradingPeriodDescriptorId, Id, ChangeVersion)
    SELECT  d.GradingPeriodDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GradingPeriodDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GradingPeriodDescriptor_TrackedDelete d2 WHERE d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId)
END
GO

ALTER TABLE [edfi].[GradingPeriodDescriptor] ENABLE TRIGGER [GradingPeriodDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GraduationPlanDeletedForTracking] ON [edfi].[GraduationPlan] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GraduationPlan_TrackedDelete(EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear, Id, ChangeVersion)
    SELECT  EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GraduationPlan_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.GraduationPlanTypeDescriptorId = d.GraduationPlanTypeDescriptorId AND d2.GraduationSchoolYear = d.GraduationSchoolYear)
END
GO

ALTER TABLE [edfi].[GraduationPlan] ENABLE TRIGGER [GraduationPlanDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GraduationPlanTypeDescriptorDeletedForTracking] ON [edfi].[GraduationPlanTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GraduationPlanTypeDescriptor_TrackedDelete(GraduationPlanTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.GraduationPlanTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GraduationPlanTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GraduationPlanTypeDescriptor_TrackedDelete d2 WHERE d2.GraduationPlanTypeDescriptorId = d.GraduationPlanTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[GraduationPlanTypeDescriptor] ENABLE TRIGGER [GraduationPlanTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[GunFreeSchoolsActReportingStatusDescriptorDeletedForTracking] ON [edfi].[GunFreeSchoolsActReportingStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_GunFreeSchoolsActReportingStatusDescriptor_TrackedDelete(GunFreeSchoolsActReportingStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.GunFreeSchoolsActReportingStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.GunFreeSchoolsActReportingStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_GunFreeSchoolsActReportingStatusDescriptor_TrackedDelete d2 WHERE d2.GunFreeSchoolsActReportingStatusDescriptorId = d.GunFreeSchoolsActReportingStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[GunFreeSchoolsActReportingStatusDescriptor] ENABLE TRIGGER [GunFreeSchoolsActReportingStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[HomelessPrimaryNighttimeResidenceDescriptorDeletedForTracking] ON [edfi].[HomelessPrimaryNighttimeResidenceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_HomelessPrimaryNighttimeResidenceDescriptor_TrackedDelete(HomelessPrimaryNighttimeResidenceDescriptorId, Id, ChangeVersion)
    SELECT  d.HomelessPrimaryNighttimeResidenceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.HomelessPrimaryNighttimeResidenceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_HomelessPrimaryNighttimeResidenceDescriptor_TrackedDelete d2 WHERE d2.HomelessPrimaryNighttimeResidenceDescriptorId = d.HomelessPrimaryNighttimeResidenceDescriptorId)
END
GO

ALTER TABLE [edfi].[HomelessPrimaryNighttimeResidenceDescriptor] ENABLE TRIGGER [HomelessPrimaryNighttimeResidenceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[HomelessProgramServiceDescriptorDeletedForTracking] ON [edfi].[HomelessProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_HomelessProgramServiceDescriptor_TrackedDelete(HomelessProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.HomelessProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.HomelessProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_HomelessProgramServiceDescriptor_TrackedDelete d2 WHERE d2.HomelessProgramServiceDescriptorId = d.HomelessProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[HomelessProgramServiceDescriptor] ENABLE TRIGGER [HomelessProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[IdentificationDocumentUseDescriptorDeletedForTracking] ON [edfi].[IdentificationDocumentUseDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_IdentificationDocumentUseDescriptor_TrackedDelete(IdentificationDocumentUseDescriptorId, Id, ChangeVersion)
    SELECT  d.IdentificationDocumentUseDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.IdentificationDocumentUseDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_IdentificationDocumentUseDescriptor_TrackedDelete d2 WHERE d2.IdentificationDocumentUseDescriptorId = d.IdentificationDocumentUseDescriptorId)
END
GO

ALTER TABLE [edfi].[IdentificationDocumentUseDescriptor] ENABLE TRIGGER [IdentificationDocumentUseDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[IncidentLocationDescriptorDeletedForTracking] ON [edfi].[IncidentLocationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_IncidentLocationDescriptor_TrackedDelete(IncidentLocationDescriptorId, Id, ChangeVersion)
    SELECT  d.IncidentLocationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.IncidentLocationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_IncidentLocationDescriptor_TrackedDelete d2 WHERE d2.IncidentLocationDescriptorId = d.IncidentLocationDescriptorId)
END
GO

ALTER TABLE [edfi].[IncidentLocationDescriptor] ENABLE TRIGGER [IncidentLocationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InstitutionTelephoneNumberTypeDescriptorDeletedForTracking] ON [edfi].[InstitutionTelephoneNumberTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InstitutionTelephoneNumberTypeDescriptor_TrackedDelete(InstitutionTelephoneNumberTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.InstitutionTelephoneNumberTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InstitutionTelephoneNumberTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InstitutionTelephoneNumberTypeDescriptor_TrackedDelete d2 WHERE d2.InstitutionTelephoneNumberTypeDescriptorId = d.InstitutionTelephoneNumberTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[InstitutionTelephoneNumberTypeDescriptor] ENABLE TRIGGER [InstitutionTelephoneNumberTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InteractivityStyleDescriptorDeletedForTracking] ON [edfi].[InteractivityStyleDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InteractivityStyleDescriptor_TrackedDelete(InteractivityStyleDescriptorId, Id, ChangeVersion)
    SELECT  d.InteractivityStyleDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InteractivityStyleDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InteractivityStyleDescriptor_TrackedDelete d2 WHERE d2.InteractivityStyleDescriptorId = d.InteractivityStyleDescriptorId)
END
GO

ALTER TABLE [edfi].[InteractivityStyleDescriptor] ENABLE TRIGGER [InteractivityStyleDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InternetAccessDescriptorDeletedForTracking] ON [edfi].[InternetAccessDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InternetAccessDescriptor_TrackedDelete(InternetAccessDescriptorId, Id, ChangeVersion)
    SELECT  d.InternetAccessDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InternetAccessDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InternetAccessDescriptor_TrackedDelete d2 WHERE d2.InternetAccessDescriptorId = d.InternetAccessDescriptorId)
END
GO

ALTER TABLE [edfi].[InternetAccessDescriptor] ENABLE TRIGGER [InternetAccessDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionClassDescriptorDeletedForTracking] ON [edfi].[InterventionClassDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InterventionClassDescriptor_TrackedDelete(InterventionClassDescriptorId, Id, ChangeVersion)
    SELECT  d.InterventionClassDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InterventionClassDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InterventionClassDescriptor_TrackedDelete d2 WHERE d2.InterventionClassDescriptorId = d.InterventionClassDescriptorId)
END
GO

ALTER TABLE [edfi].[InterventionClassDescriptor] ENABLE TRIGGER [InterventionClassDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionDeletedForTracking] ON [edfi].[Intervention] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Intervention_TrackedDelete(EducationOrganizationId, InterventionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Intervention_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode)
END
GO

ALTER TABLE [edfi].[Intervention] ENABLE TRIGGER [InterventionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionEffectivenessRatingDescriptorDeletedForTracking] ON [edfi].[InterventionEffectivenessRatingDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InterventionEffectivenessRatingDescriptor_TrackedDelete(InterventionEffectivenessRatingDescriptorId, Id, ChangeVersion)
    SELECT  d.InterventionEffectivenessRatingDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InterventionEffectivenessRatingDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InterventionEffectivenessRatingDescriptor_TrackedDelete d2 WHERE d2.InterventionEffectivenessRatingDescriptorId = d.InterventionEffectivenessRatingDescriptorId)
END
GO

ALTER TABLE [edfi].[InterventionEffectivenessRatingDescriptor] ENABLE TRIGGER [InterventionEffectivenessRatingDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionPrescriptionDeletedForTracking] ON [edfi].[InterventionPrescription] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InterventionPrescription_TrackedDelete(EducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InterventionPrescription_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionPrescriptionIdentificationCode = d.InterventionPrescriptionIdentificationCode)
END
GO

ALTER TABLE [edfi].[InterventionPrescription] ENABLE TRIGGER [InterventionPrescriptionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[InterventionStudyDeletedForTracking] ON [edfi].[InterventionStudy] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_InterventionStudy_TrackedDelete(EducationOrganizationId, InterventionStudyIdentificationCode, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionStudyIdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_InterventionStudy_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionStudyIdentificationCode = d.InterventionStudyIdentificationCode)
END
GO

ALTER TABLE [edfi].[InterventionStudy] ENABLE TRIGGER [InterventionStudyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LanguageDescriptorDeletedForTracking] ON [edfi].[LanguageDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LanguageDescriptor_TrackedDelete(LanguageDescriptorId, Id, ChangeVersion)
    SELECT  d.LanguageDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LanguageDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LanguageDescriptor_TrackedDelete d2 WHERE d2.LanguageDescriptorId = d.LanguageDescriptorId)
END
GO

ALTER TABLE [edfi].[LanguageDescriptor] ENABLE TRIGGER [LanguageDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LanguageInstructionProgramServiceDescriptorDeletedForTracking] ON [edfi].[LanguageInstructionProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LanguageInstructionProgramServiceDescriptor_TrackedDelete(LanguageInstructionProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.LanguageInstructionProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LanguageInstructionProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LanguageInstructionProgramServiceDescriptor_TrackedDelete d2 WHERE d2.LanguageInstructionProgramServiceDescriptorId = d.LanguageInstructionProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[LanguageInstructionProgramServiceDescriptor] ENABLE TRIGGER [LanguageInstructionProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LanguageUseDescriptorDeletedForTracking] ON [edfi].[LanguageUseDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LanguageUseDescriptor_TrackedDelete(LanguageUseDescriptorId, Id, ChangeVersion)
    SELECT  d.LanguageUseDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LanguageUseDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LanguageUseDescriptor_TrackedDelete d2 WHERE d2.LanguageUseDescriptorId = d.LanguageUseDescriptorId)
END
GO

ALTER TABLE [edfi].[LanguageUseDescriptor] ENABLE TRIGGER [LanguageUseDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LearningObjectiveDeletedForTracking] ON [edfi].[LearningObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LearningObjective_TrackedDelete(AcademicSubjectDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, Objective, ObjectiveGradeLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LearningObjective_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[LearningObjective] ENABLE TRIGGER [LearningObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LearningStandardCategoryDescriptorDeletedForTracking] ON [edfi].[LearningStandardCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LearningStandardCategoryDescriptor_TrackedDelete(LearningStandardCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.LearningStandardCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LearningStandardCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LearningStandardCategoryDescriptor_TrackedDelete d2 WHERE d2.LearningStandardCategoryDescriptorId = d.LearningStandardCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[LearningStandardCategoryDescriptor] ENABLE TRIGGER [LearningStandardCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LearningStandardDeletedForTracking] ON [edfi].[LearningStandard] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LearningStandard_TrackedDelete(LearningStandardId, Id, ChangeVersion)
    SELECT  LearningStandardId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LearningStandard_TrackedDelete d2 WHERE d2.LearningStandardId = d.LearningStandardId)
END
GO

ALTER TABLE [edfi].[LearningStandard] ENABLE TRIGGER [LearningStandardDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LevelOfEducationDescriptorDeletedForTracking] ON [edfi].[LevelOfEducationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LevelOfEducationDescriptor_TrackedDelete(LevelOfEducationDescriptorId, Id, ChangeVersion)
    SELECT  d.LevelOfEducationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LevelOfEducationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LevelOfEducationDescriptor_TrackedDelete d2 WHERE d2.LevelOfEducationDescriptorId = d.LevelOfEducationDescriptorId)
END
GO

ALTER TABLE [edfi].[LevelOfEducationDescriptor] ENABLE TRIGGER [LevelOfEducationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LicenseStatusDescriptorDeletedForTracking] ON [edfi].[LicenseStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LicenseStatusDescriptor_TrackedDelete(LicenseStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.LicenseStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LicenseStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LicenseStatusDescriptor_TrackedDelete d2 WHERE d2.LicenseStatusDescriptorId = d.LicenseStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[LicenseStatusDescriptor] ENABLE TRIGGER [LicenseStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LicenseTypeDescriptorDeletedForTracking] ON [edfi].[LicenseTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LicenseTypeDescriptor_TrackedDelete(LicenseTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.LicenseTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LicenseTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LicenseTypeDescriptor_TrackedDelete d2 WHERE d2.LicenseTypeDescriptorId = d.LicenseTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[LicenseTypeDescriptor] ENABLE TRIGGER [LicenseTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LimitedEnglishProficiencyDescriptorDeletedForTracking] ON [edfi].[LimitedEnglishProficiencyDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete(LimitedEnglishProficiencyDescriptorId, Id, ChangeVersion)
    SELECT  d.LimitedEnglishProficiencyDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LimitedEnglishProficiencyDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LimitedEnglishProficiencyDescriptor_TrackedDelete d2 WHERE d2.LimitedEnglishProficiencyDescriptorId = d.LimitedEnglishProficiencyDescriptorId)
END
GO

ALTER TABLE [edfi].[LimitedEnglishProficiencyDescriptor] ENABLE TRIGGER [LimitedEnglishProficiencyDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocalEducationAgencyCategoryDescriptorDeletedForTracking] ON [edfi].[LocalEducationAgencyCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LocalEducationAgencyCategoryDescriptor_TrackedDelete(LocalEducationAgencyCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.LocalEducationAgencyCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.LocalEducationAgencyCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LocalEducationAgencyCategoryDescriptor_TrackedDelete d2 WHERE d2.LocalEducationAgencyCategoryDescriptorId = d.LocalEducationAgencyCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[LocalEducationAgencyCategoryDescriptor] ENABLE TRIGGER [LocalEducationAgencyCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocalEducationAgencyDeletedForTracking] ON [edfi].[LocalEducationAgency] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_LocalEducationAgency_TrackedDelete(LocalEducationAgencyId, Id, ChangeVersion)
    SELECT  d.LocalEducationAgencyId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.LocalEducationAgencyId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_LocalEducationAgency_TrackedDelete d2 WHERE d2.LocalEducationAgencyId = d.LocalEducationAgencyId)
END
GO

ALTER TABLE [edfi].[LocalEducationAgency] ENABLE TRIGGER [LocalEducationAgencyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[LocationDeletedForTracking] ON [edfi].[Location] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Location_TrackedDelete(ClassroomIdentificationCode, SchoolId, Id, ChangeVersion)
    SELECT  ClassroomIdentificationCode, SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Location_TrackedDelete d2 WHERE d2.ClassroomIdentificationCode = d.ClassroomIdentificationCode AND d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[Location] ENABLE TRIGGER [LocationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MagnetSpecialProgramEmphasisSchoolDescriptorDeletedForTracking] ON [edfi].[MagnetSpecialProgramEmphasisSchoolDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_MagnetSpecialProgramEmphasisSchoolDescriptor_TrackedDelete(MagnetSpecialProgramEmphasisSchoolDescriptorId, Id, ChangeVersion)
    SELECT  d.MagnetSpecialProgramEmphasisSchoolDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.MagnetSpecialProgramEmphasisSchoolDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_MagnetSpecialProgramEmphasisSchoolDescriptor_TrackedDelete d2 WHERE d2.MagnetSpecialProgramEmphasisSchoolDescriptorId = d.MagnetSpecialProgramEmphasisSchoolDescriptorId)
END
GO

ALTER TABLE [edfi].[MagnetSpecialProgramEmphasisSchoolDescriptor] ENABLE TRIGGER [MagnetSpecialProgramEmphasisSchoolDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MediumOfInstructionDescriptorDeletedForTracking] ON [edfi].[MediumOfInstructionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_MediumOfInstructionDescriptor_TrackedDelete(MediumOfInstructionDescriptorId, Id, ChangeVersion)
    SELECT  d.MediumOfInstructionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.MediumOfInstructionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_MediumOfInstructionDescriptor_TrackedDelete d2 WHERE d2.MediumOfInstructionDescriptorId = d.MediumOfInstructionDescriptorId)
END
GO

ALTER TABLE [edfi].[MediumOfInstructionDescriptor] ENABLE TRIGGER [MediumOfInstructionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MethodCreditEarnedDescriptorDeletedForTracking] ON [edfi].[MethodCreditEarnedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_MethodCreditEarnedDescriptor_TrackedDelete(MethodCreditEarnedDescriptorId, Id, ChangeVersion)
    SELECT  d.MethodCreditEarnedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.MethodCreditEarnedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_MethodCreditEarnedDescriptor_TrackedDelete d2 WHERE d2.MethodCreditEarnedDescriptorId = d.MethodCreditEarnedDescriptorId)
END
GO

ALTER TABLE [edfi].[MethodCreditEarnedDescriptor] ENABLE TRIGGER [MethodCreditEarnedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MigrantEducationProgramServiceDescriptorDeletedForTracking] ON [edfi].[MigrantEducationProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_MigrantEducationProgramServiceDescriptor_TrackedDelete(MigrantEducationProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.MigrantEducationProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.MigrantEducationProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_MigrantEducationProgramServiceDescriptor_TrackedDelete d2 WHERE d2.MigrantEducationProgramServiceDescriptorId = d.MigrantEducationProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[MigrantEducationProgramServiceDescriptor] ENABLE TRIGGER [MigrantEducationProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[MonitoredDescriptorDeletedForTracking] ON [edfi].[MonitoredDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_MonitoredDescriptor_TrackedDelete(MonitoredDescriptorId, Id, ChangeVersion)
    SELECT  d.MonitoredDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.MonitoredDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_MonitoredDescriptor_TrackedDelete d2 WHERE d2.MonitoredDescriptorId = d.MonitoredDescriptorId)
END
GO

ALTER TABLE [edfi].[MonitoredDescriptor] ENABLE TRIGGER [MonitoredDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[NeglectedOrDelinquentProgramDescriptorDeletedForTracking] ON [edfi].[NeglectedOrDelinquentProgramDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_NeglectedOrDelinquentProgramDescriptor_TrackedDelete(NeglectedOrDelinquentProgramDescriptorId, Id, ChangeVersion)
    SELECT  d.NeglectedOrDelinquentProgramDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.NeglectedOrDelinquentProgramDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_NeglectedOrDelinquentProgramDescriptor_TrackedDelete d2 WHERE d2.NeglectedOrDelinquentProgramDescriptorId = d.NeglectedOrDelinquentProgramDescriptorId)
END
GO

ALTER TABLE [edfi].[NeglectedOrDelinquentProgramDescriptor] ENABLE TRIGGER [NeglectedOrDelinquentProgramDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[NeglectedOrDelinquentProgramServiceDescriptorDeletedForTracking] ON [edfi].[NeglectedOrDelinquentProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_NeglectedOrDelinquentProgramServiceDescriptor_TrackedDelete(NeglectedOrDelinquentProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.NeglectedOrDelinquentProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.NeglectedOrDelinquentProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_NeglectedOrDelinquentProgramServiceDescriptor_TrackedDelete d2 WHERE d2.NeglectedOrDelinquentProgramServiceDescriptorId = d.NeglectedOrDelinquentProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[NeglectedOrDelinquentProgramServiceDescriptor] ENABLE TRIGGER [NeglectedOrDelinquentProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[NetworkPurposeDescriptorDeletedForTracking] ON [edfi].[NetworkPurposeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_NetworkPurposeDescriptor_TrackedDelete(NetworkPurposeDescriptorId, Id, ChangeVersion)
    SELECT  d.NetworkPurposeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.NetworkPurposeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_NetworkPurposeDescriptor_TrackedDelete d2 WHERE d2.NetworkPurposeDescriptorId = d.NetworkPurposeDescriptorId)
END
GO

ALTER TABLE [edfi].[NetworkPurposeDescriptor] ENABLE TRIGGER [NetworkPurposeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ObjectiveAssessmentDeletedForTracking] ON [edfi].[ObjectiveAssessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ObjectiveAssessment_TrackedDelete(AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, IdentificationCode, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, IdentificationCode, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ObjectiveAssessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.AssessmentVersion = d.AssessmentVersion AND d2.IdentificationCode = d.IdentificationCode)
END
GO

ALTER TABLE [edfi].[ObjectiveAssessment] ENABLE TRIGGER [ObjectiveAssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OldEthnicityDescriptorDeletedForTracking] ON [edfi].[OldEthnicityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_OldEthnicityDescriptor_TrackedDelete(OldEthnicityDescriptorId, Id, ChangeVersion)
    SELECT  d.OldEthnicityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.OldEthnicityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_OldEthnicityDescriptor_TrackedDelete d2 WHERE d2.OldEthnicityDescriptorId = d.OldEthnicityDescriptorId)
END
GO

ALTER TABLE [edfi].[OldEthnicityDescriptor] ENABLE TRIGGER [OldEthnicityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OpenStaffPositionDeletedForTracking] ON [edfi].[OpenStaffPosition] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_OpenStaffPosition_TrackedDelete(EducationOrganizationId, RequisitionNumber, Id, ChangeVersion)
    SELECT  EducationOrganizationId, RequisitionNumber, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_OpenStaffPosition_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.RequisitionNumber = d.RequisitionNumber)
END
GO

ALTER TABLE [edfi].[OpenStaffPosition] ENABLE TRIGGER [OpenStaffPositionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OperationalStatusDescriptorDeletedForTracking] ON [edfi].[OperationalStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_OperationalStatusDescriptor_TrackedDelete(OperationalStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.OperationalStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.OperationalStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_OperationalStatusDescriptor_TrackedDelete d2 WHERE d2.OperationalStatusDescriptorId = d.OperationalStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[OperationalStatusDescriptor] ENABLE TRIGGER [OperationalStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[OtherNameTypeDescriptorDeletedForTracking] ON [edfi].[OtherNameTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_OtherNameTypeDescriptor_TrackedDelete(OtherNameTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.OtherNameTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.OtherNameTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_OtherNameTypeDescriptor_TrackedDelete d2 WHERE d2.OtherNameTypeDescriptorId = d.OtherNameTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[OtherNameTypeDescriptor] ENABLE TRIGGER [OtherNameTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ParentDeletedForTracking] ON [edfi].[Parent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Parent_TrackedDelete(ParentUSI, Id, ChangeVersion)
    SELECT  ParentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Parent_TrackedDelete d2 WHERE d2.ParentUSI = d.ParentUSI)
END
GO

ALTER TABLE [edfi].[Parent] ENABLE TRIGGER [ParentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ParticipationDescriptorDeletedForTracking] ON [edfi].[ParticipationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ParticipationDescriptor_TrackedDelete(ParticipationDescriptorId, Id, ChangeVersion)
    SELECT  d.ParticipationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ParticipationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ParticipationDescriptor_TrackedDelete d2 WHERE d2.ParticipationDescriptorId = d.ParticipationDescriptorId)
END
GO

ALTER TABLE [edfi].[ParticipationDescriptor] ENABLE TRIGGER [ParticipationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PayrollDeletedForTracking] ON [edfi].[Payroll] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Payroll_TrackedDelete(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    SELECT  AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Payroll_TrackedDelete d2 WHERE d2.AccountIdentifier = d.AccountIdentifier AND d2.AsOfDate = d.AsOfDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.FiscalYear = d.FiscalYear AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[Payroll] ENABLE TRIGGER [PayrollDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PerformanceBaseConversionDescriptorDeletedForTracking] ON [edfi].[PerformanceBaseConversionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PerformanceBaseConversionDescriptor_TrackedDelete(PerformanceBaseConversionDescriptorId, Id, ChangeVersion)
    SELECT  d.PerformanceBaseConversionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PerformanceBaseConversionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PerformanceBaseConversionDescriptor_TrackedDelete d2 WHERE d2.PerformanceBaseConversionDescriptorId = d.PerformanceBaseConversionDescriptorId)
END
GO

ALTER TABLE [edfi].[PerformanceBaseConversionDescriptor] ENABLE TRIGGER [PerformanceBaseConversionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PerformanceLevelDescriptorDeletedForTracking] ON [edfi].[PerformanceLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PerformanceLevelDescriptor_TrackedDelete(PerformanceLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.PerformanceLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PerformanceLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PerformanceLevelDescriptor_TrackedDelete d2 WHERE d2.PerformanceLevelDescriptorId = d.PerformanceLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[PerformanceLevelDescriptor] ENABLE TRIGGER [PerformanceLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PersonalInformationVerificationDescriptorDeletedForTracking] ON [edfi].[PersonalInformationVerificationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PersonalInformationVerificationDescriptor_TrackedDelete(PersonalInformationVerificationDescriptorId, Id, ChangeVersion)
    SELECT  d.PersonalInformationVerificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PersonalInformationVerificationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PersonalInformationVerificationDescriptor_TrackedDelete d2 WHERE d2.PersonalInformationVerificationDescriptorId = d.PersonalInformationVerificationDescriptorId)
END
GO

ALTER TABLE [edfi].[PersonalInformationVerificationDescriptor] ENABLE TRIGGER [PersonalInformationVerificationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PopulationServedDescriptorDeletedForTracking] ON [edfi].[PopulationServedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PopulationServedDescriptor_TrackedDelete(PopulationServedDescriptorId, Id, ChangeVersion)
    SELECT  d.PopulationServedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PopulationServedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PopulationServedDescriptor_TrackedDelete d2 WHERE d2.PopulationServedDescriptorId = d.PopulationServedDescriptorId)
END
GO

ALTER TABLE [edfi].[PopulationServedDescriptor] ENABLE TRIGGER [PopulationServedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryEventCategoryDescriptorDeletedForTracking] ON [edfi].[PostSecondaryEventCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PostSecondaryEventCategoryDescriptor_TrackedDelete(PostSecondaryEventCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.PostSecondaryEventCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PostSecondaryEventCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PostSecondaryEventCategoryDescriptor_TrackedDelete d2 WHERE d2.PostSecondaryEventCategoryDescriptorId = d.PostSecondaryEventCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[PostSecondaryEventCategoryDescriptor] ENABLE TRIGGER [PostSecondaryEventCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryEventDeletedForTracking] ON [edfi].[PostSecondaryEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PostSecondaryEvent_TrackedDelete(EventDate, PostSecondaryEventCategoryDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  EventDate, PostSecondaryEventCategoryDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PostSecondaryEvent_TrackedDelete d2 WHERE d2.EventDate = d.EventDate AND d2.PostSecondaryEventCategoryDescriptorId = d.PostSecondaryEventCategoryDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[PostSecondaryEvent] ENABLE TRIGGER [PostSecondaryEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryInstitutionDeletedForTracking] ON [edfi].[PostSecondaryInstitution] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PostSecondaryInstitution_TrackedDelete(PostSecondaryInstitutionId, Id, ChangeVersion)
    SELECT  d.PostSecondaryInstitutionId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.PostSecondaryInstitutionId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PostSecondaryInstitution_TrackedDelete d2 WHERE d2.PostSecondaryInstitutionId = d.PostSecondaryInstitutionId)
END
GO

ALTER TABLE [edfi].[PostSecondaryInstitution] ENABLE TRIGGER [PostSecondaryInstitutionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostSecondaryInstitutionLevelDescriptorDeletedForTracking] ON [edfi].[PostSecondaryInstitutionLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PostSecondaryInstitutionLevelDescriptor_TrackedDelete(PostSecondaryInstitutionLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.PostSecondaryInstitutionLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PostSecondaryInstitutionLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PostSecondaryInstitutionLevelDescriptor_TrackedDelete d2 WHERE d2.PostSecondaryInstitutionLevelDescriptorId = d.PostSecondaryInstitutionLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[PostSecondaryInstitutionLevelDescriptor] ENABLE TRIGGER [PostSecondaryInstitutionLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PostingResultDescriptorDeletedForTracking] ON [edfi].[PostingResultDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PostingResultDescriptor_TrackedDelete(PostingResultDescriptorId, Id, ChangeVersion)
    SELECT  d.PostingResultDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PostingResultDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PostingResultDescriptor_TrackedDelete d2 WHERE d2.PostingResultDescriptorId = d.PostingResultDescriptorId)
END
GO

ALTER TABLE [edfi].[PostingResultDescriptor] ENABLE TRIGGER [PostingResultDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProficiencyDescriptorDeletedForTracking] ON [edfi].[ProficiencyDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProficiencyDescriptor_TrackedDelete(ProficiencyDescriptorId, Id, ChangeVersion)
    SELECT  d.ProficiencyDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProficiencyDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProficiencyDescriptor_TrackedDelete d2 WHERE d2.ProficiencyDescriptorId = d.ProficiencyDescriptorId)
END
GO

ALTER TABLE [edfi].[ProficiencyDescriptor] ENABLE TRIGGER [ProficiencyDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramAssignmentDescriptorDeletedForTracking] ON [edfi].[ProgramAssignmentDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgramAssignmentDescriptor_TrackedDelete(ProgramAssignmentDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramAssignmentDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramAssignmentDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgramAssignmentDescriptor_TrackedDelete d2 WHERE d2.ProgramAssignmentDescriptorId = d.ProgramAssignmentDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramAssignmentDescriptor] ENABLE TRIGGER [ProgramAssignmentDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramCharacteristicDescriptorDeletedForTracking] ON [edfi].[ProgramCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgramCharacteristicDescriptor_TrackedDelete(ProgramCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgramCharacteristicDescriptor_TrackedDelete d2 WHERE d2.ProgramCharacteristicDescriptorId = d.ProgramCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramCharacteristicDescriptor] ENABLE TRIGGER [ProgramCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramDeletedForTracking] ON [edfi].[Program] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Program_TrackedDelete(EducationOrganizationId, ProgramName, ProgramTypeDescriptorId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, ProgramName, ProgramTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Program_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[Program] ENABLE TRIGGER [ProgramDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramSponsorDescriptorDeletedForTracking] ON [edfi].[ProgramSponsorDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgramSponsorDescriptor_TrackedDelete(ProgramSponsorDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramSponsorDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramSponsorDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgramSponsorDescriptor_TrackedDelete d2 WHERE d2.ProgramSponsorDescriptorId = d.ProgramSponsorDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramSponsorDescriptor] ENABLE TRIGGER [ProgramSponsorDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgramTypeDescriptorDeletedForTracking] ON [edfi].[ProgramTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgramTypeDescriptor_TrackedDelete(ProgramTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgramTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgramTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgramTypeDescriptor_TrackedDelete d2 WHERE d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgramTypeDescriptor] ENABLE TRIGGER [ProgramTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgressDescriptorDeletedForTracking] ON [edfi].[ProgressDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgressDescriptor_TrackedDelete(ProgressDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgressDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgressDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgressDescriptor_TrackedDelete d2 WHERE d2.ProgressDescriptorId = d.ProgressDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgressDescriptor] ENABLE TRIGGER [ProgressDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProgressLevelDescriptorDeletedForTracking] ON [edfi].[ProgressLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProgressLevelDescriptor_TrackedDelete(ProgressLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.ProgressLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProgressLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProgressLevelDescriptor_TrackedDelete d2 WHERE d2.ProgressLevelDescriptorId = d.ProgressLevelDescriptorId)
END
GO

ALTER TABLE [edfi].[ProgressLevelDescriptor] ENABLE TRIGGER [ProgressLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProviderCategoryDescriptorDeletedForTracking] ON [edfi].[ProviderCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProviderCategoryDescriptor_TrackedDelete(ProviderCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.ProviderCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProviderCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProviderCategoryDescriptor_TrackedDelete d2 WHERE d2.ProviderCategoryDescriptorId = d.ProviderCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[ProviderCategoryDescriptor] ENABLE TRIGGER [ProviderCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProviderProfitabilityDescriptorDeletedForTracking] ON [edfi].[ProviderProfitabilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProviderProfitabilityDescriptor_TrackedDelete(ProviderProfitabilityDescriptorId, Id, ChangeVersion)
    SELECT  d.ProviderProfitabilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProviderProfitabilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProviderProfitabilityDescriptor_TrackedDelete d2 WHERE d2.ProviderProfitabilityDescriptorId = d.ProviderProfitabilityDescriptorId)
END
GO

ALTER TABLE [edfi].[ProviderProfitabilityDescriptor] ENABLE TRIGGER [ProviderProfitabilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ProviderStatusDescriptorDeletedForTracking] ON [edfi].[ProviderStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ProviderStatusDescriptor_TrackedDelete(ProviderStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.ProviderStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ProviderStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ProviderStatusDescriptor_TrackedDelete d2 WHERE d2.ProviderStatusDescriptorId = d.ProviderStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[ProviderStatusDescriptor] ENABLE TRIGGER [ProviderStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[PublicationStatusDescriptorDeletedForTracking] ON [edfi].[PublicationStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_PublicationStatusDescriptor_TrackedDelete(PublicationStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.PublicationStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.PublicationStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_PublicationStatusDescriptor_TrackedDelete d2 WHERE d2.PublicationStatusDescriptorId = d.PublicationStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[PublicationStatusDescriptor] ENABLE TRIGGER [PublicationStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RaceDescriptorDeletedForTracking] ON [edfi].[RaceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RaceDescriptor_TrackedDelete(RaceDescriptorId, Id, ChangeVersion)
    SELECT  d.RaceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RaceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RaceDescriptor_TrackedDelete d2 WHERE d2.RaceDescriptorId = d.RaceDescriptorId)
END
GO

ALTER TABLE [edfi].[RaceDescriptor] ENABLE TRIGGER [RaceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReasonExitedDescriptorDeletedForTracking] ON [edfi].[ReasonExitedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ReasonExitedDescriptor_TrackedDelete(ReasonExitedDescriptorId, Id, ChangeVersion)
    SELECT  d.ReasonExitedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ReasonExitedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ReasonExitedDescriptor_TrackedDelete d2 WHERE d2.ReasonExitedDescriptorId = d.ReasonExitedDescriptorId)
END
GO

ALTER TABLE [edfi].[ReasonExitedDescriptor] ENABLE TRIGGER [ReasonExitedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReasonNotTestedDescriptorDeletedForTracking] ON [edfi].[ReasonNotTestedDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ReasonNotTestedDescriptor_TrackedDelete(ReasonNotTestedDescriptorId, Id, ChangeVersion)
    SELECT  d.ReasonNotTestedDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ReasonNotTestedDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ReasonNotTestedDescriptor_TrackedDelete d2 WHERE d2.ReasonNotTestedDescriptorId = d.ReasonNotTestedDescriptorId)
END
GO

ALTER TABLE [edfi].[ReasonNotTestedDescriptor] ENABLE TRIGGER [ReasonNotTestedDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RecognitionTypeDescriptorDeletedForTracking] ON [edfi].[RecognitionTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RecognitionTypeDescriptor_TrackedDelete(RecognitionTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.RecognitionTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RecognitionTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RecognitionTypeDescriptor_TrackedDelete d2 WHERE d2.RecognitionTypeDescriptorId = d.RecognitionTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[RecognitionTypeDescriptor] ENABLE TRIGGER [RecognitionTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RelationDescriptorDeletedForTracking] ON [edfi].[RelationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RelationDescriptor_TrackedDelete(RelationDescriptorId, Id, ChangeVersion)
    SELECT  d.RelationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RelationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RelationDescriptor_TrackedDelete d2 WHERE d2.RelationDescriptorId = d.RelationDescriptorId)
END
GO

ALTER TABLE [edfi].[RelationDescriptor] ENABLE TRIGGER [RelationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RepeatIdentifierDescriptorDeletedForTracking] ON [edfi].[RepeatIdentifierDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RepeatIdentifierDescriptor_TrackedDelete(RepeatIdentifierDescriptorId, Id, ChangeVersion)
    SELECT  d.RepeatIdentifierDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RepeatIdentifierDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RepeatIdentifierDescriptor_TrackedDelete d2 WHERE d2.RepeatIdentifierDescriptorId = d.RepeatIdentifierDescriptorId)
END
GO

ALTER TABLE [edfi].[RepeatIdentifierDescriptor] ENABLE TRIGGER [RepeatIdentifierDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReportCardDeletedForTracking] ON [edfi].[ReportCard] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ReportCard_TrackedDelete(EducationOrganizationId, GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ReportCard_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.GradingPeriodSchoolId = d.GradingPeriodSchoolId AND d2.GradingPeriodSchoolYear = d.GradingPeriodSchoolYear AND d2.GradingPeriodSequence = d.GradingPeriodSequence AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[ReportCard] ENABLE TRIGGER [ReportCardDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ReporterDescriptionDescriptorDeletedForTracking] ON [edfi].[ReporterDescriptionDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ReporterDescriptionDescriptor_TrackedDelete(ReporterDescriptionDescriptorId, Id, ChangeVersion)
    SELECT  d.ReporterDescriptionDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ReporterDescriptionDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ReporterDescriptionDescriptor_TrackedDelete d2 WHERE d2.ReporterDescriptionDescriptorId = d.ReporterDescriptionDescriptorId)
END
GO

ALTER TABLE [edfi].[ReporterDescriptionDescriptor] ENABLE TRIGGER [ReporterDescriptionDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResidencyStatusDescriptorDeletedForTracking] ON [edfi].[ResidencyStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ResidencyStatusDescriptor_TrackedDelete(ResidencyStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.ResidencyStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResidencyStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ResidencyStatusDescriptor_TrackedDelete d2 WHERE d2.ResidencyStatusDescriptorId = d.ResidencyStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[ResidencyStatusDescriptor] ENABLE TRIGGER [ResidencyStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResponseIndicatorDescriptorDeletedForTracking] ON [edfi].[ResponseIndicatorDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ResponseIndicatorDescriptor_TrackedDelete(ResponseIndicatorDescriptorId, Id, ChangeVersion)
    SELECT  d.ResponseIndicatorDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResponseIndicatorDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ResponseIndicatorDescriptor_TrackedDelete d2 WHERE d2.ResponseIndicatorDescriptorId = d.ResponseIndicatorDescriptorId)
END
GO

ALTER TABLE [edfi].[ResponseIndicatorDescriptor] ENABLE TRIGGER [ResponseIndicatorDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResponsibilityDescriptorDeletedForTracking] ON [edfi].[ResponsibilityDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ResponsibilityDescriptor_TrackedDelete(ResponsibilityDescriptorId, Id, ChangeVersion)
    SELECT  d.ResponsibilityDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResponsibilityDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ResponsibilityDescriptor_TrackedDelete d2 WHERE d2.ResponsibilityDescriptorId = d.ResponsibilityDescriptorId)
END
GO

ALTER TABLE [edfi].[ResponsibilityDescriptor] ENABLE TRIGGER [ResponsibilityDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RestraintEventDeletedForTracking] ON [edfi].[RestraintEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RestraintEvent_TrackedDelete(RestraintEventIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  RestraintEventIdentifier, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RestraintEvent_TrackedDelete d2 WHERE d2.RestraintEventIdentifier = d.RestraintEventIdentifier AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[RestraintEvent] ENABLE TRIGGER [RestraintEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RestraintEventReasonDescriptorDeletedForTracking] ON [edfi].[RestraintEventReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RestraintEventReasonDescriptor_TrackedDelete(RestraintEventReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.RestraintEventReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RestraintEventReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RestraintEventReasonDescriptor_TrackedDelete d2 WHERE d2.RestraintEventReasonDescriptorId = d.RestraintEventReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[RestraintEventReasonDescriptor] ENABLE TRIGGER [RestraintEventReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ResultDatatypeTypeDescriptorDeletedForTracking] ON [edfi].[ResultDatatypeTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ResultDatatypeTypeDescriptor_TrackedDelete(ResultDatatypeTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.ResultDatatypeTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ResultDatatypeTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ResultDatatypeTypeDescriptor_TrackedDelete d2 WHERE d2.ResultDatatypeTypeDescriptorId = d.ResultDatatypeTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[ResultDatatypeTypeDescriptor] ENABLE TRIGGER [ResultDatatypeTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[RetestIndicatorDescriptorDeletedForTracking] ON [edfi].[RetestIndicatorDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_RetestIndicatorDescriptor_TrackedDelete(RetestIndicatorDescriptorId, Id, ChangeVersion)
    SELECT  d.RetestIndicatorDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.RetestIndicatorDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_RetestIndicatorDescriptor_TrackedDelete d2 WHERE d2.RetestIndicatorDescriptorId = d.RetestIndicatorDescriptorId)
END
GO

ALTER TABLE [edfi].[RetestIndicatorDescriptor] ENABLE TRIGGER [RetestIndicatorDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolCategoryDescriptorDeletedForTracking] ON [edfi].[SchoolCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SchoolCategoryDescriptor_TrackedDelete(SchoolCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.SchoolCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SchoolCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SchoolCategoryDescriptor_TrackedDelete d2 WHERE d2.SchoolCategoryDescriptorId = d.SchoolCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[SchoolCategoryDescriptor] ENABLE TRIGGER [SchoolCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolChoiceImplementStatusDescriptorDeletedForTracking] ON [edfi].[SchoolChoiceImplementStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SchoolChoiceImplementStatusDescriptor_TrackedDelete(SchoolChoiceImplementStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.SchoolChoiceImplementStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SchoolChoiceImplementStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SchoolChoiceImplementStatusDescriptor_TrackedDelete d2 WHERE d2.SchoolChoiceImplementStatusDescriptorId = d.SchoolChoiceImplementStatusDescriptorId)
END
GO

ALTER TABLE [edfi].[SchoolChoiceImplementStatusDescriptor] ENABLE TRIGGER [SchoolChoiceImplementStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolDeletedForTracking] ON [edfi].[School] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_School_TrackedDelete(SchoolId, Id, ChangeVersion)
    SELECT  d.SchoolId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.SchoolId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_School_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId)
END
GO

ALTER TABLE [edfi].[School] ENABLE TRIGGER [SchoolDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolFoodServiceProgramServiceDescriptorDeletedForTracking] ON [edfi].[SchoolFoodServiceProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SchoolFoodServiceProgramServiceDescriptor_TrackedDelete(SchoolFoodServiceProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.SchoolFoodServiceProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SchoolFoodServiceProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SchoolFoodServiceProgramServiceDescriptor_TrackedDelete d2 WHERE d2.SchoolFoodServiceProgramServiceDescriptorId = d.SchoolFoodServiceProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[SchoolFoodServiceProgramServiceDescriptor] ENABLE TRIGGER [SchoolFoodServiceProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SchoolTypeDescriptorDeletedForTracking] ON [edfi].[SchoolTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SchoolTypeDescriptor_TrackedDelete(SchoolTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.SchoolTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SchoolTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SchoolTypeDescriptor_TrackedDelete d2 WHERE d2.SchoolTypeDescriptorId = d.SchoolTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[SchoolTypeDescriptor] ENABLE TRIGGER [SchoolTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionAttendanceTakenEventDeletedForTracking] ON [edfi].[SectionAttendanceTakenEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SectionAttendanceTakenEvent_TrackedDelete(CalendarCode, Date, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    SELECT  CalendarCode, Date, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SectionAttendanceTakenEvent_TrackedDelete d2 WHERE d2.CalendarCode = d.CalendarCode AND d2.Date = d.Date AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName)
END
GO

ALTER TABLE [edfi].[SectionAttendanceTakenEvent] ENABLE TRIGGER [SectionAttendanceTakenEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionCharacteristicDescriptorDeletedForTracking] ON [edfi].[SectionCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SectionCharacteristicDescriptor_TrackedDelete(SectionCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.SectionCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SectionCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SectionCharacteristicDescriptor_TrackedDelete d2 WHERE d2.SectionCharacteristicDescriptorId = d.SectionCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[SectionCharacteristicDescriptor] ENABLE TRIGGER [SectionCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SectionDeletedForTracking] ON [edfi].[Section] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Section_TrackedDelete(LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    SELECT  LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Section_TrackedDelete d2 WHERE d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName)
END
GO

ALTER TABLE [edfi].[Section] ENABLE TRIGGER [SectionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SeparationDescriptorDeletedForTracking] ON [edfi].[SeparationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SeparationDescriptor_TrackedDelete(SeparationDescriptorId, Id, ChangeVersion)
    SELECT  d.SeparationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SeparationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SeparationDescriptor_TrackedDelete d2 WHERE d2.SeparationDescriptorId = d.SeparationDescriptorId)
END
GO

ALTER TABLE [edfi].[SeparationDescriptor] ENABLE TRIGGER [SeparationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SeparationReasonDescriptorDeletedForTracking] ON [edfi].[SeparationReasonDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SeparationReasonDescriptor_TrackedDelete(SeparationReasonDescriptorId, Id, ChangeVersion)
    SELECT  d.SeparationReasonDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SeparationReasonDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SeparationReasonDescriptor_TrackedDelete d2 WHERE d2.SeparationReasonDescriptorId = d.SeparationReasonDescriptorId)
END
GO

ALTER TABLE [edfi].[SeparationReasonDescriptor] ENABLE TRIGGER [SeparationReasonDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[ServiceDescriptorDeletedForTracking] ON [edfi].[ServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_ServiceDescriptor_TrackedDelete(ServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.ServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.ServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_ServiceDescriptor_TrackedDelete d2 WHERE d2.ServiceDescriptorId = d.ServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[ServiceDescriptor] ENABLE TRIGGER [ServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SessionDeletedForTracking] ON [edfi].[Session] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Session_TrackedDelete(SchoolId, SchoolYear, SessionName, Id, ChangeVersion)
    SELECT  SchoolId, SchoolYear, SessionName, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Session_TrackedDelete d2 WHERE d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SessionName = d.SessionName)
END
GO

ALTER TABLE [edfi].[Session] ENABLE TRIGGER [SessionDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SexDescriptorDeletedForTracking] ON [edfi].[SexDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SexDescriptor_TrackedDelete(SexDescriptorId, Id, ChangeVersion)
    SELECT  d.SexDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SexDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SexDescriptor_TrackedDelete d2 WHERE d2.SexDescriptorId = d.SexDescriptorId)
END
GO

ALTER TABLE [edfi].[SexDescriptor] ENABLE TRIGGER [SexDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SpecialEducationProgramServiceDescriptorDeletedForTracking] ON [edfi].[SpecialEducationProgramServiceDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SpecialEducationProgramServiceDescriptor_TrackedDelete(SpecialEducationProgramServiceDescriptorId, Id, ChangeVersion)
    SELECT  d.SpecialEducationProgramServiceDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SpecialEducationProgramServiceDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SpecialEducationProgramServiceDescriptor_TrackedDelete d2 WHERE d2.SpecialEducationProgramServiceDescriptorId = d.SpecialEducationProgramServiceDescriptorId)
END
GO

ALTER TABLE [edfi].[SpecialEducationProgramServiceDescriptor] ENABLE TRIGGER [SpecialEducationProgramServiceDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[SpecialEducationSettingDescriptorDeletedForTracking] ON [edfi].[SpecialEducationSettingDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_SpecialEducationSettingDescriptor_TrackedDelete(SpecialEducationSettingDescriptorId, Id, ChangeVersion)
    SELECT  d.SpecialEducationSettingDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SpecialEducationSettingDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_SpecialEducationSettingDescriptor_TrackedDelete d2 WHERE d2.SpecialEducationSettingDescriptorId = d.SpecialEducationSettingDescriptorId)
END
GO

ALTER TABLE [edfi].[SpecialEducationSettingDescriptor] ENABLE TRIGGER [SpecialEducationSettingDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffAbsenceEventDeletedForTracking] ON [edfi].[StaffAbsenceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffAbsenceEvent_TrackedDelete(AbsenceEventCategoryDescriptorId, EventDate, StaffUSI, Id, ChangeVersion)
    SELECT  AbsenceEventCategoryDescriptorId, EventDate, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffAbsenceEvent_TrackedDelete d2 WHERE d2.AbsenceEventCategoryDescriptorId = d.AbsenceEventCategoryDescriptorId AND d2.EventDate = d.EventDate AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffAbsenceEvent] ENABLE TRIGGER [StaffAbsenceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffClassificationDescriptorDeletedForTracking] ON [edfi].[StaffClassificationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffClassificationDescriptor_TrackedDelete(StaffClassificationDescriptorId, Id, ChangeVersion)
    SELECT  d.StaffClassificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StaffClassificationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffClassificationDescriptor_TrackedDelete d2 WHERE d2.StaffClassificationDescriptorId = d.StaffClassificationDescriptorId)
END
GO

ALTER TABLE [edfi].[StaffClassificationDescriptor] ENABLE TRIGGER [StaffClassificationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffCohortAssociationDeletedForTracking] ON [edfi].[StaffCohortAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffCohortAssociation_TrackedDelete(BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffCohortAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffCohortAssociation] ENABLE TRIGGER [StaffCohortAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffDeletedForTracking] ON [edfi].[Staff] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Staff_TrackedDelete(StaffUSI, Id, ChangeVersion)
    SELECT  StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Staff_TrackedDelete d2 WHERE d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[Staff] ENABLE TRIGGER [StaffDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffEducationOrganizationAssignmentAssociationDeletedForTracking] ON [edfi].[StaffEducationOrganizationAssignmentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete(BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffEducationOrganizationAssignmentAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StaffClassificationDescriptorId = d.StaffClassificationDescriptorId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffEducationOrganizationAssignmentAssociation] ENABLE TRIGGER [StaffEducationOrganizationAssignmentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffEducationOrganizationContactAssociationDeletedForTracking] ON [edfi].[StaffEducationOrganizationContactAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffEducationOrganizationContactAssociation_TrackedDelete(ContactTitle, EducationOrganizationId, StaffUSI, Id, ChangeVersion)
    SELECT  ContactTitle, EducationOrganizationId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffEducationOrganizationContactAssociation_TrackedDelete d2 WHERE d2.ContactTitle = d.ContactTitle AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffEducationOrganizationContactAssociation] ENABLE TRIGGER [StaffEducationOrganizationContactAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffEducationOrganizationEmploymentAssociationDeletedForTracking] ON [edfi].[StaffEducationOrganizationEmploymentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete(EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffEducationOrganizationEmploymentAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EmploymentStatusDescriptorId = d.EmploymentStatusDescriptorId AND d2.HireDate = d.HireDate AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffEducationOrganizationEmploymentAssociation] ENABLE TRIGGER [StaffEducationOrganizationEmploymentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[StaffIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffIdentificationSystemDescriptor_TrackedDelete(StaffIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.StaffIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StaffIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.StaffIdentificationSystemDescriptorId = d.StaffIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[StaffIdentificationSystemDescriptor] ENABLE TRIGGER [StaffIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffLeaveDeletedForTracking] ON [edfi].[StaffLeave] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffLeave_TrackedDelete(BeginDate, StaffLeaveEventCategoryDescriptorId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, StaffLeaveEventCategoryDescriptorId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffLeave_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.StaffLeaveEventCategoryDescriptorId = d.StaffLeaveEventCategoryDescriptorId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffLeave] ENABLE TRIGGER [StaffLeaveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffLeaveEventCategoryDescriptorDeletedForTracking] ON [edfi].[StaffLeaveEventCategoryDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffLeaveEventCategoryDescriptor_TrackedDelete(StaffLeaveEventCategoryDescriptorId, Id, ChangeVersion)
    SELECT  d.StaffLeaveEventCategoryDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StaffLeaveEventCategoryDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffLeaveEventCategoryDescriptor_TrackedDelete d2 WHERE d2.StaffLeaveEventCategoryDescriptorId = d.StaffLeaveEventCategoryDescriptorId)
END
GO

ALTER TABLE [edfi].[StaffLeaveEventCategoryDescriptor] ENABLE TRIGGER [StaffLeaveEventCategoryDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffProgramAssociationDeletedForTracking] ON [edfi].[StaffProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffProgramAssociation_TrackedDelete(BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StaffUSI, Id, ChangeVersion)
    SELECT  BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffProgramAssociation] ENABLE TRIGGER [StaffProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffSchoolAssociationDeletedForTracking] ON [edfi].[StaffSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffSchoolAssociation_TrackedDelete(ProgramAssignmentDescriptorId, SchoolId, StaffUSI, Id, ChangeVersion)
    SELECT  ProgramAssignmentDescriptorId, SchoolId, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffSchoolAssociation_TrackedDelete d2 WHERE d2.ProgramAssignmentDescriptorId = d.ProgramAssignmentDescriptorId AND d2.SchoolId = d.SchoolId AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffSchoolAssociation] ENABLE TRIGGER [StaffSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StaffSectionAssociationDeletedForTracking] ON [edfi].[StaffSectionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StaffSectionAssociation_TrackedDelete(LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StaffUSI, Id, ChangeVersion)
    SELECT  LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StaffUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StaffSectionAssociation_TrackedDelete d2 WHERE d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName AND d2.StaffUSI = d.StaffUSI)
END
GO

ALTER TABLE [edfi].[StaffSectionAssociation] ENABLE TRIGGER [StaffSectionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StateAbbreviationDescriptorDeletedForTracking] ON [edfi].[StateAbbreviationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StateAbbreviationDescriptor_TrackedDelete(StateAbbreviationDescriptorId, Id, ChangeVersion)
    SELECT  d.StateAbbreviationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StateAbbreviationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StateAbbreviationDescriptor_TrackedDelete d2 WHERE d2.StateAbbreviationDescriptorId = d.StateAbbreviationDescriptorId)
END
GO

ALTER TABLE [edfi].[StateAbbreviationDescriptor] ENABLE TRIGGER [StateAbbreviationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StateEducationAgencyDeletedForTracking] ON [edfi].[StateEducationAgency] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StateEducationAgency_TrackedDelete(StateEducationAgencyId, Id, ChangeVersion)
    SELECT  d.StateEducationAgencyId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.EducationOrganization b ON d.StateEducationAgencyId = b.EducationOrganizationId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StateEducationAgency_TrackedDelete d2 WHERE d2.StateEducationAgencyId = d.StateEducationAgencyId)
END
GO

ALTER TABLE [edfi].[StateEducationAgency] ENABLE TRIGGER [StateEducationAgencyDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentAcademicRecordDeletedForTracking] ON [edfi].[StudentAcademicRecord] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentAcademicRecord_TrackedDelete(EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    SELECT  EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentAcademicRecord_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.SchoolYear = d.SchoolYear AND d2.StudentUSI = d.StudentUSI AND d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentAcademicRecord] ENABLE TRIGGER [StudentAcademicRecordDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentAssessmentDeletedForTracking] ON [edfi].[StudentAssessment] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentAssessment_TrackedDelete(AcademicSubjectDescriptorId, AdministrationDate, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, StudentUSI, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, AdministrationDate, AssessedGradeLevelDescriptorId, AssessmentTitle, AssessmentVersion, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentAssessment_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.AdministrationDate = d.AdministrationDate AND d2.AssessedGradeLevelDescriptorId = d.AssessedGradeLevelDescriptorId AND d2.AssessmentTitle = d.AssessmentTitle AND d2.AssessmentVersion = d.AssessmentVersion AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentAssessment] ENABLE TRIGGER [StudentAssessmentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCTEProgramAssociationDeletedForTracking] ON [edfi].[StudentCTEProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentCTEProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentCTEProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCTEProgramAssociation] ENABLE TRIGGER [StudentCTEProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCharacteristicDescriptorDeletedForTracking] ON [edfi].[StudentCharacteristicDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentCharacteristicDescriptor_TrackedDelete(StudentCharacteristicDescriptorId, Id, ChangeVersion)
    SELECT  d.StudentCharacteristicDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StudentCharacteristicDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentCharacteristicDescriptor_TrackedDelete d2 WHERE d2.StudentCharacteristicDescriptorId = d.StudentCharacteristicDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentCharacteristicDescriptor] ENABLE TRIGGER [StudentCharacteristicDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCohortAssociationDeletedForTracking] ON [edfi].[StudentCohortAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentCohortAssociation_TrackedDelete(BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentCohortAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.CohortIdentifier = d.CohortIdentifier AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCohortAssociation] ENABLE TRIGGER [StudentCohortAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentCompetencyObjectiveDeletedForTracking] ON [edfi].[StudentCompetencyObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentCompetencyObjective_TrackedDelete(GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentCompetencyObjective_TrackedDelete d2 WHERE d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.GradingPeriodSchoolId = d.GradingPeriodSchoolId AND d2.GradingPeriodSchoolYear = d.GradingPeriodSchoolYear AND d2.GradingPeriodSequence = d.GradingPeriodSequence AND d2.Objective = d.Objective AND d2.ObjectiveEducationOrganizationId = d.ObjectiveEducationOrganizationId AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentCompetencyObjective] ENABLE TRIGGER [StudentCompetencyObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentDeletedForTracking] ON [edfi].[Student] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_Student_TrackedDelete(StudentUSI, Id, ChangeVersion)
    SELECT  StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_Student_TrackedDelete d2 WHERE d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[Student] ENABLE TRIGGER [StudentDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentDisciplineIncidentAssociationDeletedForTracking] ON [edfi].[StudentDisciplineIncidentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentDisciplineIncidentAssociation_TrackedDelete(IncidentIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  IncidentIdentifier, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentDisciplineIncidentAssociation_TrackedDelete d2 WHERE d2.IncidentIdentifier = d.IncidentIdentifier AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentDisciplineIncidentAssociation] ENABLE TRIGGER [StudentDisciplineIncidentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentEducationOrganizationAssociationDeletedForTracking] ON [edfi].[StudentEducationOrganizationAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentEducationOrganizationAssociation_TrackedDelete(EducationOrganizationId, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentEducationOrganizationAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentEducationOrganizationAssociation] ENABLE TRIGGER [StudentEducationOrganizationAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentEducationOrganizationResponsibilityAssociationDeletedForTracking] ON [edfi].[StudentEducationOrganizationResponsibilityAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentEducationOrganizationResponsibilityAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentEducationOrganizationResponsibilityAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ResponsibilityDescriptorId = d.ResponsibilityDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentEducationOrganizationResponsibilityAssociation] ENABLE TRIGGER [StudentEducationOrganizationResponsibilityAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentGradebookEntryDeletedForTracking] ON [edfi].[StudentGradebookEntry] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentGradebookEntry_TrackedDelete(BeginDate, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentGradebookEntry_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.DateAssigned = d.DateAssigned AND d2.GradebookEntryTitle = d.GradebookEntryTitle AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentGradebookEntry] ENABLE TRIGGER [StudentGradebookEntryDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentHomelessProgramAssociationDeletedForTracking] ON [edfi].[StudentHomelessProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentHomelessProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentHomelessProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentHomelessProgramAssociation] ENABLE TRIGGER [StudentHomelessProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentIdentificationSystemDescriptorDeletedForTracking] ON [edfi].[StudentIdentificationSystemDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentIdentificationSystemDescriptor_TrackedDelete(StudentIdentificationSystemDescriptorId, Id, ChangeVersion)
    SELECT  d.StudentIdentificationSystemDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StudentIdentificationSystemDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentIdentificationSystemDescriptor_TrackedDelete d2 WHERE d2.StudentIdentificationSystemDescriptorId = d.StudentIdentificationSystemDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentIdentificationSystemDescriptor] ENABLE TRIGGER [StudentIdentificationSystemDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentInterventionAssociationDeletedForTracking] ON [edfi].[StudentInterventionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentInterventionAssociation_TrackedDelete(EducationOrganizationId, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    SELECT  EducationOrganizationId, InterventionIdentificationCode, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentInterventionAssociation_TrackedDelete d2 WHERE d2.EducationOrganizationId = d.EducationOrganizationId AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentInterventionAssociation] ENABLE TRIGGER [StudentInterventionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentInterventionAttendanceEventDeletedForTracking] ON [edfi].[StudentInterventionAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentInterventionAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentInterventionAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EventDate = d.EventDate AND d2.InterventionIdentificationCode = d.InterventionIdentificationCode AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentInterventionAttendanceEvent] ENABLE TRIGGER [StudentInterventionAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentLanguageInstructionProgramAssociationDeletedForTracking] ON [edfi].[StudentLanguageInstructionProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentLanguageInstructionProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentLanguageInstructionProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentLanguageInstructionProgramAssociation] ENABLE TRIGGER [StudentLanguageInstructionProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentLearningObjectiveDeletedForTracking] ON [edfi].[StudentLearningObjective] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentLearningObjective_TrackedDelete(AcademicSubjectDescriptorId, GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, Objective, ObjectiveGradeLevelDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  AcademicSubjectDescriptorId, GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, Objective, ObjectiveGradeLevelDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentLearningObjective_TrackedDelete d2 WHERE d2.AcademicSubjectDescriptorId = d.AcademicSubjectDescriptorId AND d2.GradingPeriodDescriptorId = d.GradingPeriodDescriptorId AND d2.GradingPeriodSchoolId = d.GradingPeriodSchoolId AND d2.GradingPeriodSchoolYear = d.GradingPeriodSchoolYear AND d2.GradingPeriodSequence = d.GradingPeriodSequence AND d2.Objective = d.Objective AND d2.ObjectiveGradeLevelDescriptorId = d.ObjectiveGradeLevelDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentLearningObjective] ENABLE TRIGGER [StudentLearningObjectiveDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentMigrantEducationProgramAssociationDeletedForTracking] ON [edfi].[StudentMigrantEducationProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentMigrantEducationProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentMigrantEducationProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentMigrantEducationProgramAssociation] ENABLE TRIGGER [StudentMigrantEducationProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentNeglectedOrDelinquentProgramAssociationDeletedForTracking] ON [edfi].[StudentNeglectedOrDelinquentProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentNeglectedOrDelinquentProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentNeglectedOrDelinquentProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentNeglectedOrDelinquentProgramAssociation] ENABLE TRIGGER [StudentNeglectedOrDelinquentProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentParentAssociationDeletedForTracking] ON [edfi].[StudentParentAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentParentAssociation_TrackedDelete(ParentUSI, StudentUSI, Id, ChangeVersion)
    SELECT  ParentUSI, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentParentAssociation_TrackedDelete d2 WHERE d2.ParentUSI = d.ParentUSI AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentParentAssociation] ENABLE TRIGGER [StudentParentAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentParticipationCodeDescriptorDeletedForTracking] ON [edfi].[StudentParticipationCodeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentParticipationCodeDescriptor_TrackedDelete(StudentParticipationCodeDescriptorId, Id, ChangeVersion)
    SELECT  d.StudentParticipationCodeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.StudentParticipationCodeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentParticipationCodeDescriptor_TrackedDelete d2 WHERE d2.StudentParticipationCodeDescriptorId = d.StudentParticipationCodeDescriptorId)
END
GO

ALTER TABLE [edfi].[StudentParticipationCodeDescriptor] ENABLE TRIGGER [StudentParticipationCodeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentProgramAssociationDeletedForTracking] ON [edfi].[StudentProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentProgramAssociation] ENABLE TRIGGER [StudentProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentProgramAttendanceEventDeletedForTracking] ON [edfi].[StudentProgramAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentProgramAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentProgramAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.EventDate = d.EventDate AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentProgramAttendanceEvent] ENABLE TRIGGER [StudentProgramAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSchoolAssociationDeletedForTracking] ON [edfi].[StudentSchoolAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSchoolAssociation_TrackedDelete(EntryDate, SchoolId, StudentUSI, Id, ChangeVersion)
    SELECT  EntryDate, SchoolId, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSchoolAssociation_TrackedDelete d2 WHERE d2.EntryDate = d.EntryDate AND d2.SchoolId = d.SchoolId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSchoolAssociation] ENABLE TRIGGER [StudentSchoolAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSchoolAttendanceEventDeletedForTracking] ON [edfi].[StudentSchoolAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSchoolAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, SessionName, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, SessionName, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSchoolAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EventDate = d.EventDate AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SessionName = d.SessionName AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSchoolAttendanceEvent] ENABLE TRIGGER [StudentSchoolAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSchoolFoodServiceProgramAssociationDeletedForTracking] ON [edfi].[StudentSchoolFoodServiceProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSchoolFoodServiceProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSchoolFoodServiceProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSchoolFoodServiceProgramAssociation] ENABLE TRIGGER [StudentSchoolFoodServiceProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSectionAssociationDeletedForTracking] ON [edfi].[StudentSectionAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSectionAssociation_TrackedDelete(BeginDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    SELECT  BeginDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSectionAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSectionAssociation] ENABLE TRIGGER [StudentSectionAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSectionAttendanceEventDeletedForTracking] ON [edfi].[StudentSectionAttendanceEvent] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSectionAttendanceEvent_TrackedDelete(AttendanceEventCategoryDescriptorId, EventDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    SELECT  AttendanceEventCategoryDescriptorId, EventDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSectionAttendanceEvent_TrackedDelete d2 WHERE d2.AttendanceEventCategoryDescriptorId = d.AttendanceEventCategoryDescriptorId AND d2.EventDate = d.EventDate AND d2.LocalCourseCode = d.LocalCourseCode AND d2.SchoolId = d.SchoolId AND d2.SchoolYear = d.SchoolYear AND d2.SectionIdentifier = d.SectionIdentifier AND d2.SessionName = d.SessionName AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSectionAttendanceEvent] ENABLE TRIGGER [StudentSectionAttendanceEventDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentSpecialEducationProgramAssociationDeletedForTracking] ON [edfi].[StudentSpecialEducationProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentSpecialEducationProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentSpecialEducationProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentSpecialEducationProgramAssociation] ENABLE TRIGGER [StudentSpecialEducationProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[StudentTitleIPartAProgramAssociationDeletedForTracking] ON [edfi].[StudentTitleIPartAProgramAssociation] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_StudentTitleIPartAProgramAssociation_TrackedDelete(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    SELECT  d.BeginDate, d.EducationOrganizationId, d.ProgramEducationOrganizationId, d.ProgramName, d.ProgramTypeDescriptorId, d.StudentUSI, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.GeneralStudentProgramAssociation b ON d.BeginDate = b.BeginDate AND d.EducationOrganizationId = b.EducationOrganizationId AND d.ProgramEducationOrganizationId = b.ProgramEducationOrganizationId AND d.ProgramName = b.ProgramName AND d.ProgramTypeDescriptorId = b.ProgramTypeDescriptorId AND d.StudentUSI = b.StudentUSI
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_StudentTitleIPartAProgramAssociation_TrackedDelete d2 WHERE d2.BeginDate = d.BeginDate AND d2.EducationOrganizationId = d.EducationOrganizationId AND d2.ProgramEducationOrganizationId = d.ProgramEducationOrganizationId AND d2.ProgramName = d.ProgramName AND d2.ProgramTypeDescriptorId = d.ProgramTypeDescriptorId AND d2.StudentUSI = d.StudentUSI)
END
GO

ALTER TABLE [edfi].[StudentTitleIPartAProgramAssociation] ENABLE TRIGGER [StudentTitleIPartAProgramAssociationDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TeachingCredentialBasisDescriptorDeletedForTracking] ON [edfi].[TeachingCredentialBasisDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TeachingCredentialBasisDescriptor_TrackedDelete(TeachingCredentialBasisDescriptorId, Id, ChangeVersion)
    SELECT  d.TeachingCredentialBasisDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TeachingCredentialBasisDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TeachingCredentialBasisDescriptor_TrackedDelete d2 WHERE d2.TeachingCredentialBasisDescriptorId = d.TeachingCredentialBasisDescriptorId)
END
GO

ALTER TABLE [edfi].[TeachingCredentialBasisDescriptor] ENABLE TRIGGER [TeachingCredentialBasisDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TeachingCredentialDescriptorDeletedForTracking] ON [edfi].[TeachingCredentialDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TeachingCredentialDescriptor_TrackedDelete(TeachingCredentialDescriptorId, Id, ChangeVersion)
    SELECT  d.TeachingCredentialDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TeachingCredentialDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TeachingCredentialDescriptor_TrackedDelete d2 WHERE d2.TeachingCredentialDescriptorId = d.TeachingCredentialDescriptorId)
END
GO

ALTER TABLE [edfi].[TeachingCredentialDescriptor] ENABLE TRIGGER [TeachingCredentialDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TechnicalSkillsAssessmentDescriptorDeletedForTracking] ON [edfi].[TechnicalSkillsAssessmentDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TechnicalSkillsAssessmentDescriptor_TrackedDelete(TechnicalSkillsAssessmentDescriptorId, Id, ChangeVersion)
    SELECT  d.TechnicalSkillsAssessmentDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TechnicalSkillsAssessmentDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TechnicalSkillsAssessmentDescriptor_TrackedDelete d2 WHERE d2.TechnicalSkillsAssessmentDescriptorId = d.TechnicalSkillsAssessmentDescriptorId)
END
GO

ALTER TABLE [edfi].[TechnicalSkillsAssessmentDescriptor] ENABLE TRIGGER [TechnicalSkillsAssessmentDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TelephoneNumberTypeDescriptorDeletedForTracking] ON [edfi].[TelephoneNumberTypeDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TelephoneNumberTypeDescriptor_TrackedDelete(TelephoneNumberTypeDescriptorId, Id, ChangeVersion)
    SELECT  d.TelephoneNumberTypeDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TelephoneNumberTypeDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TelephoneNumberTypeDescriptor_TrackedDelete d2 WHERE d2.TelephoneNumberTypeDescriptorId = d.TelephoneNumberTypeDescriptorId)
END
GO

ALTER TABLE [edfi].[TelephoneNumberTypeDescriptor] ENABLE TRIGGER [TelephoneNumberTypeDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TermDescriptorDeletedForTracking] ON [edfi].[TermDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TermDescriptor_TrackedDelete(TermDescriptorId, Id, ChangeVersion)
    SELECT  d.TermDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TermDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TermDescriptor_TrackedDelete d2 WHERE d2.TermDescriptorId = d.TermDescriptorId)
END
GO

ALTER TABLE [edfi].[TermDescriptor] ENABLE TRIGGER [TermDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TitleIPartAParticipantDescriptorDeletedForTracking] ON [edfi].[TitleIPartAParticipantDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TitleIPartAParticipantDescriptor_TrackedDelete(TitleIPartAParticipantDescriptorId, Id, ChangeVersion)
    SELECT  d.TitleIPartAParticipantDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TitleIPartAParticipantDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TitleIPartAParticipantDescriptor_TrackedDelete d2 WHERE d2.TitleIPartAParticipantDescriptorId = d.TitleIPartAParticipantDescriptorId)
END
GO

ALTER TABLE [edfi].[TitleIPartAParticipantDescriptor] ENABLE TRIGGER [TitleIPartAParticipantDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TitleIPartASchoolDesignationDescriptorDeletedForTracking] ON [edfi].[TitleIPartASchoolDesignationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TitleIPartASchoolDesignationDescriptor_TrackedDelete(TitleIPartASchoolDesignationDescriptorId, Id, ChangeVersion)
    SELECT  d.TitleIPartASchoolDesignationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TitleIPartASchoolDesignationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TitleIPartASchoolDesignationDescriptor_TrackedDelete d2 WHERE d2.TitleIPartASchoolDesignationDescriptorId = d.TitleIPartASchoolDesignationDescriptorId)
END
GO

ALTER TABLE [edfi].[TitleIPartASchoolDesignationDescriptor] ENABLE TRIGGER [TitleIPartASchoolDesignationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[TribalAffiliationDescriptorDeletedForTracking] ON [edfi].[TribalAffiliationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_TribalAffiliationDescriptor_TrackedDelete(TribalAffiliationDescriptorId, Id, ChangeVersion)
    SELECT  d.TribalAffiliationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.TribalAffiliationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_TribalAffiliationDescriptor_TrackedDelete d2 WHERE d2.TribalAffiliationDescriptorId = d.TribalAffiliationDescriptorId)
END
GO

ALTER TABLE [edfi].[TribalAffiliationDescriptor] ENABLE TRIGGER [TribalAffiliationDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[VisaDescriptorDeletedForTracking] ON [edfi].[VisaDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_VisaDescriptor_TrackedDelete(VisaDescriptorId, Id, ChangeVersion)
    SELECT  d.VisaDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.VisaDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_VisaDescriptor_TrackedDelete d2 WHERE d2.VisaDescriptorId = d.VisaDescriptorId)
END
GO

ALTER TABLE [edfi].[VisaDescriptor] ENABLE TRIGGER [VisaDescriptorDeletedForTracking]
GO


CREATE TRIGGER [edfi].[WeaponDescriptorDeletedForTracking] ON [edfi].[WeaponDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.edfi_WeaponDescriptor_TrackedDelete(WeaponDescriptorId, Id, ChangeVersion)
    SELECT  d.WeaponDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.WeaponDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.edfi_WeaponDescriptor_TrackedDelete d2 WHERE d2.WeaponDescriptorId = d.WeaponDescriptorId)
END
GO

ALTER TABLE [edfi].[WeaponDescriptor] ENABLE TRIGGER [WeaponDescriptorDeletedForTracking]
GO


