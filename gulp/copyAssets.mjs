import gulp from 'gulp';

const copySvg = () => gulp.src('source/img/**/*.svg', {base: 'source'}).pipe(gulp.dest('build'));

const copyImages = () => gulp.src('source/img/**/*.{png,jpg,jpeg,webp,avif}', {base: 'source'}).pipe(gulp.dest('build'));

const copy = () =>
  gulp
      .src([
        'source/fonts/**',
        'source/img/**',
        'source/data/**',
        'source/favicon/**',
        'source/video/**',
        'source/downloads/**',
        'source/*.php',
        'source/email/**',
        'source/api/**',
        'source/php_mailer_club/**',
        'source/php_mailer_contacts/**',
        'source/php_mailer_booking/**'
      ], {
        base: 'source',
      })
      .pipe(gulp.dest('build'));

export {copy, copyImages, copySvg};
