/**
* @file 生成icon样式
* @author XLee
*/

'use strict';

const gm = require('gm');
const fs = require('fs');
const path = require('path');

const curpath = process.cwd();
fs.readdir(curpath, function (err, files) {
    if (err) {
        return;
    }
    files.sort();
    // console.log(files);
    let result = `
i[class*="fl-"],i[class*="bfl-"] {
    display: inline-block;
    background-size:contain;
    background-repeat:no-repeat;
}`;
    function loop() {
        let file = files.shift();
        if (file) {
        	if (path.extname(file) === '.png') {
	            gm(file).size(function (err, size) {
	                if (err) {
	                	console.error(err);
	                    return loop();
	                }

	                let width = size.width;
	                let height = size.height;
	                result += `
.${file.slice(0, -4)} {
    background-image:url(../images/fl/${file});
    width:${width}px;
    height:${height}px;
}
`;
                	loop();
            	});
        	}
        	else {
        		loop();
        	}
        }
        else {
            fs.writeFile('./_fl.scss', result);
        }
    }
    loop();

});
