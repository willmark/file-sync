file-sync
============

> Stability - 2 Unstable

Synchronize two files based on hash values

## API

````
sync(file1, file2, [algorithm], function(result))

Copies file1 to file2 if hash differs and callback function gets a boolean result 'true' on successful copy
Optional [algorithm] is a string indicator of the type of hash to use (ie. 'sha1', 'md5', etc.)
````
