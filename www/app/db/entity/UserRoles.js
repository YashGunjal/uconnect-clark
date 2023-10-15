import { EntitySchema } from "typeorm";

export const UserRoles = new EntitySchema({
    name: "UserRoles",
    tableName: "user_roles",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            unique: true,
        },
        role: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        access: {
            type:"jsonb",
            default:{}
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
