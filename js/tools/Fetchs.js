function Fetchs(_cors = 'cors', root = '') {

    Fetchs.URL_TYPE_INTEROGATION = 0;
    Fetchs.URL_TYPE_SLASHED_SHORT = 1;
    Fetchs.URL_TYPE_SLASHED_LONG = 2;

    Fetchs.FORM_TYPE_URL_ENCODE = 0;
    Fetchs.FORM_TYPE_JSON_APP = 1;
    Fetchs.FORM_TYPE_MULTIPART = 2;

    const cors = ['cors', 'no-cors']
        .find(function (item) { return item == _cors }) || 'cors';

    const credentials = (cors == 'cors') ? 'include' : 'no-include';

    const postFormat = function (json, type) {
        if (type == Fetchs.FORM_TYPE_JSON_APP)
            return JSON.stringify(json);
        
        if (json instanceof FormData) {
            return json;
        }

        const formData = new FormData();
        for (i in json) {
            if (typeof (json[i]) != 'number' && typeof (json[i]) != 'string' && !(json[i] instanceof Blog))
                throw new Error('Invalid type ' + i);

            formData.append(i, json[i]);
        }
        return new URLSearchParams(formData);
        //return formData;
    }

    const getFormat = function (json, type) {
        if (!json) return '';

        if (type == 1) {
            let result = '/';
            for (i in json)
                result = result + json[i] + '/';
            return result.substring(0, result.length - 1);
        }

        if (type == 2) {
            let result = '/';
            for (i in json)
                result = result + i + '/' + json[i] + '/';
            return result;
        }

        let result = '?'
        for (i in json)
            result = result + i + '=' + json[i] + '&';
        return result.substring(0, result.length - 1);
    }

    return {
        post: async function (url, data, type = 0) {

            const appTypes = ['aplpication/x-www-form-urlencoded', 'application/json', 'multipart/formdata'];

            const headers = new Headers();
            if (type != Fetchs.FORM_TYPE_URL_ENCODE) {
                headers.append('Content-Type', appTypes[type]);
            }

            const body = postFormat(data, type);

            return response = await fetch(root + url, {
                method: 'POST',
                mode: cors,
                // credentials: credentials,
                headers: headers,
                body: body
            })

            // return response.json();
        },

        get: async function (url, data = {}, urlType = 1) {

            return response = await fetch(root + url + getFormat(data, urlType), {
                method: 'GET',
                mode: cors,
                // credentials: credentials
            });

            // return response.json();
        },
        redirect:function(url, data = {}, urlType = 1){
            location = root + url + getFormat(data, urlType);
        }
    }
}