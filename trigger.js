<<<<<<< HEAD
DELIMITER 
CREATE TRIGGER update_positive_response_count
AFTER INSERT ON RSVP_RESPONSES
FOR EACH ROW
BEGIN
    UPDATE Positive_Response_Count
    SET num_invitations = (
        SELECT COUNT(*)
        FROM RSVP_RESPONSES
        WHERE response_status = 'Attending'
    );
END 
DELIMITER ;
=======
DELIMITER 
CREATE TRIGGER update_positive_response_count
AFTER INSERT ON RSVP_RESPONSES
FOR EACH ROW
BEGIN
    UPDATE Positive_Response_Count
    SET num_invitations = (
        SELECT COUNT(*)
        FROM RSVP_RESPONSES
        WHERE response_status = 'Attending'
    );
END 
DELIMITER ;
>>>>>>> da40c6a5435dc6a8a0c42c001bdb8184b9aba346
