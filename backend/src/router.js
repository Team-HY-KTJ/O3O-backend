/*

router.js에 인식되도록 파일 작성하는 법
routerRoot 폴더 내에 폴더 하나를 더 만들고 (ex. routerRoot\balance)
거기서 .js파일 작성하는데, export에 route, router가 있도록
ex. GETbalance.js
export {route, router};

route : 경로, router : Callback 함수

ex)
app.get(route, router)
router.get(route, router)

*/

import express from 'express';
import fs from 'fs';
import path from 'path';

const route = '';
const router = express.Router();

const routerRootPath = './src/routerRoot';

async function GetRouters() {
    const dirs = fs.readdirSync(routerRootPath, { withFileTypes: true });

    for (const dir of dirs) {
        if (!dir.isDirectory()) return;

        const files = fs.readdirSync(path.join(process.cwd(), routerRootPath, dir.name));

        for (const file of files.filter((file) => file.endsWith('.js'))) {
            try{
                const { route: moduleRoute, router: moduleRouter } = await import('../' + path.join(routerRootPath, dir.name, file));
                router.use(moduleRoute, moduleRouter);
            }
            catch{
                console.log(`router load failed : ${path.join(process.cwd(), routerRootPath, dir.name, file)}`);
            }
        }
    }
}

await GetRouters();

export { route, router };

/* fs.readdir로 비동기 작업 시도 (나중에 비동기로 작업할 때를 위해 남겨둠.)
    dirs.forEach((dir) => {
        console.log("Read");

        if (!dir.isDirectory()) return;

        console.log(`Dir: ${path.join(routerRootPath, dir.name)}`);
        
        // fs.readdir(path.join(routerRootPath, dir.name), (err, files) => {
        //     files.filter((file) => file.endsWith('.js'))
        //     .forEach((file) => {
        //         const { route: moduleRoute, router: moduleRouter } = import(
        //             path.join(routerRootPath, file)
        //         );

        //         router.use(moduleRoute, moduleRouter);
        //     });

        //     console.log("Get Router Success");
        // })

        // fs.readdirSync(path.join(routerRootPath, dir.name))
        //     .filter((file) => file.endsWith('.js'))
        //     .forEach(file => {
        //         const { route: moduleRoute, router: moduleRouter } = import(
        //             path.join(routerRootPath, file)
        //         );

        //         router.use(moduleRoute, moduleRouter);
        //     })
        
    });
    */
