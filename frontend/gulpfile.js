const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
//const autoprefixer = require('autoprefixer');
//const cssnano = require('cssnano');
//const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');



function css( done ) {
    src('./src/Assets/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe(sourcemaps.init())
        .pipe( plumber())
        .pipe( sass() ) // Compilarlo
        //.pipe( postcss([ autoprefixer(), cssnano() ]) )
        //.pipe(sourcemaps.write('.'))
        .pipe( dest('./src/Assets/build/css') ) // Almacenarla en el disco duro
    done();
}


function dev( done ) {
    watch('./src/Assets/scss/**/*.scss', css);
    //watch('src/js/**/*.js', javascript);
    done();
}


exports.css = css;
//exports.js = javascript;
//exports.imagenes = imagenes;
//exports.versionWebp = versionWebp;
//exports.versionAvif = versionAvif;
exports.dev = dev ;