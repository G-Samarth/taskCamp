const users = [];

const addUser = ({ id, name, projectId }) => {
    name = name.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.name === name && user.projectId === projectId
    );

    if (!existingUser) {
        const user = { id, name, projectId };
        users.push(user);
        return { user };
    }
};

const removeUser = (id) => {
    users.filter((user) => user.id === id);
    return;
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, removeUser, getUser };
