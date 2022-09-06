export function existingUser(profile) {
    return { status: "exists", data: true, user: profile }
}

export function newUserCreated(profile) {
    return {
        status: "newuser",
        user: profile,
        dataCreated: true,
    }
}

export function newUserErr(err) {
    return {
        status: "newuser",
        error: err,
        dataCreated: false,
    }
}
