import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

let allMessages = [];
let messageCounterId = 0;

server.get('/messages', (req, res) => {
    res.status(200).send(allMessages);
});

server.get('/messages/:id', (req, res) => {
    const existingMessage = allMessages.find(message => message.id == req.params.id);
    res.status(200).send(existingMessage);
});

server.get('/messages/all/search', (req, res) => {
    const searchingMessage = allMessages.filter(message => message.text.includes(req.query.text));
    res.status(200).send(searchingMessage);
});

server.get('/messages/all/latest/', (req, res) => {
    const mostRecentMessages = allMessages.slice(allMessages.length - 10, allMessages.length);
    res.status(200).send(mostRecentMessages);
});

server.post('/messages', (req, res) => {
    const newMessage = {...req.body};
    if(newMessage.from && newMessage.text) {
        messageCounterId += 1;
        newMessage.id = messageCounterId;
        allMessages.push(newMessage);
        res.status(200).send(newMessage);
    } else {
        res.status(400).send("Enter your name and message please!");
    }
});

server.put('/messages/:id', (req, res) => {
    const newMessage = {...req.body.text};
    if(newMessage) {
        const editingMessage = allMessages.find(message => message.id == req.params.id);
        editingMessage.text = req.body.text;
    } else {
        res.status(400).send("Enter your message please!");
    }
});

server.delete('/messages/:id', (req, res) => {
    const deletingMessage = allMessages.find(message => message.id == req.params.id);
    const deletingMessageId = allMessages.indexOf(deletingMessage);
    allMessages.splice(deletingMessageId, 1);
});

server.listen(3001, function() {
    console.log(`Server is running on port ${this.address().port}`);
});