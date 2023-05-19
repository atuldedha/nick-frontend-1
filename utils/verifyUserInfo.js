import { User } from '../models/user';
import { Group } from '../models/group';
export default async function verifyUserInfo(user){
    const {
        firstName, 
        lastName,
        phoneNumber, 
        email,
        password, 
        role
    } = user; 

    if(!firstName)
        return {
            status: 400,
            error: "First name field is required"
        }

    if(!phoneNumber)
        return {
            status: 400,
            error: "Phone number field is required"
        }

    if(!email)
        return {
            status: 400,
            error: "Email field is required"
        }
    
    if(!role)
        return {
            status: 400,
            error: "Role field is required"
        }


    // checking user is already exists
    let existingUser = await User.findOne({ email }).populate('group').lean();

    if (existingUser){
        //existingUser= JSON.parse(JSON.stringify(existingUser));
        delete existingUser['password'];
        return {
            status: 409, 
            error: "User already exists",
            user: existingUser
        };
    }
    

    return {
        status: 200,
    }

}