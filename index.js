exports.sync = function() {
    if (typeof arguments[0] === "undefined") throw new Error("File1 required");
    if (typeof arguments[1] === "undefined") throw new Error("File2 required");
    if (typeof arguments[2] === "undefined") throw new Error("Callback required");
    var file1 = arguments[0];
    var file2 = arguments[1];
    var algo = "sha1";
    var callback = arguments[2];
    if (typeof arguments[0] != "string") throw new Error("File1 must be a string");
    if (typeof arguments[1] != "string") throw new Error("File2 must be a string");
    if (arguments.length == 4) {
        if (typeof arguments[2] != "string") throw new Error("Algorithm must be a string");
        if (typeof arguments[3] != "function") throw new Error("Callback required");
        algo = arguments[2];
        callback = arguments[3];
    } else if (arguments.length == 3) {
        if (typeof arguments[2] != "function") throw new Error("Callback required");
    } else {
        throw new Error("Invalid args length: " + arguments.length);
    }

    ch = require("file-compare");
    ch.compare(file1, file2, algo, function(filesSame, err) {
        if (!filesSame && !err) {
            copyFiles(file1, file2, function(filesCopied, err) {
                callback(filesCopied, err);
            });
        } else {
            callback(false, err);
        }
    });

    /**
     * Copy file1 to file2
     */
    function copyFiles(srcfile, dstfile, callback) {
        var fs = require("fs");
        var rs = fs.createReadStream(srcfile);
        var ws = fs.createWriteStream(dstfile);
        rs.on("data", function(d) {
            ws.write(d);
        });
        rs.on("end", function() {
            ws.end();
            callback(true);
        });
    }
};

