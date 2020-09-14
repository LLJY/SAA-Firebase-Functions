import * as mongoose from "mongoose";
import * as argon2 from "argon2";
import * as functions from 'firebase-functions';
import { IUser, UserSchema } from "./models";
import { database } from "firebase-admin";
const uri =
  "mongodb+srv://lucas:CieX07GIUFkVjQD0@cluster0.uruiw.gcp.mongodb.net/SAA?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.trace(err);
    }
  }
);
let db = mongoose.connection;
let User = mongoose.model<IUser>("User", UserSchema);

export const helloWorld = function (req: any, res: any) {
  res.json("hello world");
};

export const dbTest = async function () {
  try {
  } catch (ex) {
    console.error(ex);
  }
};
/**
 * signs up a new user
 * @param request 
 * @param response 
 */
export const signUp = async function (request: functions.https.Request, response: functions.Response) {
  try {
    let newUser = new User;
    let data = request.body;
    // hash the password with argon2
    let passwordHash = await argon2.hash(data.password);
    newUser.passwordHash = passwordHash;
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    // check if middlename exists before assigning it
    newUser.middleName = data.middleName ?? null;
    newUser.notificationToken = data.notificationToken;
    if (data.userLevel) {
      newUser.employeeInfo = {
        userLevel: data.userLevel,
        approved: false,
      };
    }
    newUser.email = data.email;
    newUser.passportNumber = data.passportNumber;
    newUser.passportExpiry = data.passportExpiry;
    newUser.dateOfBirth = data.dateOfBirth;
    if(data.organisation){
        newUser.companyInfo = {
            organisation: data.organisation,
            jobTitle: data.jobTitle,
          };
    }
    newUser.country = data.country;
    await newUser.save();
    response.json("success");
  } catch (ex) {
    console.error(ex.toString());
    response.status(500).json("err");
  }
};
/**
 * Checks if the user's email exists, used with forget password
 * @param request 
 * @param response 
 */
export const checkEmail = async function (request: functions.https.Request, response: functions.Response){
    try{
        let count = await User.count({email: request.body.email})
        if(count > 0){
            response.json("success")
        }else{
            response.json("failed")
        }
    }catch(ex){
        console.error(ex.toString());
        response.status(500).json("err");
    }
}
/**
 * change passwords, find user by email and hash the new password
 * @param request 
 * @param response 
 */
export const changePassword = async function (request: functions.https.Request, response: functions.Response) {
    try{
        let user = await User.findOne({email: request.body.email})
        if(user){
            user.passwordHash = await argon2.hash(request.body.password);
            response.json("success");
        }
        response.status(500).json("err");
    }catch(ex){
        console.error(ex.toString());
        response.status(500).json("err");
    }
    
}
/**
 * Login the user and return if successful
 * TODO return a JWT to store
 * @param request 
 * @param response 
 */
export const login = async function (request: functions.https.Request, response: functions.Response){
    try{
        const user = await User.findOne({email: request.body.email})
        if(user){
            if(await argon2.verify(user.passwordHash, request.body.password)){
                if(user.employeeInfo.approved){
                    response.json("success")
                }else{
                    response.json("unapproved")
                }
            }else{
                response.json("invalidPassword")
            }
        }else{
            response.json("invalidEmail")
        }
    }catch(ex){
        console.error(ex.toString());
        response.status(500).json("err");
    }
}

export const getAllCourses = async function(request: functions.https.Request, response: functions.Response){

}

export const updateCourse = async function(request: functions.https.Request, response: functions.Response){
    
}

export const addCourse = async function(request: functions.https.Request, response: functions.Response){
    
}

export const deleteCourse = async function(request: functions.https.Request, response: functions.Response){
    
}
let obj = {passportNumber:"aaaa", country:"Andorra", firstName:"aaaa", lastName:"aaaa", password:"aa", userLevel:2.0, contactNumber:34234.0, dateOfBirth:1.6004736E12, middleName:"aaaa", email:"aaaa", passportExpiry:1.6004448E12}