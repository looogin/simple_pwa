import path from 'path'
import fs from "fs";
const __dirname = path.resolve();

export default function getAllFilesName(arg) {
	return new Promise((resolve, reject) => {
		let mainPath = path.resolve(__dirname, "../static");
        let arraySize = 0;
        let filesArray =[];
        for (const  iter  of  getDirectories(mainPath)) {
            let test = file(mainPath, iter.name, arg)
            if(test) filesArray.push(test);            
        }		
        
		filesArray.forEach(val=>arraySize+=val.fileNames.length);
		resolve({spec:arg,arr:filesArray,arrLen:arraySize});
	});
}

const getDirectories = source =>{
    try {
        fs.readdirSync(source, {withFileTypes: true})
		.filter(dirent => dirent.isDirectory());
    } catch (error) {
        console.error("Path not found")
        return  []  
    }
}

const file = (mainPath,dirName,spec)=>{   
    try{
        const arr = fs.readdirSync(path.resolve(mainPath, dirName, spec)); 
        return{
            date:dirName,
            fileNames:arr,
            filePath: path.resolve(mainPath, dirName, spec)
            } 
    }catch(e){
        return false;
    }
}