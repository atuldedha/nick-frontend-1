export default function isSysOp(role){
    if(!role)
      return false;

    const sysOpRoles=[
      "organizer",
      "secretary",
      "ASecretary",
    ];

    return sysOpRoles.some(sysOpRole=> sysOpRole.toLowerCase()== role.toLowerCase())
  }
