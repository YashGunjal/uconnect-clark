import { EntitySchema } from "typeorm";

export const Subject = new EntitySchema({
    name: "Subject",
    tableName: "subjects",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            unique: true,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        courseId: {
            name:"course_id", 
            type: "int",
            nullable: false,
            default: 1
        },
        description:{
            type:"text",
            nullable: true,
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
