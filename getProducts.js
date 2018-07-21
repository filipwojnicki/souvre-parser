"use-strict";

const fetch = require('node-fetch');
const formData = require('form-data');
const htmlparser = require("htmlparser2");
const cheerio = require('cheerio');
const fs = require('fs');

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36";

const souvreUrl = 'https://www.souvre.pl';
const phpSID = "kvjluuug7htdbr9788tvi052g3";

const langUrls = [
    'https://www.souvre.pl',
    'https://www.souvre.pl/de',
    'https://www.souvre.pl/en'
];

const collagenUrls = [
    'https://www.souvre.pl/shop/1/category-24/45',
    'https://www.souvre.pl/shop/1/category-7/45',
    'https://www.souvre.pl/shop/1/category-8/45',
];

let collagensProductsUrls = [];

const suplementsUrls = [
    'https://www.souvre.pl/shop/1/category-19/45',
];

let suplementsProductsUrls = [];

let productUrl = 'https://www.souvre.pl/shop/2/category-38/product-858';
let productsUrl = [
    'https://www.souvre.pl/shop/2/category-38/product-858',
    'https://www.souvre.pl/shop/1/category-24/product-689',
    'https://www.souvre.pl/shop/1/category-20/product-628'
];



// for (let url of suplementsUrls) {
//     fetch(url, {
//         'method': 'get',
//         'headers': getHeaders()
//     }).then(res => res.text()).then(body => {
//         let $ = cheerio.load(body);

//         let products = [];

//         $('p.product-name a').each(function (i, elem) {
//             let link = $(this).attr('href');
//             link = souvreUrl + link;

//             let product = {};

//             product.url = link;

//             fetch(link, {
//                 'method': 'get',
//                 'headers': getHeaders()
//             }).then(res => res.text()).then(body => {
//                 let $ = cheerio.load(body);
//                 let html = $('.inside-product').html();

//                 if (html) {
//                     $ = cheerio.load(html);

//                     product.icon = souvreUrl + $('img').attr('src');
//                     product.price = parseFloat($('.slide-description span.price-color').first().text().replace(/,/g, '.'));
//                     product.name = $('img').attr('alt');
//                     product.shortDescription = $('.slide-description p[style]').first().text();
//                     product.description = $('.slide-description-more').html().replace(/\s\s+/g, ' ');

//                     products.push(product);
//                     fs.writeFile('supplements_de.json', JSON.stringify(products), 'utf8', () => { })
//                     console.log(products);

//                 }
//             });
//         });
//     });
// }

// 'https://www.souvre.pl/shop/1/category-24/45',
// 'https://www.souvre.pl/shop/1/category-7/45',
// 'https://www.souvre.pl/shop/1/category-8/45',

//select language
fetch(langUrls[2], {
    'method': 'get',
    'headers': getHeaders()
}).then(res => createProductList('https://www.souvre.pl/shop/1/category-8/45', 'collagen_3_en'));


function createProductList(url, name){
    fetch(url, {
        'method': 'get',
        'headers': getHeaders()
    }).then(res => res.text()).then(body => {
        let $ = cheerio.load(body);
        let products = [];

        $('p.product-name a').each(function (i, elem) {
            let link = $(this).attr('href');
            link = souvreUrl + link;

            let product = {};

            product.url = link;

            fetch(link, {
                'method': 'get',
                'headers': getHeaders()
            }).then(res => res.text()).then(body => {
                let $ = cheerio.load(body);
                let html = $('.inside-product').html();

                if (html) {
                    $ = cheerio.load(html);

                    let parts = link.split('/');

                    product.id = parseInt(parts[parts.length - 1].replace('product-', ''));
                    product.icon = souvreUrl + $('img').attr('src');
                    product.price = parseFloat($('.slide-description span.price-color').first().text().replace(/,/g, '.'));
                    product.name = $('img').attr('alt');
                    product.shortDescription = $('.slide-description p[style]').first().text();
                    product.description = $('.slide-description-more').html().replace(/\s\s+/g, ' ');

                    products.push(product);
                    fs.writeFile('json/'+name+'.json', JSON.stringify(products), 'utf8', () => { })
                    // console.log(products);
                }
            });
        });

    });
}


// functions
// function getSuplementsProductsUrls() {
//     for (let url of suplementsUrls) {
//         fetch(url, {
//             'method': 'get',
//             'headers': getHeaders()
//         }).then(res => res.text()).then(body => {
//             let $ = cheerio.load(body);

//             $('p.product-name a').each(function (i, elem) {
//                 let link = $(this).attr('href');
//                 if (link) suplementsProductsUrls.push(souvreUrl + link);
//             });
//         });
//     }
// }

// function getCollagensProductsUrls() {
//     for (let url of collagenUrls) {
//         let urls = [];
//         fetch(url, {
//             'method': 'get',
//             'headers': getHeaders()
//         }).then(res => res.text()).then(body => {
//             let $ = cheerio.load(body);

//             $('p.product-name a').each(function (i, elem) {
//                 let link = $(this).attr('href');
//                 if (link) urls.push(souvreUrl + link);
//             });

//             collagensProductsUrls.push(urls);
//             // console.log(collagensProductsUrls);
//             // return urls;
//         });
//     }
// }


// fs.writeFile('product-short.html', $, 'utf8' ,() => {})
// fs.writeFile('product.html', body, () => {})
// fs.appendFile('atrybuty.txt', attribs.class, () => {})


function getHeaders() {
    return {
        'host': 'www.souvre.pl',
        'user-agent': userAgent,
        'Upgrade-Insecure-Requests': '1',
        'Cookie': ' PHPSESSID=' + phpSID + ';',
    };
}

// fetch(url, {
//     'method': 'get',
//     'headers': getHeaders()
// }).then(res => res.text()).then(body => {
//     product.nameDE = $('img').attr('alt');
//     product.shortDescriptionDE = $('.slide-description p[style]').first().text();
//     product.descriptionDE = $('.slide-description-more').html().replace(/\s\s+/g, ' ');


//     fetch(url, {
//         'method': 'get',
//         'headers': getHeaders()
//     }).then(res => res.text()).then(body => {
//         product.nameEN = $('img').attr('alt');
//         product.shortDescriptionEN = $('.slide-description p[style]').first().text();
//         product.descriptionEN = $('.slide-description-more').html().replace(/\s\s+/g, ' ');


//     })
// });

// let $ = cheerio.load(fs.readFileSync('product.html', 'utf8'));
// let html = $('.inside-product').html();
// if(html){
//     $ = cheerio.load(html);

//     product = {
//         url: productUrl,
//         icon: souvreUrl+$('img').attr('src'),
//         name: $('img').attr('alt'),
//         price: parseFloat($('.slide-description span.price-color').first().text().replace(/,/g, '.')),
//         shortDescription: $('.slide-description p[style]').first().text(),
//         description: $('.slide-description-more').html().replace(/\s\s+/g, ' ')
//     };

//     products.push(product);

//     console.log(product);



//     // console.log($('.slide-description').text());

//     // console.log(product);

// }












































/* LOGIN
fetch('https://www.souvre.pl/MLM/panel/login').then(res => res.text())
    .then(body => {
        var parser = new htmlparser.Parser({
            onopentag: function (name, attribs) {
                // console.log(attribs);
                if (attribs.name === "csrf_token") {

                    let form = new formData();
                    form.append('csrf_token', attribs.value);
                    form.append('userLogin', username);
                    form.append('userPass', password);

                    fetch('https://www.souvre.pl/MLM/panel/login/validate',
                        {
                            'method': 'post',
                            'body': form,
                            'headers':
                                {
                                    'host': 'www.souvre.pl',
                                    'referer': 'https://www.souvre.pl',
                                    'origin': 'https://www.souvre.pl/MLM/panel/login',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'user-agent': userAgent,
                                    'Upgrade-Insecure-Requests': '1',
                                    'x-requested-with': 'XMLHttpRequest',

                                },
                        }).then(res => res.text()).then(
                            data => {

                                console.log(data);

                                // let cookies = '';
                                // for (let t of data.headers) {
                                //     if (t[0] == 'set-cookie') cookies = t[1];
                                // }
                                // var match = cookies.match(new RegExp('(^| )PHPSESSID=([^;]+)'));
                                // if (match) {
                                //     phpSID = match[2];

                                //     let headerCookie = ' PHPSESSID=' + phpSID + ';';

                                //     console.log(headerCookie);

                                //     fetch(productUrl, {
                                //         'method': 'get',
                                //         'headers':
                                //             {
                                //                 'host': 'www.souvre.pl',
                                //                 'user-agent': this.userAgent,
                                //                 'Upgrade-Insecure-Requests': '1',
                                //                 'Cookie': headerCookie,

                                //             },
                                //     }).then(res => res.text()).then(body => {
                                //         console.log(body)
                                //     })
                                // }
                            }
                        ).catch((e) => console.log('Souvre authentication failed' + e))
                }
            }
        }, { decodeEntities: true });
        parser.write(body);
        parser.end();
    });

    */