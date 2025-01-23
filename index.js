import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

let macskak = [
    { id:1, nev:'Cirmos', kor:2, szin:'szürke' },
    { id:2, nev:'Morcos', kor:1, szin:'fekete' }
]
let nextId = 2;

function addMacska(req, resp){
    if(req.body.nev && req.body.kor && req.body.szin){
        const macska = { id:nextId, nev:req.body.nev, kor:req.body.kor, szin:req.body.szin }
        macskak.push( macska );
        nextId++;
        resp.send(macska)
    } else resp.send( { error: 'Hibás paraméterek!' } )
}
function delMacska(req, resp){
    // console.log(req.params)
    if(req.params.id){
        let i = indexOf(req.params.id)
        if(i!=-1){
            const macska = macskak.splice(i, 1);
            resp.send(macska[0]);
        } else resp.send( { error: 'Hiányzó paraméter!' } )
    }
}
function indexOf(id){
    let i = 0; while(i<macskak.length && macskak[i].id != id) i++;
    if(i<macskak.length) return i; else return -1
    
}
app.get('/', (req, resp) => resp.send('<h1>Macskák</h1>'));
app.get('/macskak', (req, resp) => resp.send(macskak))
app.post('/macska', addMacska)
app.delete('/macska/:id', delMacska)

app.listen(88, (error) => {
    if(error) console.log(error)
    else console.log('Server on :88')
})