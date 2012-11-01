/*
 * grunt-markx
 * https://github.com/jgallen23/grunt-markx
 *
 * Copyright (c) 2012 Greg Allen
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  var markx = require('markx');
  var fs = require('fs');

  grunt.registerMultiTask('markx', 'Convert markdown and code snippets into html', function() {

    this.requiresConfig('markx');
    var self = this;
    var done = this.async();

    markx(this.data, function(err, html) {
      if (err) {
        grunt.log.error(err.message);
      }

      fs.writeFile(self.data.output, html, function(err) {
        if (err) {
          grunt.log.error(err.message);
        }
        grunt.log.writeln(self.data.output + ' created.');
        done();
      });


    });

  });


};
