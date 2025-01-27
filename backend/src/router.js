import express from 'express';
import fs from 'fs';
import path from 'path';

const route = '';
const router = express.Router();

const routerRootPath = './src/routerRoot';

async function GetRouters() {
    console.log("GetRoute start");
    const dirs = fs.readdirSync(routerRootPath, { withFileTypes: true });

    for (const dir of dirs) {
        console.log("Read");

        if (!dir.isDirectory()) return;

        console.log(`Dir: ${path.join(process.cwd(), routerRootPath, dir.name)}`);

        const files = fs.readdirSync(path.join(process.cwd(), routerRootPath, dir.name));

        for (const file of files.filter((file) => file.endsWith('.js'))) {
            console.log(`file: ${path.join(process.cwd(), routerRootPath, dir.name, file)}`);
            const hardcoding = './routerRoot/balance/GETbalance.js';
            console.log(hardcoding);
            const { route: moduleRoute, router: moduleRouter } = await import(hardcoding);

            router.use(moduleRoute, moduleRouter);
        }
    }

    /*
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
    console.log("Get Router Success");
}

GetRouters();

export { route, router };
