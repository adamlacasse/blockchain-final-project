CREATE TABLE IF NOT EXISTS nodes
(
    id BIGSERIAL,
    type VARCHAR,
    address VARCHAR,
    public_key VARCHAR,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS blocks 
(
    id BIGSERIAL,
    timestamp TIMESTAMP DEFAULT NOW(),
    previous_hash VARCHAR NOT NULL,
    hash VARCHAR NOT NULL,
    transactions VARCHAR,
    validator_address VARCHAR,
    validator_signature VARCHAR,
    PRIMARY KEY (id)
);

/*
    POLLS
        - transaction has type = POLL
        - data object must include a "questions" array of questions
            from the questions table associated with the poll
    RESPONSES
        - transaction has type = RESPONSE
        - data object must include properties "pollId" and "questionId" to
            link back appropriately
        - also metadata about respondent
    
*/
CREATE TABLE IF NOT EXISTS transactions
(
    id BIGSERIAL,
    type VARCHAR,
    timestamp TIMESTAMP DEFAULT NOW(),
    creator_signature VARCHAR,
    block_id BIGINT, -- Only populated after validation & publication to the chain
    data VARCHAR, -- Convert back and forth to JSON in JS
    PRIMARY KEY (id),
    FOREIGN KEY (block_id) REFERENCES blocks(id)
);

CREATE TABLE IF NOT EXISTS polls
(
    id BIGSERIAL,
    timestamp TIMESTAMP DEFAULT NOW(),
    creator_signature VARCHAR,
    meta_data VARCHAR, -- Convert back and forth to JSON in JS
    respondent_award INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS questions
(
    id BIGSERIAL,
    timestamp TIMESTAMP DEFAULT NOW(),
    creator_signature VARCHAR,
    meta_data VARCHAR, -- Convert back and forth to JSON in JS
    poll_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (poll_id) REFERENCES polls(id)
);

CREATE TABLE IF NOT EXISTS responses
(
    id BIGSERIAL,
    timestamp TIMESTAMP DEFAULT NOW(),
    response VARCHAR,
    meta_data VARCHAR, -- Convert back and forth to JSON in JS
    question_id BIGINT,
    respondent_address VARCHAR,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
