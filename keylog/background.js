
var localId;
var portFromCS;

function connected(p) {
    portFromCS = p;
    portFromCS.postMessage({greeting: "hi there content script!"});

    portFromCS.onMessage.addListener(function(m) {
        console.log("In background script, received message from content script")
        console.log(m);

        // means the content script sent an item to be recorded in dynamoDB
        if (p.name == "dynamo-port") {
            // add UserID and Timestamp (primary and sort key) to parameters for dynamoDB call
            m.Item["UserID"] = localId;
            m.Item["DataTimestamp"] = Date.now().toString();

            var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});
            docClient.put(m, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Log to Dynamo success", data);
                }
            });
        }
    });
}

function onError(e) {
    console.error(e);
}

function checkUserId(storedSettings) {
    // if there isn't a userId yet, get one from Cognito
    if (!storedSettings.userId) {
        // set up basic AWS credentials
        AWS.config.region = 'us-east-1';

        // set up the cognito identity object
        var cognitoidentity = new AWS.CognitoIdentity();
        var cognitoParams = {
            IdentityPoolId: 'us-east-1:7e93b0a2-2478-49f3-87e1-a695a3aed058'
        };

        // retrieve a new identityID from our identity pool
        cognitoidentity.getId(cognitoParams, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.IdentityId);
                // store it in a variable, and also in the extension's long-term storage
                browser.storage.local.set({userId: data.IdentityId});
                localId = data.IdentityId;
            }
        });

        // update credentials object with new identity ID
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityId: localId
        });

        console.log("created new cognito ID");
    } else {
        console.log("userId is " + storedSettings.userId);
        localId = storedSettings.userId;

        // create credentials object from stored ID
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityId: localId,
        });
    }
}

// retrieve stored user ID, unless there isn't one, then make it
const gettingStorage = browser.storage.local.get();
gettingStorage.then(checkUserId, onError);

browser.runtime.onConnect.addListener(connected);
