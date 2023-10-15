import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
            unique: true,
        },
        first_name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        last_name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        email: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        auth_token: {
            type: "varchar",
            nullable: true,
        },
        role_id: {
            type: "int",
            nullable: true,
        },
        status: {
            type: "boolean",
            default: true,
            nullable: false,
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            nullable: false,
        },
        updated_at: {
            type: "timestamp",
            updateDate: true,
            nullable: false,
        },
    }
});
