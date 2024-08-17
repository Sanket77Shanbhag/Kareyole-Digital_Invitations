CREATE DATABASE IF NOT EXISTS kareyoledb;

USE kareyoledb;

CREATE TABLE IF NOT EXISTS USERS(
user_id varchar(30),
username char(20),
password varchar(15),
primary key(user_id));

CREATE TABLE IF NOT EXISTS TEMPLATES(
template_id varchar(10),
title char(20),
content char(30),
primary key(template_id));


CREATE TABLE IF NOT EXISTS CUSTOMIZATION (
customization_id varchar(10),
user_id varchar(30),
color_theme char(15),
font_style char(15),
personal_images blob,
primary key(customization_id),
foreign key(user_id)references USERS(user_id));

CREATE TABLE IF NOT EXISTS INVITATIONS(
invitation_id varchar(10),
user_id varchar(30),
template_id varchar(10),
customization_id varchar(10),
title char(20),
dates date,
location varchar(30),
primary key(invitation_id),
foreign key(user_id)references USERS(user_id),
foreign key(template_id)references TEMPLATES(template_id),
foreign key(customization_id)references CUSTOMIZATION(customization_id));

ALTER TABLE invitations
ADD COLUMN no_of_invitations INT;

UPDATE invitations
SET no_of_invitations = (
    SELECT COUNT(*)
    FROM invitations
);



CREATE TABLE IF NOT EXISTS RSVP_RESPONSES(
rsvp_id varchar(10),
invitation_id varchar(10),
user_id varchar(30),
response_status char(15),
guest_name char(15),
additional_guests char(5),
comments char(30),
primary key(rsvp_id),
foreign key(user_id)references USERS(user_id),
foreign key(invitation_id)references INVITATIONS(invitation_id));

CREATE TABLE IF NOT EXISTS contact_us (
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(10),
    message VARCHAR(100));