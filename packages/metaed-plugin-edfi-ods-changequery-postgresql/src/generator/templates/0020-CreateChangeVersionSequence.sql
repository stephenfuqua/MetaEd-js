CREATE SEQUENCE IF NOT EXISTS changes.ChangeVersionSequence START WITH 1;

CREATE FUNCTION changes.updateChangeVersion()
    RETURNS trigger AS
$BODY$
BEGIN
    new.ChangeVersion := nextval('changes.ChangeVersionSequence');
    RETURN new;
END;
$BODY$ LANGUAGE plpgsql;
