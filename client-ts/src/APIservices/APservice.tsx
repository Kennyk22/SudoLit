
import { Flowchart } from "../Types"

const Services = {
    getFlowlist : async (user:any) => {
        if (!user) {
            console.log('no user')
            return
        }
        return await fetch(`http://localhost:3001/flowchartlist/${user.email}`, {
            credentials: 'include',
            mode:'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
    },

    getFlow : async (_id:any) => {
        if (!_id) {
            console.log('no user')
            return
        }
        return await fetch(`http://localhost:3001/flowchart/${_id}`, {
            credentials: 'include',
            mode:'cors'
        })
        .then(response => response.json())
        .then(data => data)
    },

    saveFlow : async (flow: Flowchart) => {
        return await fetch('http://localhost:3001/save', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...flow}),
            credentials: 'include',
            mode:'cors'
        }).then(response => response.json())
        .then(data => data)
    },
    
    postFlow : async (flow:Flowchart) => {
        return await fetch('http://localhost:3001/postflow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...flow}),
            credentials: 'include',
            mode:'cors'
        }).then(response => response.json())
        .then(data => data)
    },

    uploadImage : async (image:string| ArrayBuffer | null) => {
        return await fetch('http://localhost:3001/cloud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image }),
            credentials: 'include',
            mode:'cors'
        }).then(response => response.json())
        .then(data => data)
    }
}

export default Services
