
import { Flowchart } from "../Types"

const Services = {

    getFlow : async (user:any) => {
        if (!user) {
            console.log('no user')
            return
        }
        return await fetch(`http://localhost:3001/flowchart/${user.email}`, {
            credentials: 'include',
            mode:'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
    },

    saveFlow : async (flow: Flowchart, user:any) => {
        return await fetch('http://localhost:3001/save', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...flow, user: user.email}),
            credentials: 'include',
            mode:'cors'
        }).then(response => response.json())
        .then(data => data)
    },
    
    postFlow : async (flow:Flowchart, user: any) => {
        return await fetch('http://localhost:3001/postflow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...flow, user: user.email}),
            credentials: 'include',
            mode:'cors'
        }).then(response => response.json())
        .then(data => data)
    }
}

export default Services
