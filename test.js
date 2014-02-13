
exports.noArgsFails = function(a) {
    var copier = require("./index");
    a.expect(1);
    a.throws(function() {
        copier.sync();
    }, "OK");
    a.done();
};

exports.noCallbackFails = function(a) {
    var copier = require("./index");
    a.expect(1);
    a.throws(function() {
        copier.sync("./file1", "./file1");
    });
    a.done();
};

exports.badDigestFails = function(a) {
    var copier = require("./index");
    a.expect(1);
    a.throws(function() {
        copier.sync("./file1", "./file1", "aaa", function() {});
    }, /Digest method not supported/);
    a.done();
};

exports.badCallbackFails = function(a) {
    var copier = require("./index");
    a.expect(1);
    a.throws(function() {
        copier.sync("./file1", "./file1", "sha1", "badcallback");
    }, /Callback required/);
    a.done();
};

exports.invalidArgsFails = function(a) {
    var copier = require("./index");
    a.expect(1);
    a.throws(function() {
        copier.sync("./file1", "./file1", "hhh", "bbb", "ccc");
    }, /Callback required/);
    a.done();
};

exports.filesSameNoCopy = function(a) {
    var copier = require("./index");
    a.expect(1);
    copier.sync("./file1", "./file1", function(result, err) {
        a.ok(!result);
        a.done();
    });
};

exports.srcFileNotExist = function(a) {
    var copier = require("./index");
    a.expect(1);
    copier.sync("./fileNoFile1", "./file1", function(result, err) {
        a.ok(!result);
        a.done();
    });
};

exports.filesDifferCopy = function(a) {
    var copier = require("./index");
    a.expect(1);
    copier.sync("./file1", "./file2", function(result, err) {
        a.ok(result);
        a.done();
    });
};
