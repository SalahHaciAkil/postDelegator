
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
  scheduled_to INTEGER
);



CREATE TABLE post_segment (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  segment_id INTEGER NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (segment_id) REFERENCES segment(id) ON DELETE CASCADE,
  UNIQUE (post_id, segment_id)
);

CREATE TABLE post_person (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  UNIQUE (post_id, person_id)
);




INSERT INTO segment (id, name, color) VALUES (1, 'prospect', '#ed6464');
INSERT INTO segment (id, name, color) VALUES (2, 'lead', '#648bed');
INSERT INTO segment (id, name, color) VALUES (3, 'customer', '#68ed64');

INSERT INTO person (name, email, segment_id) VALUES ('salah', 'salah@gmail.com', 1);
INSERT INTO person (name, email, segment_id) VALUES ('test', 'test@gmail.com', 2);
INSERT INTO person (name, email, segment_id) VALUES ('john', 'john@gmail.com', 2);
INSERT INTO person (name, email, segment_id) VALUES ('ahmed', 'ahmed@gmail.com', 2);
INSERT INTO person (name, email, segment_id) VALUES ('wael', 'wael@gmail.com', 1);


INSERT INTO post (title, subtitle, text, scheduled_to) VALUES (' The Benefits of Regular Exercise', 'Why Physical Activity is Essential for Your Health', 'Regular exercise has been shown to improve heart health, increase muscle strength, and reduce the risk of chronic diseases such as diabetes and cancer. It can also boost your mood and reduce symptoms of depression and anxiety. Whether you prefer running, weight lifting, or yoga, finding an activity that you enjoy can make it easier to stick to a consistent exercise routine. Aim for at least 30 minutes of moderate-intensity exercise each day to reap the full benefits.',  1);
INSERT INTO post (title, subtitle, text, scheduled_to) VALUES (' The Importance of Financial Planning', 'How to Secure Your Future Financial Stability', 'Financial planning involves creating a roadmap for achieving your financial goals. It can help you manage debt, save for retirement, and build a solid foundation for your future. Start by assessing your current financial situation and identifying your short-term and long-term goals. From there, you can create a budget, set up automatic savings, and invest in a diversified portfolio to help grow your wealth over time. Do not wait until it is too late - start planning for your financial future today.',  2);
INSERT INTO post (title, subtitle, text) VALUES (' Tips for a Successful Job Interview', ' How to Impress Your Potential Employer', 'A successful job interview can be the difference between landing your dream job and continuing your job search. To prepare, research the company and the role you are interviewing for and practice answering common interview questions. Dress professionally, arrive on time, and be prepared to ask thoughtful questions about the company and the position. During the interview, maintain eye contact, speak clearly and confidently, and highlight your relevant skills and experience. Finally, follow up with a thank-you note or email to express your gratitude for the opportunity to interview.');
INSERT INTO post (title, subtitle, text) VALUES ('title', 'subtitle', 'text');
INSERT INTO post (title, subtitle, text) VALUES ('title', 'subtitle', 'text');


INSERT INTO post_segment (post_id, segment_id) VALUES (2, 2);

INSERT INTO post_person (post_id, person_id) VALUES (1, 1);
INSERT INTO post_person (post_id, person_id) VALUES (1, 2);