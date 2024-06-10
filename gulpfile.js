//css and sass
const { src, dest, watch, series }= require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//images
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(){
    //Steps : 1 - identify the file, 2 - compile it, 3 - save the .css file 
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())//include {outputStyle:'compressed'} to compress the css file in build
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))  
}

function images(){
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))
}

function versionWebp(){
    const options ={
        quality:50
    }
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(webp( options ))
        .pipe(dest('build/img'))
}

function versionAvif(){
    const options ={
        quality:50
    }
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(avif( options ))
        .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
    
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.default = series(css,images,versionWebp, versionAvif, dev) //Always put the watch function at the end