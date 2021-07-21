let users = [
    {
        id:'3',
        username:'steve',
        name:'Steve',
        password:'1231241',
        email:'steve@gmail.com',
        url:"https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
        createdAt: new Date().toString()
    }
]

export async function findByUsername (username) {
    return users.find(user => user.username === username)
}

export async function createUser (userInfo) {
    const newUser = {id: Date.now().toString(), ...userInfo, createdAt: new Date().toString()}
    users.push(newUser)
    return newUser.id
} 