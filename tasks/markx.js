/*
 * grunt-markx
 * https://github.com/jgallen23/grunt-markx
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var markx = require('markx');

  grunt.registerMultiTask('markx', 'Grunt plugin for converting markdown and code into html', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});
    var done = this.async();
    var total = this.files.length;
    var current = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join('\n');

      options.input = src;

      markx(options, function(err, html) {
        if (err) {
          grunt.log.error(err.message);
        }

        grunt.file.write(f.dest, html);
        grunt.log.writeln('File "' + f.dest + '" created.');
        current++;
        if (total === current) {
          done();
        }

      });
    });
  });

};
