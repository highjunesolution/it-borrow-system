exports.create = (req, res) => {
    try {
        res.send("Hi there, create")
    } catch (err) {
        console.log(err);
    }
}
