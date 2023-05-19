import verifyUserInfo from "./verifyUserInfo"
export default async function verifyMembersInfo(members){
    for(let i=0; i < members.length; ++i){
        
        let result= await verifyUserInfo(members[i])

        let role="Group President"
        if(members[i].role=="groupVicePresident")
            role="Group Vice President"
        
        if(members[i].role=="volunteer")
            role="Volunteer"
        
        if(members[i].role=="")
            role="Member"
            
        // already exists and is member of a group
        if(result.status==409 && result.user.group){ 
            
            
            return {
                ...result,
                error: role +" is already part of another group."
            }
        }

        // already exists as volunteer
        if(result.status==409 && !result.user.group){      
            return {
                ...result,
                error: role +" is already registered as volunteer."
            }
        }
        if(result.status!=200)
            return result;
    }

    return {
        status: 200
    }
}