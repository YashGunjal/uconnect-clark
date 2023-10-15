import { EntitySchema } from "typeorm";

export const Post = new EntitySchema({
    name: "Post",
    tableName: "posts",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
            unique: true,
        },
        content: {
            type: "text",
            nullable: false,
        },
        userId: {
            name:"user_id",
            type: "uuid",
            nullable: false,
        },
        courseId: {
            name:"course_id",
            type: "uuid",
            nullable: false,
        },
        status: {
            type: "boolean",
            default: true,
            nullable: false,
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
    }
});
