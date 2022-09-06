export const renderData = (data) => {
    let textDataList = []
    let textDataString

    if (data.type === "text/link") {
        for (let i = 0; i < data.payload.length; i++) {
            if (data.payload[i].type === "link") {
                let link = data.payload[i].content

                if (link.startsWith("https://") || link.startsWith("http://")) {
                    textDataList.push(
                        `<a href="${link}" target="_blank" rel="noopener noreferrer">${data.payload[i].content}</a>`
                    )
                } else {
                    link = "http://" + link
                    textDataList.push(
                        `<a href="${link}" target="_blank" rel="noopener noreferrer">${data.payload[i].content}</a>`
                    )
                }
            } else {
                textDataList.push(data.payload[i].content)
            }
        }

        textDataString = textDataList.join(" ")
    } else if (data.type === "link/standalone") {
        let link = data.payload

        if (link.startsWith("https://") || link.startsWith("http://")) {
            textDataString = `<a href="${link}" target="_blank" rel="noopener noreferrer">${data.payload}</a>`
        } else {
            link = "http://" + link
            return `<a href="${link}" target="_blank" rel="noopener noreferrer">${data.payload}</a>`
        }
    } else {
        textDataString = data.payload
    }

    return textDataString
}
