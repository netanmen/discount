const fs = require('fs').promises;
const users = require('../data/users.json');

const usersPath = './data/users.json';

const usersService = {
    getById: id => users.find(user => user.customerID === id),
    getAll: () => users,
    remove: async (id) => {
        const updatedUsers = users.filter(user => user.customerID !== id);
        await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 4));
    },
    create: async (user) => {
        users.push(user);
        await fs.writeFile(usersPath, JSON.stringify(users, null, 4));
    },
    updateUserPermission: async (userId, permissionId, permissionStatus) => {
        const updatedUsers = users.map(user => ({
            ...user,
            ...(user.customerID === userId) && {
                accountPermissions: user.accountPermissions.map(permission => {
                    return {
                        ...permission,
                        ...(permission.id === permissionId) && { permissionStatus }
                    }
                })
            }
        }));

        await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 4));
    },
};

module.exports = usersService;