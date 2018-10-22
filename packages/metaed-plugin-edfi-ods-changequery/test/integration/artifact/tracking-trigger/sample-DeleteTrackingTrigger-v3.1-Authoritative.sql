CREATE TRIGGER [sample].[InstitutionControlDescriptorDeletedForTracking] ON [sample].[InstitutionControlDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.sample_InstitutionControlDescriptor_TrackedDelete(InstitutionControlDescriptorId, Id, ChangeVersion)
    SELECT  d.InstitutionControlDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InstitutionControlDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.sample_InstitutionControlDescriptor_TrackedDelete d2 WHERE d2.InstitutionControlDescriptorId = d.InstitutionControlDescriptorId)
END
GO

ALTER TABLE [sample].[InstitutionControlDescriptor] ENABLE TRIGGER [InstitutionControlDescriptorDeletedForTracking]
GO


CREATE TRIGGER [sample].[InstitutionLevelDescriptorDeletedForTracking] ON [sample].[InstitutionLevelDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.sample_InstitutionLevelDescriptor_TrackedDelete(InstitutionLevelDescriptorId, Id, ChangeVersion)
    SELECT  d.InstitutionLevelDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.InstitutionLevelDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.sample_InstitutionLevelDescriptor_TrackedDelete d2 WHERE d2.InstitutionLevelDescriptorId = d.InstitutionLevelDescriptorId)
END
GO

ALTER TABLE [sample].[InstitutionLevelDescriptor] ENABLE TRIGGER [InstitutionLevelDescriptorDeletedForTracking]
GO


CREATE TRIGGER [sample].[PostSecondaryOrganizationDeletedForTracking] ON [sample].[PostSecondaryOrganization] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.sample_PostSecondaryOrganization_TrackedDelete(NameOfInstitution, Id, ChangeVersion)
    SELECT  NameOfInstitution, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
    WHERE NOT EXISTS (SELECT * FROM changes.sample_PostSecondaryOrganization_TrackedDelete d2 WHERE d2.NameOfInstitution = d.NameOfInstitution)
END
GO

ALTER TABLE [sample].[PostSecondaryOrganization] ENABLE TRIGGER [PostSecondaryOrganizationDeletedForTracking]
GO


CREATE TRIGGER [sample].[SpecialEducationGraduationStatusDescriptorDeletedForTracking] ON [sample].[SpecialEducationGraduationStatusDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.sample_SpecialEducationGraduationStatusDescriptor_TrackedDelete(SpecialEducationGraduationStatusDescriptorId, Id, ChangeVersion)
    SELECT  d.SpecialEducationGraduationStatusDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SpecialEducationGraduationStatusDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.sample_SpecialEducationGraduationStatusDescriptor_TrackedDelete d2 WHERE d2.SpecialEducationGraduationStatusDescriptorId = d.SpecialEducationGraduationStatusDescriptorId)
END
GO

ALTER TABLE [sample].[SpecialEducationGraduationStatusDescriptor] ENABLE TRIGGER [SpecialEducationGraduationStatusDescriptorDeletedForTracking]
GO


CREATE TRIGGER [sample].[SubmissionCertificationDescriptorDeletedForTracking] ON [sample].[SubmissionCertificationDescriptor] AFTER DELETE AS
BEGIN
    IF @@rowcount = 0 
        RETURN

    SET NOCOUNT ON

    INSERT INTO changes.sample_SubmissionCertificationDescriptor_TrackedDelete(SubmissionCertificationDescriptorId, Id, ChangeVersion)
    SELECT  d.SubmissionCertificationDescriptorId, Id, CHANGE_TRACKING_CURRENT_VERSION()
    FROM    deleted d
            INNER JOIN edfi.Descriptor b ON d.SubmissionCertificationDescriptorId = b.DescriptorId
    WHERE NOT EXISTS (SELECT * FROM changes.sample_SubmissionCertificationDescriptor_TrackedDelete d2 WHERE d2.SubmissionCertificationDescriptorId = d.SubmissionCertificationDescriptorId)
END
GO

ALTER TABLE [sample].[SubmissionCertificationDescriptor] ENABLE TRIGGER [SubmissionCertificationDescriptorDeletedForTracking]
GO


