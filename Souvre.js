"use-strict";

const fetch = require('node-fetch');
const formData = require('form-data');
const htmlparser = require("htmlparser2");

module.exports = class Souvre {
    constructor(){
        this.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36";
        this.phpSID = "";
        // this.auth('filip.wojnicki@op.pl', 'Filipcio12.');

        //this.parseProduct('https://www.souvre.pl/shop/2/category-38/product-858');
    }

    parseProduct(productUrl) {
        this.auth('filip.wojnicki@op.pl', 'Filipcio12.').then((t) => {
            console.log(t);
        })
        console.log(productUrl);

        return fetch(productUrl,
            {
                'method': 'get',
                'headers':
                    {
                        'host': 'www.souvre.pl',
                        'user-agent': this.userAgent,
                        'Upgrade-Insecure-Requests': '1',
                        'Cookie': ' PHPSESSID=' + this.phpSID + ';',

                    },
            }).then(res => res.text()).then(body => {
                return body
            })
    }
























    auth(username, password) {
        let csrf = "";
        return fetch('https://www.souvre.pl/MLM/panel/login').then(res => res.text())
            .then(body => {
                var parser = new htmlparser.Parser({
                    onopentag: function (name, attribs) {
                        // console.log(attribs);
                        if (attribs.name === "csrf_token") {
                            
                            let form = new formData();
                            form.append('csrf_token', attribs.value);
                            form.append('userLogin', username);
                            form.append('userPass', password);
                            form.append('remember_password', 'off');

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
                                            'user-agent': this.userAgent,
                                            'Upgrade-Insecure-Requests': '1',
                                            'x-requested-with': 'XMLHttpRequest',

                                        },
                                }).then(
                                    data => {
                                        let cookies = '';
                                        for (let t of data.headers){
                                            if (t[0] == 'set-cookie') cookies = t[1];
                                        }
                                        var match = cookies.match(new RegExp('(^| )PHPSESSID=([^;]+)'));
                                        if (match){
                                            this.phpSID = match[2];
                                            console.log(this.phpSID);
                                            // return true;
                                        }
                                        
                                        // return false;
                                    }
                                ).catch((e) => console.log('Souvre authentication failed'+e))
                        }
                    }
                }, { decodeEntities: true });
                parser.write(body);
                parser.end();
                console.log(this.phpSID);
            });
        
    }

}
