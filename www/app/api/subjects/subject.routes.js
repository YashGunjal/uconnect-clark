import appRouter from "../../site/appRouter.js";
import { verifyToken } from "../auth/auth.controller.js";
import { getCourseAndSubjectByDepartment } from  "./subject.controller.js"

appRouter.addGetController("/v1/subject/getcourseandsubjects/:department_id", verifyToken, getCourseAndSubjectByDepartment);
