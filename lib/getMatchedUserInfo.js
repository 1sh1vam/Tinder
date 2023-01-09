export const getMatchedUserInfo = (users, loggedInUser) => {
    const newUsers = { ...users };

    delete newUsers[loggedInUser];

    const [id, matchedUser] = Object.entries(newUsers).flat();
    return { id, ...matchedUser  };
}