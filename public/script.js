
const socket = io()
let name
do {
    name = prompt("Enter your name:")
} while (!name)



const messageContainer = document.querySelector('.messagebox')
const sendbtn = document.querySelector('#sendbtn')
const messageinput = document.querySelector('#messageinput')

sendbtn.addEventListener('click', () => {
    const message = messageinput.value.trim()
    sendmessage(message)
})

function sendmessage(message) {
    if (message === '') return
    const data = {
        name: name,
        message: message
    }
    appendMessage(data, 'outgoing')

    socket.emit('message', data)
    messageinput.value = ''
}

socket.on('message', (data) => {
    appendMessage(data, 'incoming')
})  
function appendMessage(data, type) {
    const messageDiv = document.createElement('div')
    let classname = type
    messageDiv.classList.add('message', classname)
    let markup = `
        <h4>${data.name}</h4>
        <p>${data.message}</p>
    `
    messageDiv.innerHTML = markup
    messageContainer.appendChild(messageDiv)
    messageContainer.scrollTop = messageContainer.scrollHeight
}