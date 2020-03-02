CREATE FUNCTION Tracked_Deletes_sample.InstitutionControlDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_sample.InstitutionControlDescriptor(InstitutionControlDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InstitutionControlDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON sample.InstitutionControlDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_sample.InstitutionControlDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_sample.InstitutionLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_sample.InstitutionLevelDescriptor(InstitutionLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InstitutionLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON sample.InstitutionLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_sample.InstitutionLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_sample.PostSecondaryOrganization_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_sample.PostSecondaryOrganization(NameOfInstitution, Id, ChangeVersion)
    VALUES (OLD.NameOfInstitution, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON sample.PostSecondaryOrganization 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_sample.PostSecondaryOrganization_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_sample.SpecialEducationGraduationStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_sample.SpecialEducationGraduationStatusDescriptor(SpecialEducationGraduationStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SpecialEducationGraduationStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON sample.SpecialEducationGraduationStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_sample.SpecialEducationGraduationStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_sample.SubmissionCertificationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_sample.SubmissionCertificationDescriptor(SubmissionCertificationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SubmissionCertificationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON sample.SubmissionCertificationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_sample.SubmissionCertificationDescriptor_TR_DelTrkg();

