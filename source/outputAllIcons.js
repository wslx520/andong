const fs = require('fs');
const path = require('path');



var icons = '';
fs.readFile('./sass/_font.scss', 'utf8', function (err, data) {
    if (err) throw err;
    let cssfile = data.match(/i-[\w-]+/g);
    console.log(cssfile);
    cssfile = cssfile.map(function (cls, i) {
        let line = !(i % 2) ? '' : '<li class="line"></li>';
        return `<li><i class="if ${cls}"></i><span>.${cls}</span></li>\n${line}\n`;
    }).join('');
    fs.writeFile('./all-icon-fonts.html', `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>All icons</title>
    <link rel="stylesheet" href="../css/index.css" />
    <style>
        .iconslist li{
            display:inline-block;
            margin: 5px 12px;
            text-align:center;
        }
        .iconslist li span {
            display: block;
        }
        .if {
            font-size: 32px;
        }
        .line {
            display:inline-block;
            width: 1px;
            height: 32px;
            background:#333;
            font-size:0;
        }
    </style>
</head>
<body>
    <ul class="iconslist">
    ${cssfile}
    </ul>
</body>
</html>
    `, function (err) {
        if (err) throw err;
    })
});



