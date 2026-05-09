// api/messages.js
let messages = global.messages || [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Message text is required" });
        }

        messages.push({
            username: username || "Anonymous",
            text: text,
            time: Date.now()
        });

        // Keep only the latest 100 messages
        if (messages.length > 100) messages.shift();

        global.messages = messages;

        return res.status(200).json({ success: true });
    }

    // GET all messages
    res.status(200).json(messages);
}
