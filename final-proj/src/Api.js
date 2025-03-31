const apiURL =../server/units'
return fetch(`${apiURL}/colors/`, options).then(async response => {
    if (response.ok) {
        console.log("Response was ok")
        return response.json()
    } else {
        console.log("There was a error")
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
    }
})
    }