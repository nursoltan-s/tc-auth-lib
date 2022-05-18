function (user, context, callback) {
    if (context.clientID === configuration.CLIENT_ACCOUNTS_LOGIN) { // client/application specific
        // TODO: implement your rule
        const _ = require('lodash');
        const did = _.get(context, "request.query.did", null);

        if (context.protocol === 'redirect-callback' && did) {
            console.log("----------:Entered DiD  Rule:------------");
            global.AUTH0_CLAIM_NAMESPACE = "https://" + configuration.DOMAIN + "/";
            context.idToken[global.AUTH0_CLAIM_NAMESPACE + "mfa"] = true;
	          return callback(null, user, context);
            // returnning from here no need to check further  
        } else {  // if it is not redirect, do nothing 
          const mfa = configuration.CUSTOM_PAGES_BASE_URL +
                "/MFA.html";
            context.redirect = {
                                url: mfa
                            };
        return callback(null, user, context);
          //return callback(null, user, context);
        }
    } else {
        // for other apps do nothing 
        return callback(null, user, context);
    }
}