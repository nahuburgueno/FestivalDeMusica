
const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


//  src Sirve para identificar un archivo
//  dest Sirve para guardar un archivo

function css( done ){
    src("src/scss/**/*.scss") // Identificar el archivo de SASS .      **/* Es para que identifique todos los archivos de la carpeta scss
    .pipe(plumber())     
    .pipe(sass())    //Compilarlo
    .pipe(dest("build/css"))  // Almacenarla en el disco duro
       
    done(); // Callback que avusa a GULP cuando llegamos al final en la ejecucion de esta funcion
}

//Esta funcion sirve para mejorar las imagenes y las optimiza.

function imagenes( done ) {
   const opciones = {
        optimizationLevel: 3  //Optimizamos las imagenes a un nivel de 3 utilizando imagemin.
   }

    src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones))) // Imagemin
   .pipe(dest("build/img")) // Las almacenamos en la carpeta de build.
    done();
}

// Para pasar de imagenes JPG o PNG a Webp
function versionWebp (done) {
    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}") // Al colocar {} sirve para especificarle el formato PNG y JPG
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
    done();
}

function versionAvif (done) {
    const opciones = {
        quality: 50
    };
    
    src("src/img/**/*.{png,jpg}") // Al colocar {} sirve para especificarle el formato PNG y JPG
        .pipe(avif(opciones))
        .pipe(dest("build/img"))

    done();
}

function dev (done){
    watch("src/scss/**/*.scss", css); // **/* Es para que identifique todos los archivos de la carpeta scss
    
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev); // Con parallel se ejecuta imageners, versionWebp, versionAvif y luego dev.



