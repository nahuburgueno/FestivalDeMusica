
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//  src Sirve para identificar un archivo
//  dest Sirve para guardar un archivo

function css( done ){
      
    src("src/scss/**/*.scss") // Identificar el archivo de SASS .      **/* Es para que identifique todos los archivos de la carpeta scss
    .pipe(plumber())     
    .pipe(sass())    //Compilarlo
    .pipe(dest("build/css"))  // Almacenarla en el disco duro
       
    done(); // Callback que avusa a GULP cuando llegamos al final en la ejecucion de esta funcion
}

function dev (done){
    watch("src/scss/**/*.scss", css); // **/* Es para que identifique todos los archivos de la carpeta scss
    
    done();
}

exports.css = css;
exports.dev = dev;