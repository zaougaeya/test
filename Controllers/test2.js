
async function getAllUserEmails() {
    try {
        const users = await User.find({}, 'email');
        return users.map(user => user.email);
    } catch (error) {
        console.error('Error fetching user emails:', error);
        return [];
    }
}