import { useState } from "react"

const sendSms = async (to, sms, toAlpha = "LIFELINE") => {
    alert(JSON.stringify(to));

    let statu = true

    const smsEncoded = encodeURI(sms)
    const fromEncoded = encodeURI("+19472085059")
    const fromNumeric = encodeURI(toAlpha)
    const toEncoded = to


    const URL = "https://api.twilio.com/2010-04-01/Accounts/ACe0dc493300fce94bc13c6864b1cfb91f/Messages.json"
    const AUTH = "ACe0dc493300fce94bc13c6864b1cfb91f:4f02807c32c8609b93a5f91f2f97301e"

    const myHeaders = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(AUTH)
    })

    const init = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: `To=${toEncoded}&From=${fromNumeric}&Body=${smsEncoded}`
    }

    return await fetch(URL, init)
        .then(response => console.log(response))
        .catch(error => console.log(error))


}
export default sendSms
