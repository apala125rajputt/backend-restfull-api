import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

let tasks = [];

app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send("Hello from task");
});

app.get('/v2/task', (req, res)=> {
    res.send(tasks);
    console.log(tasks);
});

app.get('/v1/tasks', (req, res)=> {
    res.send(tasks);
});

app.post('/v1/tasks', (req, res)=>{
    const note = req.body;
    tasks.push({...note, id: uuidv4() });
    res.send(`Created a Note of title ${note.title}`);
});

app.get('/v1/tasks/:id', (req, res)=>{
    const {id} = req.params;
    const note = tasks.find(note=>note.id === id);
    res.send(note);
});

app.delete('/v1/tasks/:id', (req, res)=>{
    const {id} = req.params;
    tasks = tasks.filter(note=>note.id!==id)
    res.send(`A note with id ${id} was successfully deleted`);
});

app.patch('/v1/tasks/:id', (req, res)=>{
    const {id} = req.params;
    const { title, content, isDraft } = req.body;
    const task = tasks.find(task=>task.id===id);
    if(title){
        task.title = title;
    }
    if(content){
        task.content = content;
    }
    if(isDraft){
        task.isDraft = isDraft;
    }
    res.send(`Updated ${id} with ease.`);
});

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
