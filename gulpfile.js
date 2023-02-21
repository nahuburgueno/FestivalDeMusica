
const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano"); //Comprime codigo de css
const postcss = require("gulp-postcss"); // Transformaciones, mejoras al codigo de css
const sourcemaps = require("gulp-sourcemaps"); // Sirve para cuando comprimamos el css, el navegador pueda decirnos donde editar el css pero en sass.

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


//JavaScript

const terser = require("gulp-terser-js");


//  src Sirve para identificar un archivo
//  dest Sirve para guardar un archivo

function css( done ){
    src("src/scss/**/*.scss") // Identificar el archivo de SASS .      **/* Es para que identifique todos los archivos de la carpeta scss
    .pipe(sourcemaps.init())
    .pipe(plumber())     
    .pipe(sass())    //Compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
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

function javascript(done){
    src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser()) //Terser sirve para optimizar el codigo de JS
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/js"));
    done();
}

function dev (done){
    watch("src/scss/**/*.scss", css); // **/* Es para que identifique todos los archivos de la carpeta scss
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); // Con parallel se ejecuta imageners, versionWebp, versionAvif y luego dev.



