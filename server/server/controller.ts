import fs from 'fs';
import path from 'path';
import http, { IncomingMessage, Server, ServerResponse } from 'http';


interface Organizations{
    organization: string;
    createdAt: string;
    updatedAt: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id: number;
    noOfEmployees:number;
    employees:string[];
  }


//GET ALL DATA

export const getAllData = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(path.join(__dirname, "./database/database.json"), "utf-8", (err, data) => {
        if(err){
            res.writeHead(500, {"content-Type": "application/json"});
            res.end(JSON.stringify({success: false, error:err}));
        } else {
            res.writeHead(200, {"content-Type": "application/json"});
            res.end(JSON.stringify({success: true, massage: JSON.parse(data)}))
        }
    })
}

//ADD DATA

export const addData = (req: IncomingMessage, res: ServerResponse) => {
    let information = "";

    req.on("data", (chunk) => {
        information += chunk.toString()
    })
    req.on("end", () => {
        let work = JSON.parse(information)
        const databaseFolderPath = path.join(__dirname, "database");
        const databaseFilePath = path.join(databaseFolderPath, "database.json");    

        if (!fs.existsSync(databaseFolderPath)) {
          fs.mkdirSync(databaseFolderPath);
        }
        if (!fs.existsSync(databaseFilePath)) {
            fs.writeFileSync(databaseFilePath, '');
        }
        //return fs.readFile(path.join(__dirname, "./database/database.json"), "utf-8", (err, data) => 
        return fs.readFile(path.join(__dirname, "./database/database.json"), "utf-8", (err, info) => {
            if(err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({success: false, error: err}))
            } else {
                let organization: Organizations[] = [];
                try{
                    organization = JSON.parse(info)
                }catch(parseError){
                    organization = []
                }
                if(organization.length===0){
                    work.id = 1
                }else{
                    const ids = organization.map(a => a.id)
                    let newId = Math.max(...ids)
                    work.id = newId + 1
                }
                work.createdAt = new Date()
                organization.push(work)

                fs.writeFile(path.join(__dirname, "./database/database.json"), JSON.stringify(organization, null, 2), (err) => {
                    if(err){
                        res.writeHead(500, {"content-Type": "application/json"});
                        res.end(JSON.stringify({success: false, error:err}));
                    } else {
                        res.writeHead(200, {"content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, massage: work}))
                    }
                })

            }
        })

    })
}

//UPDATE DATA

export const updateData = (req: IncomingMessage, res: ServerResponse) => {
    let updateD = "";

    req.on("data", (chunk) => {
        updateD += chunk.toString()
    })
    req.on("end", () => {
        let workUD = JSON.parse(updateD)

        return fs.readFile(path.join(__dirname, "./database/database.json"), "utf-8", (err, info) => {
            if(err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({success: false, error: err}))
            } else {
                let updateOrganization: Organizations [] = JSON.parse(info)
                let index = updateOrganization.findIndex(a => a.id === workUD.id);
                updateOrganization[index] = workUD;
                
                fs.writeFile(path.join(__dirname, "./database/database.json"), JSON.stringify(updateOrganization, null, 2), (err) => {
                    if(err){
                        res.writeHead(500, {"content-Type": "application/json"});
                        res.end(JSON.stringify({success: false, error: err}))
                    } else {
                        res.writeHead(200, {"content-Type": 'application/json'});
                        res.end(JSON.stringify({success: true, message: workUD}))
                    }
                })
            }
        })
    })
}


//DELETE DATA

export const deleteData = (req: IncomingMessage, res: ServerResponse) => {
    let deleteD = "";

    req.on("data", (chunk) => {
        deleteD += chunk.toString()
    })
    req.on("end", () => {
        let workDD = JSON.parse(deleteD)

        return fs.readFile(path.join(__dirname, "./database/database.json"), "utf-8", (err, info) => {
            if(err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({success: false, error: err}))
            } else {
                let deleteOrganization: Organizations [] = JSON.parse(info);
                let index = deleteOrganization.findIndex(a => a.id === workDD.id);
                let deleteDO = deleteOrganization.splice(index, 1);

                let length = deleteOrganization.length;
                let idArr = [];
                for(let i = 1; i<=length; i++){
                    idArr.push(i)
                }
                
                for(let i = 0; i<deleteOrganization.length; i++){
                    for(let j = 0; j<idArr.length; j++){
                        if(i === j){
                            deleteOrganization[i].id = idArr[j]
                        }
                    }
                }

                fs.writeFile(path.join(__dirname, "./database/database.json"), JSON.stringify(deleteOrganization, null, 2), (err) => {
                    if(err){
                        res.writeHead(500, {"content-Type": "application/json"});
                        res.end(JSON.stringify({success: false, error: err}))
                    } else {
                        res.writeHead(200, {"content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, message: deleteOrganization}))
                    }
                })
            }
        })
    })
}