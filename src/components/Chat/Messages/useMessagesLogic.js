export const renderData = (data) => {
    let textDataList = []
    let textDataString

    if (data.type === "text/link") {
        for (let i = 0; i < data.payload.length; i++) {
            if (data.payload[i].type === "link") {
                let link = data.payload[i].content
                let linkPreview

                if (link.length > 30) {
                    linkPreview = link.slice(0, 30) + "..."
                }

                if (link.startsWith("https://") || link.startsWith("http://")) {
                    textDataList.push(
                        `<a href="${link}" target="_blank" rel="noopener noreferrer">${linkPreview}</a>`
                    )
                } else {
                    link = "http://" + link
                    textDataList.push(
                        `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`
                    )
                }
            } else {
                textDataList.push(data.payload[i].content)
            }
        }

        textDataString = textDataList.join(" ")
    } else if (data.type === "link/standalone") {
        let link = data.payload
        let linkPreview

        if (link.length > 30) {
            linkPreview = link.slice(0, 30) + "..."
        } else {
            linkPreview = link
        }

        if (link.startsWith("https://") || link.startsWith("http://")) {
            textDataString = `<a href="${link}" target="_blank" rel="noopener noreferrer">${linkPreview}</a>`
        } else {
            link = "http://" + link
            return `<a href="${link}" target="_blank" rel="noopener noreferrer">${linkPreview}</a>`
        }
    } else {
        textDataString = data.payload
    }

    return textDataString
}
