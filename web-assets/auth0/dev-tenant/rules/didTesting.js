
function (user, context, callback) {
    if (context.clientID === configuration.CLIENT_ACCOUNTS_LOGIN) { // client/application specific
        // TODO: implement your rule
        const _ = require('lodash');
        const did = _.get(context, "request.query.did", null);

        if (context.protocol === 'redirect-callback' && did) {
            console.log("----------:Entered DiD  Rule:------------");
            global.AUTH0_CLAIM_NAMESPACE = "https://" + configuration.DOMAIN + "/";

            // returnning from here no need to check further  
        } else {  // if it is not redirect, do nothing 
            return callback(null, user, context);
        }
    } else {
        // for other apps do nothing 
        return callback(null, user, context);
    }
}