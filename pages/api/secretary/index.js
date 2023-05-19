import { adminData } from '../../../lib/adminData';
import Application from '../../../models/application';

export default function handler(req, res) {
  const secretary = adminData.find((admin) => admin.role.toLowerCase() === 'secretary');
  if (secretary) {
    const { firstName ,lastName, phoneNumber, email } = secretary;
    res.status(200).json({ 
        firstName, 
        lastName: lastName?lastName: "", 
        phoneNumber, 
        email 
    });
  } else {
    res.status(404).json({ message: 'Secretary not found' });
  }
}
