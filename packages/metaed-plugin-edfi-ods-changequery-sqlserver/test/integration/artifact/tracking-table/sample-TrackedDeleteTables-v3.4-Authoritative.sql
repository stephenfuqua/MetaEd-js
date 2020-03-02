CREATE TABLE [Tracked_Deletes_sample].[InstitutionControlDescriptor]
(
       InstitutionControlDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       ChangeVersion bigint NOT NULL,
       CONSTRAINT PK_InstitutionControlDescriptor PRIMARY KEY CLUSTERED (ChangeVersion)
)

CREATE TABLE [Tracked_Deletes_sample].[InstitutionLevelDescriptor]
(
       InstitutionLevelDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       ChangeVersion bigint NOT NULL,
       CONSTRAINT PK_InstitutionLevelDescriptor PRIMARY KEY CLUSTERED (ChangeVersion)
)

CREATE TABLE [Tracked_Deletes_sample].[PostSecondaryOrganization]
(
       NameOfInstitution [NVARCHAR](75) NOT NULL,
       Id uniqueidentifier NOT NULL,
       ChangeVersion bigint NOT NULL,
       CONSTRAINT PK_PostSecondaryOrganization PRIMARY KEY CLUSTERED (ChangeVersion)
)

CREATE TABLE [Tracked_Deletes_sample].[SpecialEducationGraduationStatusDescriptor]
(
       SpecialEducationGraduationStatusDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       ChangeVersion bigint NOT NULL,
       CONSTRAINT PK_SpecialEducationGraduationStatusDescriptor PRIMARY KEY CLUSTERED (ChangeVersion)
)

CREATE TABLE [Tracked_Deletes_sample].[SubmissionCertificationDescriptor]
(
       SubmissionCertificationDescriptorId [INT] NOT NULL,
       Id uniqueidentifier NOT NULL,
       ChangeVersion bigint NOT NULL,
       CONSTRAINT PK_SubmissionCertificationDescriptor PRIMARY KEY CLUSTERED (ChangeVersion)
)

