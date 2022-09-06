export default function handler(response) {
    response
        .status(200)
        .send(
            "Welocome to Chatly's Internal API. I think you shouldn't be here.<br>Visit <a href=https://chatly.alwinsunil.in/ target=_blank rel=noopener noreferrer> chatly.alwinsunil.in<a/>"
        )
}
