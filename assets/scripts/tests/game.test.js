/**
 * @jest-environment jsdom
 */


// Importamos el archivo

const {game} = require("../game");


// Cargamos nuestra pagina y su contenido.
beforeAll(()=> {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

describe("game object contains correct keys",()=>{
    test("score keys exists", () => {
        expect("score" in game).toBe(true);
    })
})