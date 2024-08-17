//  Trigger to automatically update the number of invitations sent by each user when a new invitation is added:


CREATE TRIGGER update_num_invitations
AFTER INSERT ON INVITATIONS
FOR EACH ROW
BEGIN
    UPDATE USERS
    SET num_invitations = (
        SELECT COUNT(*)
        FROM INVITATIONS
        WHERE user_id = NEW.user_id
    )
    WHERE user_id = NEW.user_id;
END 

DELIMITER ;


// Trigger to automatically update the number of invitations sent for each event type when a new invitation is added:


CREATE TRIGGER update_num_event_invitations
AFTER INSERT ON INVITATIONS
FOR EACH ROW
BEGIN
    UPDATE TEMPLATES
    SET num_invitations = (
        SELECT COUNT(*)
        FROM INVITATIONS
        WHERE template_id = NEW.template_id
    )
    WHERE template_id = NEW.template_id;
END //

DELIMITER ;


// Trigger to automatically update the count of users who have customized their color theme:


CREATE TRIGGER update_customization_count
AFTER INSERT ON CUSTOMIZATION
FOR EACH ROW
BEGIN
    UPDATE Customization_Count
    SET num_users = (
        SELECT COUNT(DISTINCT user_id)
        FROM CUSTOMIZATION
        WHERE color_theme IS NOT NULL
    );
END 

DELIMITER ;


// Trigger to automatically update the count of invitations with positive response status:


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


//  Trigger to log payment details when a new payment is made:



CREATE TRIGGER log_payment_details
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    INSERT INTO Payment_Log (payid, user_id, amount, dop, method, transaction_id, status)
    VALUES (NEW.payid, NEW.user_id, NEW.amount, NEW.dop, NEW.method, NEW.transaction_id, NEW.status);
END 

DELIMITER ;


// Trigger to enforce a constraint ensuring that each user can only have one customization record:


CREATE TRIGGER enforce_single_customization_record
BEFORE INSERT ON CUSTOMIZATION
FOR EACH ROW
BEGIN
    DECLARE customization_count INT;
    SELECT COUNT(*)
    INTO customization_count
    FROM CUSTOMIZATION
    WHERE user_id = NEW.user_id;
    
    IF customization_count >= 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Each user can only have one customization record.';
    END IF;
END 

DELIMITER ;


// Trigger to automatically update the status of an invitation when a corresponding RSVP response is added:


CREATE TRIGGER update_invitation_status
AFTER INSERT ON RSVP_RESPONSES
FOR EACH ROW
BEGIN
    DECLARE invitation_status VARCHAR(15);
    
    IF NEW.response_status = 'Attending' THEN
        SET invitation_status = 'Accepted';
    ELSEIF NEW.response_status = 'Not Attending' THEN
        SET invitation_status = 'Declined';
    ELSE
        SET invitation_status = 'Pending';
    END IF;
    
    UPDATE INVITATIONS
    SET status = invitation_status
    WHERE invitation_id = NEW.invitation_id;
END 

DELIMITER ;


//  Trigger to calculate and update the total amount spent by a user when a new payment is made:



CREATE TRIGGER update_total_amount_spent
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    UPDATE USERS
    SET total_amount_spent = total_amount_spent + NEW.amount
    WHERE user_id = NEW.user_id;
END 

DELIMITER ;
