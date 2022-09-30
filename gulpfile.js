const {src, dest, watch, series} = require('gulp')

//CSS SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

//IMAGENES
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

const css = (done) => {
    //identifica, compila, guarda
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    
    done()
}

const imagenes = done => {
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))

    done()
}

const imgWebp = done => {
    src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
    done()
}

const imgAvif = done => {
    src('src/img/**/*.{jpg,png}')
        .pipe(avif())
        .pipe(dest("build/img"))
    done()
}

const dev = () => {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}
 
exports.css = css
exports.dev = dev
exports.imagenes = imagenes
exports.imgWebp = imgWebp
exports.imgAvif = imgAvif
exports.default = series(css, dev)