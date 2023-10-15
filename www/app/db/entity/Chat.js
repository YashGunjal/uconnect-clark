import { EntitySchema } from "typeorm";

export const Chat = new EntitySchema({
    name: "Chat",
    tableName: "chats",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid-ossp",
            unique: true,
        },
        message: {
            type: "text",
            nullable: false,
        },
        applicationUserId: {
            type: "uuid",
            nullable: false,
            name:"application_user_id"
        },
        courseId: {
            type: "uuid",
            nullable: false,
        },
        previousChatId: {
            name: "previous_chat_id",
            type: "uuid",
            nullable: true,
        },
        createdAt: {
            name:"created_at",
            type: "timestamp",
            createDate: true,
          
        },
        updatedAt: {
            name:"updated_at",
            type: "timestamp",
            updateDate: true,
            nullable: false,
        },
        status: {
            type: "boolean",
            default: true,
            nullable: false,
        },
    }
});
