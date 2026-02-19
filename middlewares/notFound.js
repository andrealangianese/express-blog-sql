function notFound(req, res) {
    //  gestisco lo status
    res.status(404)
    //   gestisco la risposta dell'errore
    res.json({
        error: "Not Found",
        message: "Pagina non trovata, ritenta sarai più fortunato"
    });
};

module.exports = notFound;