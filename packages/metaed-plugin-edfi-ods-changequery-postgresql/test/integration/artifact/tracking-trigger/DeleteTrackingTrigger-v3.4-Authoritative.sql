CREATE FUNCTION Tracked_Deletes_edfi.AbsenceEventCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AbsenceEventCategoryDescriptor(AbsenceEventCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AbsenceEventCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AbsenceEventCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AbsenceEventCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AcademicHonorCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AcademicHonorCategoryDescriptor(AcademicHonorCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AcademicHonorCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AcademicHonorCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AcademicHonorCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AcademicSubjectDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AcademicSubjectDescriptor(AcademicSubjectDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AcademicSubjectDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AcademicSubjectDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AcademicSubjectDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AcademicWeek_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AcademicWeek(SchoolId, WeekIdentifier, Id, ChangeVersion)
    VALUES (OLD.SchoolId, OLD.WeekIdentifier, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AcademicWeek 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AcademicWeek_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AccommodationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AccommodationDescriptor(AccommodationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AccommodationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AccommodationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AccommodationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AccountClassificationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AccountClassificationDescriptor(AccountClassificationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AccountClassificationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AccountClassificationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AccountClassificationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AccountCode_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AccountCode(AccountClassificationDescriptorId, AccountCodeNumber, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    VALUES (OLD.AccountClassificationDescriptorId, OLD.AccountCodeNumber, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AccountCode 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AccountCode_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Account_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Account(AccountIdentifier, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    VALUES (OLD.AccountIdentifier, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Account 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Account_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AccountabilityRating_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AccountabilityRating(EducationOrganizationId, RatingTitle, SchoolYear, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.RatingTitle, OLD.SchoolYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AccountabilityRating 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AccountabilityRating_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AchievementCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AchievementCategoryDescriptor(AchievementCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AchievementCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AchievementCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AchievementCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Actual_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Actual(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    VALUES (OLD.AccountIdentifier, OLD.AsOfDate, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Actual 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Actual_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AdditionalCreditTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AdditionalCreditTypeDescriptor(AdditionalCreditTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AdditionalCreditTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AdditionalCreditTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AdditionalCreditTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AddressTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AddressTypeDescriptor(AddressTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AddressTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AddressTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AddressTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AdministrationEnvironmentDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AdministrationEnvironmentDescriptor(AdministrationEnvironmentDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AdministrationEnvironmentDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AdministrationEnvironmentDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AdministrationEnvironmentDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AdministrativeFundingControlDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AdministrativeFundingControlDescriptor(AdministrativeFundingControlDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AdministrativeFundingControlDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AdministrativeFundingControlDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AdministrativeFundingControlDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentCategoryDescriptor(AssessmentCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentIdentificationSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentIdentificationSystemDescriptor(AssessmentIdentificationSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentIdentificationSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentIdentificationSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentIdentificationSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentItemCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentItemCategoryDescriptor(AssessmentItemCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentItemCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentItemCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentItemCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentItemResultDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentItemResultDescriptor(AssessmentItemResultDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentItemResultDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentItemResultDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentItemResultDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentItem_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentItem(AssessmentIdentifier, IdentificationCode, Namespace, Id, ChangeVersion)
    VALUES (OLD.AssessmentIdentifier, OLD.IdentificationCode, OLD.Namespace, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentItem 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentItem_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentPeriodDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentPeriodDescriptor(AssessmentPeriodDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentPeriodDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentPeriodDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentPeriodDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AssessmentReportingMethodDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AssessmentReportingMethodDescriptor(AssessmentReportingMethodDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AssessmentReportingMethodDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AssessmentReportingMethodDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AssessmentReportingMethodDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Assessment_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Assessment(AssessmentIdentifier, Namespace, Id, ChangeVersion)
    VALUES (OLD.AssessmentIdentifier, OLD.Namespace, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Assessment 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Assessment_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AttemptStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AttemptStatusDescriptor(AttemptStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AttemptStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AttemptStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AttemptStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.AttendanceEventCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.AttendanceEventCategoryDescriptor(AttendanceEventCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.AttendanceEventCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.AttendanceEventCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.AttendanceEventCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.BehaviorDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.BehaviorDescriptor(BehaviorDescriptorId, Id, ChangeVersion)
    VALUES (OLD.BehaviorDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.BehaviorDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.BehaviorDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.BellSchedule_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.BellSchedule(BellScheduleName, SchoolId, Id, ChangeVersion)
    VALUES (OLD.BellScheduleName, OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.BellSchedule 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.BellSchedule_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Budget_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Budget(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, Id, ChangeVersion)
    VALUES (OLD.AccountIdentifier, OLD.AsOfDate, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Budget 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Budget_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CTEProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CTEProgramServiceDescriptor(CTEProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CTEProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CTEProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CTEProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CalendarDate_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CalendarDate(CalendarCode, Date, SchoolId, SchoolYear, Id, ChangeVersion)
    VALUES (OLD.CalendarCode, OLD.Date, OLD.SchoolId, OLD.SchoolYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CalendarDate 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CalendarDate_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CalendarEventDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CalendarEventDescriptor(CalendarEventDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CalendarEventDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CalendarEventDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CalendarEventDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CalendarTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CalendarTypeDescriptor(CalendarTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CalendarTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CalendarTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CalendarTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Calendar_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Calendar(CalendarCode, SchoolId, SchoolYear, Id, ChangeVersion)
    VALUES (OLD.CalendarCode, OLD.SchoolId, OLD.SchoolYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Calendar 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Calendar_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CareerPathwayDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CareerPathwayDescriptor(CareerPathwayDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CareerPathwayDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CareerPathwayDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CareerPathwayDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CharterApprovalAgencyTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CharterApprovalAgencyTypeDescriptor(CharterApprovalAgencyTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CharterApprovalAgencyTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CharterApprovalAgencyTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CharterApprovalAgencyTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CharterStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CharterStatusDescriptor(CharterStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CharterStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CharterStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CharterStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CitizenshipStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CitizenshipStatusDescriptor(CitizenshipStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CitizenshipStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CitizenshipStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CitizenshipStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ClassPeriod_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ClassPeriod(ClassPeriodName, SchoolId, Id, ChangeVersion)
    VALUES (OLD.ClassPeriodName, OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ClassPeriod 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ClassPeriod_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ClassroomPositionDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ClassroomPositionDescriptor(ClassroomPositionDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ClassroomPositionDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ClassroomPositionDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ClassroomPositionDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CohortScopeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CohortScopeDescriptor(CohortScopeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CohortScopeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CohortScopeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CohortScopeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CohortTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CohortTypeDescriptor(CohortTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CohortTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CohortTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CohortTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CohortYearTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CohortYearTypeDescriptor(CohortYearTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CohortYearTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CohortYearTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CohortYearTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Cohort_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Cohort(CohortIdentifier, EducationOrganizationId, Id, ChangeVersion)
    VALUES (OLD.CohortIdentifier, OLD.EducationOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Cohort 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Cohort_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CommunityOrganization_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CommunityOrganization(CommunityOrganizationId, Id, ChangeVersion)
    VALUES (OLD.CommunityOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CommunityOrganization 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CommunityOrganization_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CommunityProviderLicense_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CommunityProviderLicense(CommunityProviderId, LicenseIdentifier, LicensingOrganization, Id, ChangeVersion)
    VALUES (OLD.CommunityProviderId, OLD.LicenseIdentifier, OLD.LicensingOrganization, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CommunityProviderLicense 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CommunityProviderLicense_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CommunityProvider_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CommunityProvider(CommunityProviderId, Id, ChangeVersion)
    VALUES (OLD.CommunityProviderId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CommunityProvider 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CommunityProvider_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CompetencyLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CompetencyLevelDescriptor(CompetencyLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CompetencyLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CompetencyLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CompetencyLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CompetencyObjective_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CompetencyObjective(EducationOrganizationId, Objective, ObjectiveGradeLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.Objective, OLD.ObjectiveGradeLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CompetencyObjective 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CompetencyObjective_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ContactTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ContactTypeDescriptor(ContactTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ContactTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ContactTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ContactTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ContentClassDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ContentClassDescriptor(ContentClassDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ContentClassDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ContentClassDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ContentClassDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ContinuationOfServicesReasonDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ContinuationOfServicesReasonDescriptor(ContinuationOfServicesReasonDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ContinuationOfServicesReasonDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ContinuationOfServicesReasonDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ContinuationOfServicesReasonDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ContractedStaff_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ContractedStaff(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.AccountIdentifier, OLD.AsOfDate, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ContractedStaff 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ContractedStaff_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CostRateDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CostRateDescriptor(CostRateDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CostRateDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CostRateDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CostRateDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CountryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CountryDescriptor(CountryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CountryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CountryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CountryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseAttemptResultDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseAttemptResultDescriptor(CourseAttemptResultDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseAttemptResultDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseAttemptResultDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseAttemptResultDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseDefinedByDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseDefinedByDescriptor(CourseDefinedByDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseDefinedByDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseDefinedByDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseDefinedByDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseGPAApplicabilityDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseGPAApplicabilityDescriptor(CourseGPAApplicabilityDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseGPAApplicabilityDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseGPAApplicabilityDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseGPAApplicabilityDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseIdentificationSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseIdentificationSystemDescriptor(CourseIdentificationSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseIdentificationSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseIdentificationSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseIdentificationSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseLevelCharacteristicDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseLevelCharacteristicDescriptor(CourseLevelCharacteristicDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseLevelCharacteristicDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseLevelCharacteristicDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseLevelCharacteristicDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseOffering_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseOffering(LocalCourseCode, SchoolId, SchoolYear, SessionName, Id, ChangeVersion)
    VALUES (OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SessionName, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseOffering 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseOffering_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseRepeatCodeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseRepeatCodeDescriptor(CourseRepeatCodeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseRepeatCodeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseRepeatCodeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseRepeatCodeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CourseTranscript_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CourseTranscript(CourseAttemptResultDescriptorId, CourseCode, CourseEducationOrganizationId, EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CourseAttemptResultDescriptorId, OLD.CourseCode, OLD.CourseEducationOrganizationId, OLD.EducationOrganizationId, OLD.SchoolYear, OLD.StudentUSI, OLD.TermDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CourseTranscript 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CourseTranscript_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Course_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Course(CourseCode, EducationOrganizationId, Id, ChangeVersion)
    VALUES (OLD.CourseCode, OLD.EducationOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Course 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Course_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CredentialFieldDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CredentialFieldDescriptor(CredentialFieldDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CredentialFieldDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CredentialFieldDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CredentialFieldDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CredentialTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CredentialTypeDescriptor(CredentialTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CredentialTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CredentialTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CredentialTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Credential_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Credential(CredentialIdentifier, StateOfIssueStateAbbreviationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CredentialIdentifier, OLD.StateOfIssueStateAbbreviationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Credential 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Credential_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CreditTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CreditTypeDescriptor(CreditTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CreditTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CreditTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CreditTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.CurriculumUsedDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.CurriculumUsedDescriptor(CurriculumUsedDescriptorId, Id, ChangeVersion)
    VALUES (OLD.CurriculumUsedDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.CurriculumUsedDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.CurriculumUsedDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DeliveryMethodDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DeliveryMethodDescriptor(DeliveryMethodDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DeliveryMethodDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DeliveryMethodDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DeliveryMethodDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Descriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Descriptor(DescriptorId, Id, ChangeVersion)
    VALUES (OLD.DescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Descriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Descriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DiagnosisDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DiagnosisDescriptor(DiagnosisDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DiagnosisDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DiagnosisDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DiagnosisDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DiplomaLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DiplomaLevelDescriptor(DiplomaLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DiplomaLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DiplomaLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DiplomaLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DiplomaTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DiplomaTypeDescriptor(DiplomaTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DiplomaTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DiplomaTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DiplomaTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisabilityDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisabilityDescriptor(DisabilityDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisabilityDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisabilityDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisabilityDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisabilityDesignationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisabilityDesignationDescriptor(DisabilityDesignationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisabilityDesignationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisabilityDesignationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisabilityDesignationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisabilityDeterminationSourceTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisabilityDeterminationSourceTypeDescriptor(DisabilityDeterminationSourceTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisabilityDeterminationSourceTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisabilityDeterminationSourceTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisabilityDeterminationSourceTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisciplineActionLengthDifferenceReasonDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisciplineActionLengthDifferenceReasonDescriptor(DisciplineActionLengthDifferenceReasonDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisciplineActionLengthDifferenceReasonDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisciplineActionLengthDifferenceReasonDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisciplineActionLengthDifferenceReasonDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisciplineAction_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisciplineAction(DisciplineActionIdentifier, DisciplineDate, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.DisciplineActionIdentifier, OLD.DisciplineDate, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisciplineAction 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisciplineAction_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisciplineDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisciplineDescriptor(DisciplineDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisciplineDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisciplineDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisciplineDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisciplineIncidentParticipationCodeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisciplineIncidentParticipationCodeDescriptor(DisciplineIncidentParticipationCodeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.DisciplineIncidentParticipationCodeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisciplineIncidentParticipationCodeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisciplineIncidentParticipationCodeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.DisciplineIncident_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.DisciplineIncident(IncidentIdentifier, SchoolId, Id, ChangeVersion)
    VALUES (OLD.IncidentIdentifier, OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.DisciplineIncident 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.DisciplineIncident_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationContent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationContent(ContentIdentifier, Id, ChangeVersion)
    VALUES (OLD.ContentIdentifier, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationContent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationContent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationCategoryDescriptor(EducationOrganizationCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationIdentificationSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationIdentificationSystemDescriptor(EducationOrganizationIdentificationSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationIdentificationSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationIdentificationSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationIdentificationSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationInterventionPrescription_e670ae_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationInterventionPrescriptionAssociation(EducationOrganizationId, InterventionPrescriptionEducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.InterventionPrescriptionEducationOrganizationId, OLD.InterventionPrescriptionIdentificationCode, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationInterventionPrescriptionAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationInterventionPrescription_e670ae_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationNetworkAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationNetworkAssociation(EducationOrganizationNetworkId, MemberEducationOrganizationId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationNetworkId, OLD.MemberEducationOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationNetworkAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationNetworkAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationNetwork_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationNetwork(EducationOrganizationNetworkId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationNetworkId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationNetwork 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationNetwork_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganizationPeerAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganizationPeerAssociation(EducationOrganizationId, PeerEducationOrganizationId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.PeerEducationOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganizationPeerAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganizationPeerAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationOrganization_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationOrganization(EducationOrganizationId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationOrganization 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationOrganization_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationPlanDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationPlanDescriptor(EducationPlanDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationPlanDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationPlanDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationPlanDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationServiceCenter_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationServiceCenter(EducationServiceCenterId, Id, ChangeVersion)
    VALUES (OLD.EducationServiceCenterId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationServiceCenter 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationServiceCenter_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EducationalEnvironmentDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EducationalEnvironmentDescriptor(EducationalEnvironmentDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationalEnvironmentDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EducationalEnvironmentDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EducationalEnvironmentDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ElectronicMailTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ElectronicMailTypeDescriptor(ElectronicMailTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ElectronicMailTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ElectronicMailTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ElectronicMailTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EmploymentStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EmploymentStatusDescriptor(EmploymentStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EmploymentStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EmploymentStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EmploymentStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EntryGradeLevelReasonDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EntryGradeLevelReasonDescriptor(EntryGradeLevelReasonDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EntryGradeLevelReasonDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EntryGradeLevelReasonDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EntryGradeLevelReasonDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EntryTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EntryTypeDescriptor(EntryTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EntryTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EntryTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EntryTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.EventCircumstanceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.EventCircumstanceDescriptor(EventCircumstanceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EventCircumstanceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.EventCircumstanceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.EventCircumstanceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ExitWithdrawTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ExitWithdrawTypeDescriptor(ExitWithdrawTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ExitWithdrawTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ExitWithdrawTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ExitWithdrawTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.FeederSchoolAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.FeederSchoolAssociation(BeginDate, FeederSchoolId, SchoolId, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.FeederSchoolId, OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.FeederSchoolAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.FeederSchoolAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GeneralStudentProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GeneralStudentProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GeneralStudentProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GeneralStudentProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradeLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradeLevelDescriptor(GradeLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GradeLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradeLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradeLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradePointAverageWeightSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradePointAverageWeightSystemDescriptor(GradePointAverageWeightSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GradePointAverageWeightSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradePointAverageWeightSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradePointAverageWeightSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradeTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradeTypeDescriptor(GradeTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GradeTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradeTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradeTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Grade_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Grade(BeginDate, GradeTypeDescriptorId, GradingPeriodDescriptorId, GradingPeriodSchoolYear, GradingPeriodSequence, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.GradeTypeDescriptorId, OLD.GradingPeriodDescriptorId, OLD.GradingPeriodSchoolYear, OLD.GradingPeriodSequence, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Grade 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Grade_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradebookEntryTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradebookEntryTypeDescriptor(GradebookEntryTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GradebookEntryTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradebookEntryTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradebookEntryTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradebookEntry_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradebookEntry(DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    VALUES (OLD.DateAssigned, OLD.GradebookEntryTitle, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradebookEntry 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradebookEntry_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradingPeriodDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradingPeriodDescriptor(GradingPeriodDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GradingPeriodDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradingPeriodDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradingPeriodDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GradingPeriod_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GradingPeriod(GradingPeriodDescriptorId, PeriodSequence, SchoolId, SchoolYear, Id, ChangeVersion)
    VALUES (OLD.GradingPeriodDescriptorId, OLD.PeriodSequence, OLD.SchoolId, OLD.SchoolYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GradingPeriod 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GradingPeriod_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GraduationPlanTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GraduationPlanTypeDescriptor(GraduationPlanTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GraduationPlanTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GraduationPlanTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GraduationPlanTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GraduationPlan_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GraduationPlan(EducationOrganizationId, GraduationPlanTypeDescriptorId, GraduationSchoolYear, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.GraduationPlanTypeDescriptorId, OLD.GraduationSchoolYear, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GraduationPlan 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GraduationPlan_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.GunFreeSchoolsActReportingStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.GunFreeSchoolsActReportingStatusDescriptor(GunFreeSchoolsActReportingStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.GunFreeSchoolsActReportingStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.GunFreeSchoolsActReportingStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.GunFreeSchoolsActReportingStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.HomelessPrimaryNighttimeResidenceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.HomelessPrimaryNighttimeResidenceDescriptor(HomelessPrimaryNighttimeResidenceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.HomelessPrimaryNighttimeResidenceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.HomelessPrimaryNighttimeResidenceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.HomelessPrimaryNighttimeResidenceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.HomelessProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.HomelessProgramServiceDescriptor(HomelessProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.HomelessProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.HomelessProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.HomelessProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.IdentificationDocumentUseDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.IdentificationDocumentUseDescriptor(IdentificationDocumentUseDescriptorId, Id, ChangeVersion)
    VALUES (OLD.IdentificationDocumentUseDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.IdentificationDocumentUseDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.IdentificationDocumentUseDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.IncidentLocationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.IncidentLocationDescriptor(IncidentLocationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.IncidentLocationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.IncidentLocationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.IncidentLocationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InstitutionTelephoneNumberTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InstitutionTelephoneNumberTypeDescriptor(InstitutionTelephoneNumberTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InstitutionTelephoneNumberTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InstitutionTelephoneNumberTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InstitutionTelephoneNumberTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InteractivityStyleDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InteractivityStyleDescriptor(InteractivityStyleDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InteractivityStyleDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InteractivityStyleDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InteractivityStyleDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InternetAccessDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InternetAccessDescriptor(InternetAccessDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InternetAccessDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InternetAccessDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InternetAccessDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InterventionClassDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InterventionClassDescriptor(InterventionClassDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InterventionClassDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InterventionClassDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InterventionClassDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InterventionEffectivenessRatingDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InterventionEffectivenessRatingDescriptor(InterventionEffectivenessRatingDescriptorId, Id, ChangeVersion)
    VALUES (OLD.InterventionEffectivenessRatingDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InterventionEffectivenessRatingDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InterventionEffectivenessRatingDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InterventionPrescription_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InterventionPrescription(EducationOrganizationId, InterventionPrescriptionIdentificationCode, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.InterventionPrescriptionIdentificationCode, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InterventionPrescription 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InterventionPrescription_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.InterventionStudy_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.InterventionStudy(EducationOrganizationId, InterventionStudyIdentificationCode, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.InterventionStudyIdentificationCode, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.InterventionStudy 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.InterventionStudy_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Intervention_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Intervention(EducationOrganizationId, InterventionIdentificationCode, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.InterventionIdentificationCode, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Intervention 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Intervention_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LanguageDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LanguageDescriptor(LanguageDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LanguageDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LanguageDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LanguageDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LanguageInstructionProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LanguageInstructionProgramServiceDescriptor(LanguageInstructionProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LanguageInstructionProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LanguageInstructionProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LanguageInstructionProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LanguageUseDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LanguageUseDescriptor(LanguageUseDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LanguageUseDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LanguageUseDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LanguageUseDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningObjective_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningObjective(LearningObjectiveId, Namespace, Id, ChangeVersion)
    VALUES (OLD.LearningObjectiveId, OLD.Namespace, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningObjective 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningObjective_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningStandardCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningStandardCategoryDescriptor(LearningStandardCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LearningStandardCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningStandardCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningStandardCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningStandardEquivalenceAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningStandardEquivalenceAssociation(Namespace, SourceLearningStandardId, TargetLearningStandardId, Id, ChangeVersion)
    VALUES (OLD.Namespace, OLD.SourceLearningStandardId, OLD.TargetLearningStandardId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningStandardEquivalenceAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningStandardEquivalenceAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningStandardEquivalenceStrengthDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningStandardEquivalenceStrengthDescriptor(LearningStandardEquivalenceStrengthDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LearningStandardEquivalenceStrengthDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningStandardEquivalenceStrengthDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningStandardEquivalenceStrengthDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningStandardScopeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningStandardScopeDescriptor(LearningStandardScopeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LearningStandardScopeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningStandardScopeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningStandardScopeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LearningStandard_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LearningStandard(LearningStandardId, Id, ChangeVersion)
    VALUES (OLD.LearningStandardId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LearningStandard 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LearningStandard_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LevelOfEducationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LevelOfEducationDescriptor(LevelOfEducationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LevelOfEducationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LevelOfEducationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LevelOfEducationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LicenseStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LicenseStatusDescriptor(LicenseStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LicenseStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LicenseStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LicenseStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LicenseTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LicenseTypeDescriptor(LicenseTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LicenseTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LicenseTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LicenseTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LimitedEnglishProficiencyDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LimitedEnglishProficiencyDescriptor(LimitedEnglishProficiencyDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LimitedEnglishProficiencyDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LimitedEnglishProficiencyDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LimitedEnglishProficiencyDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LocalEducationAgencyCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LocalEducationAgencyCategoryDescriptor(LocalEducationAgencyCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LocalEducationAgencyCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LocalEducationAgencyCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LocalEducationAgencyCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LocalEducationAgency_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LocalEducationAgency(LocalEducationAgencyId, Id, ChangeVersion)
    VALUES (OLD.LocalEducationAgencyId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LocalEducationAgency 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LocalEducationAgency_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.LocaleDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.LocaleDescriptor(LocaleDescriptorId, Id, ChangeVersion)
    VALUES (OLD.LocaleDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.LocaleDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.LocaleDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Location_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Location(ClassroomIdentificationCode, SchoolId, Id, ChangeVersion)
    VALUES (OLD.ClassroomIdentificationCode, OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Location 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Location_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.MagnetSpecialProgramEmphasisSchoolDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.MagnetSpecialProgramEmphasisSchoolDescriptor(MagnetSpecialProgramEmphasisSchoolDescriptorId, Id, ChangeVersion)
    VALUES (OLD.MagnetSpecialProgramEmphasisSchoolDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.MagnetSpecialProgramEmphasisSchoolDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.MagnetSpecialProgramEmphasisSchoolDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.MediumOfInstructionDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.MediumOfInstructionDescriptor(MediumOfInstructionDescriptorId, Id, ChangeVersion)
    VALUES (OLD.MediumOfInstructionDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.MediumOfInstructionDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.MediumOfInstructionDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.MethodCreditEarnedDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.MethodCreditEarnedDescriptor(MethodCreditEarnedDescriptorId, Id, ChangeVersion)
    VALUES (OLD.MethodCreditEarnedDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.MethodCreditEarnedDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.MethodCreditEarnedDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.MigrantEducationProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.MigrantEducationProgramServiceDescriptor(MigrantEducationProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.MigrantEducationProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.MigrantEducationProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.MigrantEducationProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.MonitoredDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.MonitoredDescriptor(MonitoredDescriptorId, Id, ChangeVersion)
    VALUES (OLD.MonitoredDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.MonitoredDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.MonitoredDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.NeglectedOrDelinquentProgramDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.NeglectedOrDelinquentProgramDescriptor(NeglectedOrDelinquentProgramDescriptorId, Id, ChangeVersion)
    VALUES (OLD.NeglectedOrDelinquentProgramDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.NeglectedOrDelinquentProgramDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.NeglectedOrDelinquentProgramDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.NeglectedOrDelinquentProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.NeglectedOrDelinquentProgramServiceDescriptor(NeglectedOrDelinquentProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.NeglectedOrDelinquentProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.NeglectedOrDelinquentProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.NeglectedOrDelinquentProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.NetworkPurposeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.NetworkPurposeDescriptor(NetworkPurposeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.NetworkPurposeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.NetworkPurposeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.NetworkPurposeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ObjectiveAssessment_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ObjectiveAssessment(AssessmentIdentifier, IdentificationCode, Namespace, Id, ChangeVersion)
    VALUES (OLD.AssessmentIdentifier, OLD.IdentificationCode, OLD.Namespace, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ObjectiveAssessment 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ObjectiveAssessment_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.OldEthnicityDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.OldEthnicityDescriptor(OldEthnicityDescriptorId, Id, ChangeVersion)
    VALUES (OLD.OldEthnicityDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.OldEthnicityDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.OldEthnicityDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.OpenStaffPosition_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.OpenStaffPosition(EducationOrganizationId, RequisitionNumber, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.RequisitionNumber, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.OpenStaffPosition 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.OpenStaffPosition_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.OperationalStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.OperationalStatusDescriptor(OperationalStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.OperationalStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.OperationalStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.OperationalStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.OtherNameTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.OtherNameTypeDescriptor(OtherNameTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.OtherNameTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.OtherNameTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.OtherNameTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Parent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Parent(ParentUSI, Id, ChangeVersion)
    VALUES (OLD.ParentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Parent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Parent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ParticipationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ParticipationDescriptor(ParticipationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ParticipationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ParticipationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ParticipationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ParticipationStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ParticipationStatusDescriptor(ParticipationStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ParticipationStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ParticipationStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ParticipationStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Payroll_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Payroll(AccountIdentifier, AsOfDate, EducationOrganizationId, FiscalYear, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.AccountIdentifier, OLD.AsOfDate, OLD.EducationOrganizationId, OLD.FiscalYear, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Payroll 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Payroll_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PerformanceBaseConversionDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PerformanceBaseConversionDescriptor(PerformanceBaseConversionDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PerformanceBaseConversionDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PerformanceBaseConversionDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PerformanceBaseConversionDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PerformanceLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PerformanceLevelDescriptor(PerformanceLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PerformanceLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PerformanceLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PerformanceLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PersonalInformationVerificationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PersonalInformationVerificationDescriptor(PersonalInformationVerificationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PersonalInformationVerificationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PersonalInformationVerificationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PersonalInformationVerificationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PlatformTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PlatformTypeDescriptor(PlatformTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PlatformTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PlatformTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PlatformTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PopulationServedDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PopulationServedDescriptor(PopulationServedDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PopulationServedDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PopulationServedDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PopulationServedDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PostSecondaryEventCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PostSecondaryEventCategoryDescriptor(PostSecondaryEventCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PostSecondaryEventCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PostSecondaryEventCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PostSecondaryEventCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PostSecondaryEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PostSecondaryEvent(EventDate, PostSecondaryEventCategoryDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.EventDate, OLD.PostSecondaryEventCategoryDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PostSecondaryEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PostSecondaryEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PostSecondaryInstitutionLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PostSecondaryInstitutionLevelDescriptor(PostSecondaryInstitutionLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PostSecondaryInstitutionLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PostSecondaryInstitutionLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PostSecondaryInstitutionLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PostSecondaryInstitution_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PostSecondaryInstitution(PostSecondaryInstitutionId, Id, ChangeVersion)
    VALUES (OLD.PostSecondaryInstitutionId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PostSecondaryInstitution 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PostSecondaryInstitution_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PostingResultDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PostingResultDescriptor(PostingResultDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PostingResultDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PostingResultDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PostingResultDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProficiencyDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProficiencyDescriptor(ProficiencyDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProficiencyDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProficiencyDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProficiencyDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgramAssignmentDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgramAssignmentDescriptor(ProgramAssignmentDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgramAssignmentDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgramAssignmentDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgramAssignmentDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgramCharacteristicDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgramCharacteristicDescriptor(ProgramCharacteristicDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgramCharacteristicDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgramCharacteristicDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgramCharacteristicDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgramSponsorDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgramSponsorDescriptor(ProgramSponsorDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgramSponsorDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgramSponsorDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgramSponsorDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgramTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgramTypeDescriptor(ProgramTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgramTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgramTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgramTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Program_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Program(EducationOrganizationId, ProgramName, ProgramTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Program 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Program_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgressDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgressDescriptor(ProgressDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgressDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgressDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgressDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProgressLevelDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProgressLevelDescriptor(ProgressLevelDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProgressLevelDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProgressLevelDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProgressLevelDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProviderCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProviderCategoryDescriptor(ProviderCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProviderCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProviderCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProviderCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProviderProfitabilityDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProviderProfitabilityDescriptor(ProviderProfitabilityDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProviderProfitabilityDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProviderProfitabilityDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProviderProfitabilityDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ProviderStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ProviderStatusDescriptor(ProviderStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ProviderStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ProviderStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ProviderStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.PublicationStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.PublicationStatusDescriptor(PublicationStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.PublicationStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.PublicationStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.PublicationStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RaceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RaceDescriptor(RaceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RaceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RaceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RaceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ReasonExitedDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ReasonExitedDescriptor(ReasonExitedDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ReasonExitedDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ReasonExitedDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ReasonExitedDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ReasonNotTestedDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ReasonNotTestedDescriptor(ReasonNotTestedDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ReasonNotTestedDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ReasonNotTestedDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ReasonNotTestedDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RecognitionTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RecognitionTypeDescriptor(RecognitionTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RecognitionTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RecognitionTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RecognitionTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RelationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RelationDescriptor(RelationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RelationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RelationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RelationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RepeatIdentifierDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RepeatIdentifierDescriptor(RepeatIdentifierDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RepeatIdentifierDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RepeatIdentifierDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RepeatIdentifierDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ReportCard_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ReportCard(EducationOrganizationId, GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.GradingPeriodDescriptorId, OLD.GradingPeriodSchoolId, OLD.GradingPeriodSchoolYear, OLD.GradingPeriodSequence, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ReportCard 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ReportCard_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ReporterDescriptionDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ReporterDescriptionDescriptor(ReporterDescriptionDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ReporterDescriptionDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ReporterDescriptionDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ReporterDescriptionDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ResidencyStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ResidencyStatusDescriptor(ResidencyStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ResidencyStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ResidencyStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ResidencyStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ResponseIndicatorDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ResponseIndicatorDescriptor(ResponseIndicatorDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ResponseIndicatorDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ResponseIndicatorDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ResponseIndicatorDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ResponsibilityDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ResponsibilityDescriptor(ResponsibilityDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ResponsibilityDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ResponsibilityDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ResponsibilityDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RestraintEventReasonDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RestraintEventReasonDescriptor(RestraintEventReasonDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RestraintEventReasonDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RestraintEventReasonDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RestraintEventReasonDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RestraintEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RestraintEvent(RestraintEventIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.RestraintEventIdentifier, OLD.SchoolId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RestraintEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RestraintEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ResultDatatypeTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ResultDatatypeTypeDescriptor(ResultDatatypeTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ResultDatatypeTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ResultDatatypeTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ResultDatatypeTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.RetestIndicatorDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.RetestIndicatorDescriptor(RetestIndicatorDescriptorId, Id, ChangeVersion)
    VALUES (OLD.RetestIndicatorDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.RetestIndicatorDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.RetestIndicatorDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SchoolCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SchoolCategoryDescriptor(SchoolCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SchoolCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SchoolCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SchoolCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SchoolChoiceImplementStatusDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SchoolChoiceImplementStatusDescriptor(SchoolChoiceImplementStatusDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SchoolChoiceImplementStatusDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SchoolChoiceImplementStatusDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SchoolChoiceImplementStatusDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SchoolFoodServiceProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SchoolFoodServiceProgramServiceDescriptor(SchoolFoodServiceProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SchoolFoodServiceProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SchoolFoodServiceProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SchoolFoodServiceProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SchoolTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SchoolTypeDescriptor(SchoolTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SchoolTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SchoolTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SchoolTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.School_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.School(SchoolId, Id, ChangeVersion)
    VALUES (OLD.SchoolId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.School 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.School_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SectionAttendanceTakenEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SectionAttendanceTakenEvent(CalendarCode, Date, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    VALUES (OLD.CalendarCode, OLD.Date, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SectionAttendanceTakenEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SectionAttendanceTakenEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SectionCharacteristicDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SectionCharacteristicDescriptor(SectionCharacteristicDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SectionCharacteristicDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SectionCharacteristicDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SectionCharacteristicDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Section_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Section(LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, Id, ChangeVersion)
    VALUES (OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Section 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Section_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SeparationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SeparationDescriptor(SeparationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SeparationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SeparationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SeparationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SeparationReasonDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SeparationReasonDescriptor(SeparationReasonDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SeparationReasonDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SeparationReasonDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SeparationReasonDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.ServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.ServiceDescriptor(ServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.ServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.ServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.ServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Session_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Session(SchoolId, SchoolYear, SessionName, Id, ChangeVersion)
    VALUES (OLD.SchoolId, OLD.SchoolYear, OLD.SessionName, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Session 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Session_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SexDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SexDescriptor(SexDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SexDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SexDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SexDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SpecialEducationProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SpecialEducationProgramServiceDescriptor(SpecialEducationProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SpecialEducationProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SpecialEducationProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SpecialEducationProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.SpecialEducationSettingDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.SpecialEducationSettingDescriptor(SpecialEducationSettingDescriptorId, Id, ChangeVersion)
    VALUES (OLD.SpecialEducationSettingDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.SpecialEducationSettingDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.SpecialEducationSettingDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffAbsenceEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffAbsenceEvent(AbsenceEventCategoryDescriptorId, EventDate, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.AbsenceEventCategoryDescriptorId, OLD.EventDate, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffAbsenceEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffAbsenceEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffClassificationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffClassificationDescriptor(StaffClassificationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StaffClassificationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffClassificationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffClassificationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffCohortAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffCohortAssociation(BeginDate, CohortIdentifier, EducationOrganizationId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.CohortIdentifier, OLD.EducationOrganizationId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffCohortAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffCohortAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffDisciplineIncidentAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffDisciplineIncidentAssociation(IncidentIdentifier, SchoolId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.IncidentIdentifier, OLD.SchoolId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffDisciplineIncidentAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffDisciplineIncidentAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffEducationOrganizationAssignmentAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffEducationOrganizationAssignmentAssociation(BeginDate, EducationOrganizationId, StaffClassificationDescriptorId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.StaffClassificationDescriptorId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffEducationOrganizationAssignmentAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffEducationOrganizationAssignmentAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffEducationOrganizationContactAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffEducationOrganizationContactAssociation(ContactTitle, EducationOrganizationId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.ContactTitle, OLD.EducationOrganizationId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffEducationOrganizationContactAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffEducationOrganizationContactAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffEducationOrganizationEmploymentAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffEducationOrganizationEmploymentAssociation(EducationOrganizationId, EmploymentStatusDescriptorId, HireDate, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.EmploymentStatusDescriptorId, OLD.HireDate, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffEducationOrganizationEmploymentAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffEducationOrganizationEmploymentAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffIdentificationSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffIdentificationSystemDescriptor(StaffIdentificationSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StaffIdentificationSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffIdentificationSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffIdentificationSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffLeaveEventCategoryDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffLeaveEventCategoryDescriptor(StaffLeaveEventCategoryDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StaffLeaveEventCategoryDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffLeaveEventCategoryDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffLeaveEventCategoryDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffLeave_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffLeave(BeginDate, StaffLeaveEventCategoryDescriptorId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.StaffLeaveEventCategoryDescriptorId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffLeave 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffLeave_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffProgramAssociation(BeginDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffSchoolAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffSchoolAssociation(ProgramAssignmentDescriptorId, SchoolId, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.ProgramAssignmentDescriptorId, OLD.SchoolId, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffSchoolAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffSchoolAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StaffSectionAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StaffSectionAssociation(LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StaffUSI, Id, ChangeVersion)
    VALUES (OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StaffSectionAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StaffSectionAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Staff_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Staff(StaffUSI, Id, ChangeVersion)
    VALUES (OLD.StaffUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Staff 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Staff_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StateAbbreviationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StateAbbreviationDescriptor(StateAbbreviationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StateAbbreviationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StateAbbreviationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StateAbbreviationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StateEducationAgency_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StateEducationAgency(StateEducationAgencyId, Id, ChangeVersion)
    VALUES (OLD.StateEducationAgencyId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StateEducationAgency 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StateEducationAgency_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentAcademicRecord_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentAcademicRecord(EducationOrganizationId, SchoolYear, StudentUSI, TermDescriptorId, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.SchoolYear, OLD.StudentUSI, OLD.TermDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentAcademicRecord 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentAcademicRecord_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentAssessment_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentAssessment(AssessmentIdentifier, Namespace, StudentAssessmentIdentifier, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.AssessmentIdentifier, OLD.Namespace, OLD.StudentAssessmentIdentifier, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentAssessment 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentAssessment_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentCTEProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentCTEProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentCTEProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentCTEProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentCharacteristicDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentCharacteristicDescriptor(StudentCharacteristicDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StudentCharacteristicDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentCharacteristicDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentCharacteristicDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentCohortAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentCohortAssociation(BeginDate, CohortIdentifier, EducationOrganizationId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.CohortIdentifier, OLD.EducationOrganizationId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentCohortAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentCohortAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentCompetencyObjective_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentCompetencyObjective(GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, Objective, ObjectiveEducationOrganizationId, ObjectiveGradeLevelDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.GradingPeriodDescriptorId, OLD.GradingPeriodSchoolId, OLD.GradingPeriodSchoolYear, OLD.GradingPeriodSequence, OLD.Objective, OLD.ObjectiveEducationOrganizationId, OLD.ObjectiveGradeLevelDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentCompetencyObjective 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentCompetencyObjective_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentDisciplineIncidentAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentDisciplineIncidentAssociation(IncidentIdentifier, SchoolId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.IncidentIdentifier, OLD.SchoolId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentDisciplineIncidentAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentDisciplineIncidentAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentEducationOrganizationAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentEducationOrganizationAssociation(EducationOrganizationId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentEducationOrganizationAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentEducationOrganizationAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentEducationOrganizationResponsibilityAss_42aa64_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentEducationOrganizationResponsibilityAssociation(BeginDate, EducationOrganizationId, ResponsibilityDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ResponsibilityDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentEducationOrganizationResponsibilityAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentEducationOrganizationResponsibilityAss_42aa64_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentGradebookEntry_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentGradebookEntry(BeginDate, DateAssigned, GradebookEntryTitle, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.DateAssigned, OLD.GradebookEntryTitle, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentGradebookEntry 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentGradebookEntry_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentHomelessProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentHomelessProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentHomelessProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentHomelessProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentIdentificationSystemDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentIdentificationSystemDescriptor(StudentIdentificationSystemDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StudentIdentificationSystemDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentIdentificationSystemDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentIdentificationSystemDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentInterventionAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentInterventionAssociation(EducationOrganizationId, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.EducationOrganizationId, OLD.InterventionIdentificationCode, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentInterventionAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentInterventionAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentInterventionAttendanceEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentInterventionAttendanceEvent(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, InterventionIdentificationCode, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.AttendanceEventCategoryDescriptorId, OLD.EducationOrganizationId, OLD.EventDate, OLD.InterventionIdentificationCode, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentInterventionAttendanceEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentInterventionAttendanceEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentLanguageInstructionProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentLanguageInstructionProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentLanguageInstructionProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentLanguageInstructionProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentLearningObjective_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentLearningObjective(GradingPeriodDescriptorId, GradingPeriodSchoolId, GradingPeriodSchoolYear, GradingPeriodSequence, LearningObjectiveId, Namespace, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.GradingPeriodDescriptorId, OLD.GradingPeriodSchoolId, OLD.GradingPeriodSchoolYear, OLD.GradingPeriodSequence, OLD.LearningObjectiveId, OLD.Namespace, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentLearningObjective 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentLearningObjective_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentMigrantEducationProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentMigrantEducationProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentMigrantEducationProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentMigrantEducationProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentNeglectedOrDelinquentProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentNeglectedOrDelinquentProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentNeglectedOrDelinquentProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentNeglectedOrDelinquentProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentParentAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentParentAssociation(ParentUSI, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.ParentUSI, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentParentAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentParentAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentParticipationCodeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentParticipationCodeDescriptor(StudentParticipationCodeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.StudentParticipationCodeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentParticipationCodeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentParticipationCodeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentProgramAttendanceEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentProgramAttendanceEvent(AttendanceEventCategoryDescriptorId, EducationOrganizationId, EventDate, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.AttendanceEventCategoryDescriptorId, OLD.EducationOrganizationId, OLD.EventDate, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentProgramAttendanceEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentProgramAttendanceEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSchoolAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSchoolAssociation(EntryDate, SchoolId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.EntryDate, OLD.SchoolId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSchoolAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSchoolAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSchoolAttendanceEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSchoolAttendanceEvent(AttendanceEventCategoryDescriptorId, EventDate, SchoolId, SchoolYear, SessionName, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.AttendanceEventCategoryDescriptorId, OLD.EventDate, OLD.SchoolId, OLD.SchoolYear, OLD.SessionName, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSchoolAttendanceEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSchoolAttendanceEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSchoolFoodServiceProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSchoolFoodServiceProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSchoolFoodServiceProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSchoolFoodServiceProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSectionAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSectionAssociation(BeginDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSectionAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSectionAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSectionAttendanceEvent_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSectionAttendanceEvent(AttendanceEventCategoryDescriptorId, EventDate, LocalCourseCode, SchoolId, SchoolYear, SectionIdentifier, SessionName, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.AttendanceEventCategoryDescriptorId, OLD.EventDate, OLD.LocalCourseCode, OLD.SchoolId, OLD.SchoolYear, OLD.SectionIdentifier, OLD.SessionName, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSectionAttendanceEvent 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSectionAttendanceEvent_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentSpecialEducationProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentSpecialEducationProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentSpecialEducationProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentSpecialEducationProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.StudentTitleIPartAProgramAssociation_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.StudentTitleIPartAProgramAssociation(BeginDate, EducationOrganizationId, ProgramEducationOrganizationId, ProgramName, ProgramTypeDescriptorId, StudentUSI, Id, ChangeVersion)
    VALUES (OLD.BeginDate, OLD.EducationOrganizationId, OLD.ProgramEducationOrganizationId, OLD.ProgramName, OLD.ProgramTypeDescriptorId, OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.StudentTitleIPartAProgramAssociation 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.StudentTitleIPartAProgramAssociation_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.Student_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.Student(StudentUSI, Id, ChangeVersion)
    VALUES (OLD.StudentUSI, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.Student 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.Student_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TeachingCredentialBasisDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TeachingCredentialBasisDescriptor(TeachingCredentialBasisDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TeachingCredentialBasisDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TeachingCredentialBasisDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TeachingCredentialBasisDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TeachingCredentialDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TeachingCredentialDescriptor(TeachingCredentialDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TeachingCredentialDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TeachingCredentialDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TeachingCredentialDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TechnicalSkillsAssessmentDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TechnicalSkillsAssessmentDescriptor(TechnicalSkillsAssessmentDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TechnicalSkillsAssessmentDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TechnicalSkillsAssessmentDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TechnicalSkillsAssessmentDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TelephoneNumberTypeDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TelephoneNumberTypeDescriptor(TelephoneNumberTypeDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TelephoneNumberTypeDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TelephoneNumberTypeDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TelephoneNumberTypeDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TermDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TermDescriptor(TermDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TermDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TermDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TermDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TitleIPartAParticipantDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TitleIPartAParticipantDescriptor(TitleIPartAParticipantDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TitleIPartAParticipantDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TitleIPartAParticipantDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TitleIPartAParticipantDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TitleIPartAProgramServiceDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TitleIPartAProgramServiceDescriptor(TitleIPartAProgramServiceDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TitleIPartAProgramServiceDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TitleIPartAProgramServiceDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TitleIPartAProgramServiceDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TitleIPartASchoolDesignationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TitleIPartASchoolDesignationDescriptor(TitleIPartASchoolDesignationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TitleIPartASchoolDesignationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TitleIPartASchoolDesignationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TitleIPartASchoolDesignationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.TribalAffiliationDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.TribalAffiliationDescriptor(TribalAffiliationDescriptorId, Id, ChangeVersion)
    VALUES (OLD.TribalAffiliationDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.TribalAffiliationDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.TribalAffiliationDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.VisaDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.VisaDescriptor(VisaDescriptorId, Id, ChangeVersion)
    VALUES (OLD.VisaDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.VisaDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.VisaDescriptor_TR_DelTrkg();

CREATE FUNCTION Tracked_Deletes_edfi.WeaponDescriptor_TR_DelTrkg()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO Tracked_Deletes_edfi.WeaponDescriptor(WeaponDescriptorId, Id, ChangeVersion)
    VALUES (OLD.WeaponDescriptorId, OLD.Id, nextval('changes.ChangeVersionSequence'));

    RETURN NULL;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER TrackDeletes AFTER DELETE ON edfi.WeaponDescriptor 
    FOR EACH ROW EXECUTE PROCEDURE Tracked_Deletes_edfi.WeaponDescriptor_TR_DelTrkg();

