CREATE TABLE tags (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE resume_tags (
                             resume_id INT REFERENCES resumes(id),
                             tag_id INT REFERENCES tags(id),
                             PRIMARY KEY (resume_id, tag_id)
);
