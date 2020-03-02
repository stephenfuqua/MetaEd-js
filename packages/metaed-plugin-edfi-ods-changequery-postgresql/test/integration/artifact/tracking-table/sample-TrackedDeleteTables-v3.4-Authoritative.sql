CREATE TABLE Tracked_Deletes_sample.InstitutionControlDescriptor
(
       InstitutionControlDescriptorId INT NOT NULL,
       Id UUID NOT NULL,
       ChangeVersion BIGINT NOT NULL,
       CONSTRAINT InstitutionControlDescriptor_PK PRIMARY KEY (ChangeVersion)
);

CREATE TABLE Tracked_Deletes_sample.InstitutionLevelDescriptor
(
       InstitutionLevelDescriptorId INT NOT NULL,
       Id UUID NOT NULL,
       ChangeVersion BIGINT NOT NULL,
       CONSTRAINT InstitutionLevelDescriptor_PK PRIMARY KEY (ChangeVersion)
);

CREATE TABLE Tracked_Deletes_sample.PostSecondaryOrganization
(
       NameOfInstitution VARCHAR(75) NOT NULL,
       Id UUID NOT NULL,
       ChangeVersion BIGINT NOT NULL,
       CONSTRAINT PostSecondaryOrganization_PK PRIMARY KEY (ChangeVersion)
);

CREATE TABLE Tracked_Deletes_sample.SpecialEducationGraduationStatusDescriptor
(
       SpecialEducationGraduationStatusDescriptorId INT NOT NULL,
       Id UUID NOT NULL,
       ChangeVersion BIGINT NOT NULL,
       CONSTRAINT SpecialEducationGraduationStatusDescriptor_PK PRIMARY KEY (ChangeVersion)
);

CREATE TABLE Tracked_Deletes_sample.SubmissionCertificationDescriptor
(
       SubmissionCertificationDescriptorId INT NOT NULL,
       Id UUID NOT NULL,
       ChangeVersion BIGINT NOT NULL,
       CONSTRAINT SubmissionCertificationDescriptor_PK PRIMARY KEY (ChangeVersion)
); 

