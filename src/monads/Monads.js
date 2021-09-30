let request = require('sync-request');

let searchReddit = (search) => {
    let response
    try {

        let x = request('GET', "https://www.reddit.com/search.json?q=" + encodeURI(search))
            .getBody('utf8')
        response = JSON.parse(x)
    } catch (err) {
        response = { message: "Something went wrong", errorCode: err['statusCode'] }
    }
    return response
}

let getComments = (link) => {
    let response
    try {
        let x = request('GET', "https://www.reddit.com/" + link).getBody('utf8')
        response = JSON.parse(x)
    } catch (err) {
        response = {
            message: "Something went wrong", errorCode: err['statusCode']
        }
    }
    return response
}

let mergeViaMayBe = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe
        .map((arr) => arr['data'])
        .map((arr) => arr['children'])
        .map((arr) => arrayUtils.map(arr, (x) => {
            return {
                title: x['data'].title,
                permalink: x['data'].permalink
            }
        }
        ))
        .map((obj) => arrayUtils.map(obj, (x) => {
            return {
                title: x.title,
                comments: MayBe.of(getComments(x.
                    permalink.replace("?ref=search_posts", ".json")))
            }
        }));
    return ans;
}

let mergeViaJoin = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe.map((arr) => arr['data'])
        .map((arr) => arr['children'])
        .map((arr) => arrayUtils.map(arr, (x) => {
            return {
                title: x['data'].title,
                permalink: x['data'].permalink
            }
        }
        ))

        .map((obj) => arrayUtils.map(obj, (x) => {
            return {
                title: x.title,
                comments: MayBe.of(getComments
                    (x.permalink.replace
                        ("?ref=search_posts", ".json"))).join()
            }
        }))
        .join()
    return ans;
}

let mergeViaChain = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe.map((arr) => arr['data'])
        .map((arr) => arr['children'])
        .map((arr) => arrayUtils.map(arr, (x) => {
            return {
                title: x['data'].title,
                permalink: x['data'].permalink
            }
        }
        ))
        .chain((obj) => arrayUtils.map(obj, (x) => {
            return {
                title: x.title,
                comments: MayBe.of(getComments(x.
                    permalink.replace("?ref=search_posts",
                        ".json"))).join()
            }
        }))
    return ans;
}

let mergeViaChain = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe
        .map((arr) => arr['data'])
        .map((arr) => arr['children'])
        .map((arr) => arrayUtils.map(arr, (x) => {
            return {
                title: x['data'].title,
                permalink: x['data'].permalink
            }
        }))
        .chain((obj) => arrayUtils.map(obj, (x) => {
            return {
                title: x.title,
                comments: MayBe
                    .of(getComments(x.permalink.replace("?ref=search_posts", ".json")))
                    .chain(x => {
                        return x.length
                    })
            }
        }))
    return ans;
}

let https = require('https');
function httpGetAsync(url, callback) {
    return https.get(url,
        function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                let parsed = JSON.parse(body)
                callback(parsed)
            })
        }
    );
}

let grade = "A+";
let examResults = new Promise(
    function (resolve, reject) {
        if (grade == "A+")
            resolve("You will get an XBOX");
        else
            reject("Better luck next time");
    }
);

let conductExams = () => {
    examResults
        .then(x => console.log(x)) // captures resolve and logs "You will get an XBOX"
        .catch(x => console.error(x)); // captures rejection and logs "Better luck next time"
};
conductExams();

function fetchTextByPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("es8");
        }, 2000);
    });
}

function sayHello() {
    return new Promise((resolve, reject) => fetchTextByPromise()
        .then(x => console.log(x))
        .catch(x => console.error(x)));
}

function sayHello() {
    return new Promise((resolve, reject) => fetchTextByPromise()
        .then(x => console.log(x))
        .catch(x => console.error(x)));
}

async function sayHello() {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Response from SayHello: Hello, ${externalFetchedText}`);
}

let sayHello = async () => {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Response from SayHello: Hello, ${externalFetchedText}`); // Hello, es8
}

// returns a Promise
const getAsync = (url) => {
    return fetch(url)
        .then(x => x)
        .catch(x =>
            console.log("Error in getAsync:" + x)
        );
}

// 'async' can only be used in functions where 'await' is used
async function getAsyncCaller() {
    try {
        // https://jsonplaceholder.typicode.com/users is a sample API which returns a JSON Array of dummy users
        const response = await getAsync("https://jsonplaceholder.typicode.com/users"); // pause until Promise completes
        const result = await response.json(); //removing .json here demonstrates the error handling in Promises
        console.log("GetAsync fetched " + result.length + " results");
        return result;
    } catch (error) {
        await Promise.reject("Error in getAsyncCaller:" + error.message);
    }
}

getAsyncCaller()
    .then(async (x) => {
        console.log("Call to GetAsync function completed");
        const website = await getAsync("http://" + x[0].website);
        console.log("The website (http://" + x[0].website + ") content length is " + website.toString().length + " bytes");
    })
    .catch(x => console.log("Error: " + x)); // Promise.Reject is caught here, the error message can be used to perform custom error handling