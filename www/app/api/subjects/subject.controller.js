import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";
import { SendBulkMail } from "../../helpers/sendbulkmail";
import { encryptPassword } from "../../helpers/passwordEncryption";
import userRoles from "../../constants/userRoles";
import { getTokenObject } from "../../helpers/generateTokenObject";
import { User } from "../../db/entity/User";

dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export async function getCourseAndSubjectByDepartment(req,res) {
  let departmentId = parseInt(req.params["department_id"]);
  var connection = getConnection();

  const courseRepository =connection.getRepository("Course");
  const subjectRepository = connection.getRepository("Subject");

    // Create the query
  const getCoursesQuery = courseRepository
  .createQueryBuilder('c')
  .select('c.*')
  .where('c.department_id = :departmentId', { departmentId })
  .andWhere('c.status = true')


  const getSubjectsQuery = subjectRepository
  .createQueryBuilder('sub')
  .select('sub.*')
  .where('sub.course_id IN (SELECT id FROM public.courses WHERE department_id = :departmentId)', { departmentId })
  .andWhere('sub.status = true')

  try {
    const [courses, subjects] = await Promise.all([
        getCoursesQuery.getRawMany(),
        getSubjectsQuery.getRawMany(),
    ]);
    
    let sortedsubjects = {}
    subjects.forEach(function(subject) {
      if (subject.course_id in sortedsubjects){
        sortedsubjects[subject.course_id].push(subject)
      }
      else{
        sortedsubjects[subject.course_id] = [subject]
      }
    });
    
    
    res.json({courses, subjects:sortedsubjects});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Couldn't fetch courses and subjects" });
  }
}




