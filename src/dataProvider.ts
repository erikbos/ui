import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

function getResousrcePath (resource: string) :string {
    switch (resource) {
        case 'users':
        case 'roles':
        case 'organizations':
            return '/v1/' + resource
        case 'developers':
            return '/v1/organizations/default/' + resource
    }
}

function getArray (resource: string) :string {
    switch (resource) {
        case 'users':
            return 'user'
        case 'roles':
            return 'role'

        case 'listeners':
            return 'listeners'
        case 'routes':
            return 'routes'
        case 'clusters':
            return 'clusters'

        case 'developers':
            return 'developer'
    }
}

function addId (resource: string, burp) {
    switch (resource) {
        case 'users':
        case 'roles':
            return {...burp, id: burp.name }
        }
}

export default (apiUrl:string, httpClient = fetchUtils.fetchJson): DataProvider => ({
    getList: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     ...fetchUtils.flattenObject(params.filter),
        //     _sort: field,
        //     _order: order,
        //     _start: (page - 1) * perPage,
        //     _end: page * perPage,
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;

        const url = `${apiUrl}/v1/${resource}`
        return httpClient(url).then(({ headers, json }) => {
            // if (!headers.has('x-total-count')) {
            //     throw new Error(
            //         'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
            //     );
            // }
            const data = json[getArray(resource)]
            return {
                data: data.map((resource) => ({...resource, id: resource.name })),
                total: 10,
                // total: parseInt(
                //     headers.get('x-total-count').split('/').pop(),
                //     10
                // ),
            };
        });
    },

    getOne: (resource, params) => {

        return httpClient(`${apiUrl}/v1/${resource}/${params.id}`).then(({ headers, json }) => {
            json.id = json.name
            return {
                data: json,
            };
        });
    },

    // json-server doesn't handle filters on GET route, so we fallback to calling GET n times instead
    getMany: (resource, params) => {

        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/v1/${resource}/${id}`, {
                    method: 'GET',
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) }))},

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            [params.target]: params.id,
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
        const url = `${apiUrl}/v1/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            // if (!headers.has('x-total-count')) {
            //     throw new Error(
            //         'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
            //     );
            // }
            json.id = json.name
            return {
                data: json,
                total: parseInt(
                    headers.get('x-total-count').split('/').pop(),
                    10
                ),
            };
        });
    },

    update: (resource, params) => {
        delete params.data.id
        return httpClient(`${apiUrl}/v1/${resource}/${params.id}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.name },
        }))
    },

    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.name) })),

    create: (resource, params) => {

        return httpClient(`${apiUrl}/v1/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.name },
            }))
    },

    delete: (resource, params) => {

        const url = `${apiUrl}/v1/${resource}/${params.id}`
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }))
    },

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
});
