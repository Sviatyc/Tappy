import { v4 as uuidv4 } from 'uuid'

function generateUniqueId() {
    return uuidv4(); 
}

export default generateUniqueId