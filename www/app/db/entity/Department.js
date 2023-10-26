import { EntitySchema } from "typeorm";

export const Department = new EntitySchema({
    name: "Department",
    tableName: "departments",
    columns: {
        id: {
            primary: true,
            type: "int",
            // generated: "uuid",
            unique: true,
        },
        name: {
            type: "varchar",
            length: 255,
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
