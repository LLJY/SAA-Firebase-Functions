import * as mongoose from 'mongoose';
export enum ApplicationStatusType{
    Rejected=0,
    Pending,
    Approved,
}
export enum ApplicationType{
    Fellowship=0,
    Course,
    Scholarship,
    Diploma
}
export enum UserLevel{
    User=0,
    SchoolHead,
    CourseManager,
    Admin,
}
export let UserSchema = new mongoose.Schema({
    firstName: String,
    middleName: {type: String, required: false, default:null},
    lastName: String,
    // TODO call cloud function to update token when it changes
    notificationToken: String,
    employeeInfo: {type: {userLevel: Number, approved: Boolean}, required: false, default: null},
    email: String,
    passwordHash: String,
    passportNumber: String,
    passportExpiry: Number, // unix epoch, easier to convert.
    dateOfBirth: Number, // unix epoch
    companyInfo: {type:{organisation: String, jobTitle:String}, required: false, default: null},
    country: String,
    applications: {type:[{applicationType: Number}],required: false, default: null}
});
export interface IUser extends mongoose.Document{
    firstName: string,
    middleName?: string,
    lastName: string,
    // TODO call cloud function to update token when it changes
    notificationToken: string,
    employeeInfo: {userLevel: number, approved: boolean},
    email: string,
    passwordHash: string,
    passportNumber: string,
    passportExpiry: number, // unix epoch, easier to convert.
    dateOfBirth: number, // unix epoch
    companyInfo: {organisation: string, jobTitle:string},
    country: string,
    applications: [{applicationType: number}]
};