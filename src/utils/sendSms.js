import { useState } from "react"

const sendSms = async(to, sms)=>{

    let statu = true

    const smsEncoded  = encodeURI(sms)
    const fromEncoded = encodeURI("+19472085059")
    const toEncoded   = to
    

    const URL = "https://api.twilio.com/2010-04-01/Accounts/ACe0dc493300fce94bc13c6864b1cfb91f/Messages.json"
    const AUTH = "ACe0dc493300fce94bc13c6864b1cfb91f:4f02807c32c8609b93a5f91f2f97301e"

    const myHeaders = new Headers({
        'Content-Type'  : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(AUTH)
    })

    const init = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: `To=${toEncoded}&From=${fromEncoded}&Body=${smsEncoded}`
    }
    
    return await fetch(URL, init)
    .then(response => response.ok)
    .catch(error => error.ok)


}

/*
curl 'https://api.twilio.com/2010-04-01/Accounts/ACe0dc493300fce94bc13c6864b1cfb91f/Messages.json' -X POST \
--data-urlencode 'To=+237693342860' \
--data-urlencode 'From=+19472085059' \
--data-urlencode 'Body=salut ceci est message de test' \
-u ACe0dc493300fce94bc13c6864b1cfb91f:[Redacted]

=============================
{
    "sid": "SM185f5403c8934972aab66af7a4007e01",
    "date_created": "Mon, 06 Dec 2021 01:11:38 +0000",
    "date_updated": "Mon, 06 Dec 2021 01:11:38 +0000",
    "date_sent": null,
    "account_sid": "ACe0dc493300fce94bc13c6864b1cfb91f",
    "to": "+237693342860",
    "from": "+19472085059",
    "messaging_service_sid": null,
    "body": "Sent from your Twilio trial account - salut ceci est message de test",
    "status": "queued",
    "num_segments": "1",
    "num_media": "0",
    "direction": "outbound-api",
    "api_version": "2010-04-01",
    "price": null,
    "price_unit": "USD",
    "error_code": null,
    "error_message": null,
    "uri": "/2010-04-01/Accounts/ACe0dc493300fce94bc13c6864b1cfb91f/Messages/SM185f5403c8934972aab66af7a4007e01.json",
    "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACe0dc493300fce94bc13c6864b1cfb91f/Messages/SM185f5403c8934972aab66af7a4007e01/Media.json"
    }
}


*/

export default sendSms
