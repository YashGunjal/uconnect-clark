import { EntitySchema } from "typeorm";

export const PostReply = new EntitySchema({
    name: "PostReply",
    tableName: "post_reply",
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
        postId: {
            name:"post_id",
            type: "uuid",
            nullable: false,
        },
        likes:{
            name:"likes",
            type: "int",
            nullable: false,
            default: 0,
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
