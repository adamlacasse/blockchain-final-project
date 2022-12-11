ALTER TABLE polls
DROP COLUMN creator_signature;

ALTER TABLE polls
ADD COLUMN creator_address VARCHAR;
