
CREATE TABLE segment (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL
);


CREATE TABLE person (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  segment_id INTEGER NOT NULL,
  FOREIGN KEY (segment_id) REFERENCES segment(id)
);

CREATE TABLE post (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  text TEXT NOT NULL,
  sent BOOLEAN NOT NULL DEFAULT FALSE,
  assigned_to INTEGER
);



CREATE TABLE post_segment (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  segment_id INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (segment_id) REFERENCES segment(id) ON DELETE CASCADE,
  UNIQUE (post_id, segment_id)
);

CREATE TABLE post_person (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  UNIQUE (post_id, person_id)
);




INSERT INTO segment (id, name, color) VALUES (1, 'prospect', 'red');
INSERT INTO segment (id, name, color) VALUES (2, 'lead', 'blue');
INSERT INTO segment (id, name, color) VALUES (3, 'customer', 'green');

INSERT INTO person (name, email, segment_id) VALUES ('salah', 'salah@gmail.com', 1);
INSERT INTO person (name, email, segment_id) VALUES ('test', 'test@gmail.com', 2);
INSERT INTO person (name, email, segment_id) VALUES ('john', 'john@gmail.com', 3);
INSERT INTO person (name, email, segment_id) VALUES ('ahmed', 'ahmed@gmail.com', 2);
INSERT INTO person (name, email, segment_id) VALUES ('wael', 'wael@gmail.com', 1);


INSERT INTO post (title, subtitle, text, assigned_to) VALUES ('title 1', 'subtitle 1', 'text 1',  1);
INSERT INTO post (title, subtitle, text) VALUES ('title 1', 'subtitle 1', 'text 1');


INSERT INTO post_segment (post_id, segment_id) VALUES (1, 1);

INSERT INTO post_person (post_id, person_id) VALUES (1, 1);
INSERT INTO post_person (post_id, person_id) VALUES (1, 2);