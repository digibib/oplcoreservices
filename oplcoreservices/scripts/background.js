const Bookmark = require('bookmark');

const labelBookmarkletCode = "javascript:(function()%7Bfunction%20getGitref()%20%7Bvar%20nw%20%3D%20window.open(%22%22)%3Bnw.document.write(%22GITREF%3A%20__REVISION__%22)%3Breturn%200%3B%7Dfunction%20getBarcodeNumbers(text)%20%7Breturn%20text.match(%2F%5Cb%5B0-9%5D%7B14%7D%5Cb%2Fg)%3B%7Dfunction%20createLabels()%20%7Bvar%20barcodes%20%3D%20%5B%5D%3Bvar%20text%20%3D%20getSelection()%3Bif%20(text%20!%3D%3D%20%22%22)%20%7Bbarcodes%20%3D%20getBarcodeNumbers(text)%3B%7D%20else%20%7Bbarcodes%20%3D%20getBarcodeNumbers(document.body.innerText)%3B%7Dif%20(barcodes%20!%3D%3D%20null)%20%7Bvar%20printWindow%20%3D%20window.open(%22%22)%3Bvar%20doc%20%3D%20printWindow.document%3Bfunction%20callback()%20%7B(function%20(%24)%20%7Bvar%20jQuery%20%3D%20%24%3Bfunction%20callback()%20%7BappendStylesheet(doc)%3Bif%20(typeof%20barcodes%20%3D%3D%3D%20'string')%20%7Bbarcodes%20%3D%20%5Bbarcodes%5D%3B%7Dbarcodes.forEach(function%20(barcode)%20%7Bvar%20url%20%3D%20%22%2Fapi%2Fv1%2Flabelgenerator%2F%22%20%2B%20barcode%3Bvar%20currentLabelId%20%3D%20%22label_%22%20%2B%20barcode%3Bvar%20currentLabel%20%3D%20jQuery(%22%3Cdiv%2F%3E%22%2C%20%7B%22id%22%3A%20currentLabelId%2C%20%22class%22%3A%20%22label%22%7D)%3BjQuery.getJSON(url%2C%20function%20(data)%20%7BjQuery.each(data%2C%20function%20(key%2C%20value)%20%7Bswitch%20(key)%20%7Bcase%20%22barcode%22%3Avar%20barcodeSvg%20%3D%20doc.createElementNS(%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2C%20%22svg%22)%3BbarcodeSvg.id%20%3D%20%22barcode_%22%20%2B%20barcode%3BbarcodeSvg.setAttribute(%22jsbarcode-format%22%2C%20%22ITF%22)%3BbarcodeSvg.setAttribute(%22jsbarcode-value%22%2C%20barcode)%3BbarcodeSvg.setAttribute(%22jsbarcode-width%22%2C%202)%3BbarcodeSvg.setAttribute(%22jsbarcode-height%22%2C%2030)%3BbarcodeSvg.setAttribute(%22jsbarcode-fontsize%22%2C%2014)%3BbarcodeSvg.setAttribute(%22margin%22%2C%200)%3BbarcodeSvg.setAttribute(%22class%22%2C%20%22barcode%22)%3Bdoc.getElementById(currentLabelId).appendChild(barcodeSvg)%3Bvar%20bcs%20%3D%20doc.createElement(%22script%22)%3Bbcs.setAttribute('type'%2C%20'text%2Fjavascript')%3Bbcs.innerHTML%20%3D%20%22%24(document).ready(function()%7BJsBarcode(%5C%22%23barcode_%22%20%2B%20barcode%20%2B%20%22%5C%22).init()%3B%7D)%22%3Bdoc.body.appendChild(bcs)%3Bbreak%3Bcase%20%22biblio%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20key%2C%22text%22%3A%20value%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22callNumber%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20%22key_%22%20%2B%20barcode%2C%22class%22%3A%20%22call-number%22%2C%22text%22%3A%20ellipsis(value%2C%2025)%7D).appendTo(currentLabel)%3BjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20%22spine%22%2C%22html%22%3A%20fixSpineNumber(value)%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22codedLocationQualifier%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20%22main-library-department%22%2C%22text%22%3A%20value%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22copyNumber%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20%22copy-number%22%2C%22text%22%3A%20padding(value%2C%203)%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22creator%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20key%2C%22text%22%3A%20ellipsis(value%2C%2025)%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22holdingBranch%22%3Abreak%3Bcase%20%22homeBranch%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20%22home-branch%22%2C%22text%22%3A%20value%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22publicationDate%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20%22publication-date%22%2C%22text%22%3A%20value%7D).appendTo(currentLabel)%3Bbreak%3Bcase%20%22shelvingLocation%22%3Abreak%3Bcase%20%22title%22%3AjQuery(%22%3Cspan%2F%3E%22%2C%20%7B%22id%22%3A%20key%20%2B%20%22_%22%20%2B%20barcode%2C%22class%22%3A%20key%2C%22text%22%3A%20ellipsis(value%2C%2025)%7D).appendTo(currentLabel)%3Bbreak%3B%7D%7D)%3B%7D)%3BcurrentLabel.appendTo(printWindow.document.body)%3B%7D)%3B%7Dvar%20s%20%3D%20doc.createElement(%22script%22)%3Bs.src%20%3D%20%22https%3A%2F%2Fcdn.jsdelivr.net%2Fjsbarcode%2F3.3.7%2Fbarcodes%2FJsBarcode.itf.min.js%22%3Bif%20(s.addEventListener)%20%7Bs.addEventListener(%22load%22%2C%20callback%2C%20false)%7D%20else%20if%20(s.readyState)%20%7Bs.onreadystatechange%20%3D%20callback%7Ddoc.body.appendChild(s)%3B%7D)(jQuery.noConflict())%3B%7Dvar%20s%20%3D%20doc.createElement(%22script%22)%3Bs.src%20%3D%20%22https%3A%2F%2Fajax.googleapis.com%2Fajax%2Flibs%2Fjquery%2F3.1.0%2Fjquery.min.js%22%3Bif%20(s.addEventListener)%20%7Bs.addEventListener(%22load%22%2C%20callback%2C%20false)%7D%20else%20if%20(s.readyState)%20%7Bs.onreadystatechange%20%3D%20callback%7Ddoc.body.appendChild(s)%3B%7D%7Dfunction%20getStylesheet()%20%7Breturn%20%22%20%20%20%20%20%20%20%20%2F*%20http%3A%2F%2Fmeyerweb.com%2Feric%2Ftools%2Fcss%2Freset%2F%20%22%2B%20%22%20%20%20%20%20%20%20%20%20%20%20v2.0%20%7C%2020110126%22%2B%20%22%20%20%20%20%20%20%20%20%20%20%20License%3A%20none%20(public%20domain)%22%2B%20%22%20%20%20%20%20%20%20%20*%2F%22%2B%20%22%20%20%20%20%20%20%20%20%22%2B%20%22%20%20%20%20%20%20%20%20html%2C%20body%2C%20div%2C%20span%2C%20applet%2C%20object%2C%20iframe%2C%22%2B%20%22%20%20%20%20%20%20%20%20h1%2C%20h2%2C%20h3%2C%20h4%2C%20h5%2C%20h6%2C%20p%2C%20blockquote%2C%20pre%2C%22%2B%20%22%20%20%20%20%20%20%20%20a%2C%20abbr%2C%20acronym%2C%20address%2C%20big%2C%20cite%2C%20code%2C%22%2B%20%22%20%20%20%20%20%20%20%20del%2C%20dfn%2C%20em%2C%20img%2C%20ins%2C%20kbd%2C%20q%2C%20s%2C%20samp%2C%22%2B%20%22%20%20%20%20%20%20%20%20small%2C%20strike%2C%20strong%2C%20sub%2C%20sup%2C%20tt%2C%20var%2C%22%2B%20%22%20%20%20%20%20%20%20%20b%2C%20u%2C%20i%2C%20center%2C%22%2B%20%22%20%20%20%20%20%20%20%20dl%2C%20dt%2C%20dd%2C%20ol%2C%20ul%2C%20li%2C%22%2B%20%22%20%20%20%20%20%20%20%20fieldset%2C%20form%2C%20label%2C%20legend%2C%22%2B%20%22%20%20%20%20%20%20%20%20table%2C%20caption%2C%20tbody%2C%20tfoot%2C%20thead%2C%20tr%2C%20th%2C%20td%2C%22%2B%20%22%20%20%20%20%20%20%20%20article%2C%20aside%2C%20canvas%2C%20details%2C%20embed%2C%20%22%2B%20%22%20%20%20%20%20%20%20%20figure%2C%20figcaption%2C%20footer%2C%20header%2C%20hgroup%2C%20%22%2B%20%22%20%20%20%20%20%20%20%20menu%2C%20nav%2C%20output%2C%20ruby%2C%20section%2C%20summary%2C%22%2B%20%22%20%20%20%20%20%20%20%20time%2C%20mark%2C%20audio%2C%20video%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20margin%3A%200%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20padding%3A%200%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20border%3A%200%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20font-size%3A%20100%25%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20font%3A%20inherit%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20vertical-align%3A%20baseline%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20%2F*%20HTML5%20display-role%20reset%20for%20older%20browsers%20*%2F%22%2B%20%22%20%20%20%20%20%20%20%20article%2C%20aside%2C%20details%2C%20figcaption%2C%20figure%2C%20%22%2B%20%22%20%20%20%20%20%20%20%20footer%2C%20header%2C%20hgroup%2C%20menu%2C%20nav%2C%20section%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20display%3A%20block%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20body%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20line-height%3A%201%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20ol%2C%20ul%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20list-style%3A%20none%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20blockquote%2C%20q%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20quotes%3A%20none%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20blockquote%3Abefore%2C%20blockquote%3Aafter%2C%22%2B%20%22%20%20%20%20%20%20%20%20q%3Abefore%2C%20q%3Aafter%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20content%3A%20''%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20content%3A%20none%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20table%20%7B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20border-collapse%3A%20collapse%3B%22%2B%20%22%20%20%20%20%20%20%20%20%20%20border-spacing%3A%200%3B%22%2B%20%22%20%20%20%20%20%20%20%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20%40page%20%7Bmargin%3A%200px%3B%20size%3A%2038mm%2090mm%3B%7D%22%2B%20%22%20%20%20%20%20%20%20%20.label%20%7B%20border%3A%201px%20solid%20%23FFF%3B%20width%3A%2038mm%3B%20height%3A%2090mm%3B%20position%3A%20relative%3B%20left%3A%200px%3B%20page-break-after%3A%20always%3B%20font-size%3A%2016px%3B%20font-family%3A%20sans-serif%3B%7D%22%2B%20%22%20%20%20%20%20%20%20%20.barcode%20%7B%20position%3A%20absolute%3B%20top%3A%20-30px%3B%20width%3A%20240px%3B%20left%3A%2030px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%20left%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%20left%3B%7D%22%2B%20%22%20%20%20%20%20%20%20%20.creator%20%7B%20position%3A%20absolute%3B%20top%3A%2010px%3B%20left%3A%20140px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%20280px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.title%20%7B%20position%3A%20absolute%3B%20top%3A%2010px%3B%20left%3A%20120px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%20280px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.call-number%20%7B%20position%3A%20absolute%3B%20top%3A%2010px%3B%20left%3A%20100px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%20280px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.publication-date%20%7B%20position%3A%20absolute%3B%20top%3A%2010px%3B%20left%3A%2080px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%2040px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.home-branch%20%7B%20position%3A%20absolute%3B%20top%3A%2057px%3B%20left%3A%2080px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%2040px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.main-library-department%20%7B%20position%3A%20absolute%3B%20top%3A%2090px%3B%20left%3A%2080px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%2040px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.biblio%20%7B%20position%3A%20absolute%3B%20top%3A%20135px%3B%20left%3A%2080px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%2070px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.copy-number%20%7B%20position%3A%20absolute%3B%20top%3A%20210px%3B%20left%3A%2080px%3B%20transform%3A%20rotate(90deg)%3B%20transform-origin%3A%200%200px%3B%20width%3A%2040px%3B%20-webkit-transform%3A%20rotate(90deg)%3B%20-webkit-transform-origin%3A%200%200px%3B%20%7D%22%2B%20%22%20%20%20%20%20%20%20%20.spine%20%7B%20position%3A%20absolute%3B%20top%3A280px%3B%20left%3A%2010px%3B%20font-size%3A%2016px%3B%20width%3A%2034mm%3B%20overflow-wrap%3A%20normal%3B%20%7D%22%3B%7Dfunction%20padding(number)%20%7Bvar%20ret%20%3D%20number%3Bif%20((number%20%2B%20%22%22).length%20%3C%203)%20%7Bret%20%3D%20(%22000%22%20%2B%20number).slice(-3)%7Dreturn%20ret%3B%7Dfunction%20ellipsis(string%2C%20maxlength)%20%7Bvar%20ret%20%3D%20%22%22%3Bif%20(string%20!%3D%3D%20null)%20%7Bret%20%3D%20string%3Bif%20(string.length%20%3E%20maxlength)%20%7Bret%20%3D%20string.slice(0%2C%20maxlength)%20%2B%20%22%E2%80%A6%22%3B%7D%7D%20else%20%7Bret%20%3D%20%22%22%3B%7Dreturn%20ret%3B%7Dfunction%20fixSpineNumber(string)%20%7Bvar%20ret%20%3D%20%22%22%3Bif%20(string%20!%3D%3D%20null)%20%7Bvar%20data%20%3D%20string.trim()%3Bvar%20splitString%20%3D%20data.split(%22%20%22)%3Bret%20%3D%20data%3Bswitch%20(splitString)%20%7Bcase%20splitString.length%20%3C%203%3Aret%20%3D%20data.replace(%2F%5Cs%2Fg%2C%20%22%3Cbr%3E%22)%3Bbreak%3Bdefault%3Abreak%3B%7D%7Dreturn%20ret%3B%7Dfunction%20appendStylesheet(doc)%20%7Bvar%20css%20%3D%20getStylesheet()%2Chead%20%3D%20doc.head%20%7C%7C%20doc.getElementsByTagName('head')%5B0%5D%2Cstyle%20%3D%20doc.createElement('style')%3Bstyle.type%20%3D%20'text%2Fcss'%3Bif%20(style.styleSheet)%20%7Bstyle.styleSheet.cssText%20%3D%20css%3B%7D%20else%20%7Bstyle.appendChild(doc.createTextNode(css))%3B%7Dhead.appendChild(style)%3B%7Dfunction%20getSelection()%20%7Bvar%20selection%20%3D%20%22%22%3Breturn%20window.getSelection().toString()%3B%7Dif%20(window.location.href.toLowerCase().indexOf(%22gitref%22)%20%3E%20-1)%20%7BgetGitref()%3B%7D%20else%20%7BcreateLabels()%3B%7D%7D)()";


const bookmark = new Bookmark(browser);

const createBookmark = appHost.bookmarks.create(
  {
    "parentId": bookmark.toolbar,
    "index": 0,
    "title": "Skriv ut etiketter",
    "url": labelBookmarkletCode
  }
);

function onCreated (node) {
  const root = bookmark.appHost().bookmarks.getTree((bookmarks) => {console.log(bookmarks)});
  console.log("Added labelling bookmarklet")
}

createBookmark.then(onCreated);

