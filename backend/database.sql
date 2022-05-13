create TABLE user_table (
    id uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(255) UNIQUE,
    firstname VARCHAR(255),
    avatarUrl VARCHAR(255),
    phone VARCHAR(255) UNIQUE,
    PRIMARY KEY (id)
);

create TABLE messages (
    id uuid DEFAULT uuid_generate_v4 (),
    text VARCHAR(255),
    userId uuid,
    chatId uuid,
    created_at TIMESTAMP DEFAULT now()
);

create TABLE rooms (
    id uuid DEFAULT uuid_generate_v4 () UNIQUE,
    users uuid[],
    created_at TIMESTAMP DEFAULT now()
);