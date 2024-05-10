function getRazas(done) {
    const results = fetch("https://api.thedogapi.com/v1/breeds")

    results
        .then(response => response.json())
        .then(data => {
            done(data)
        })
}

getRazas(data => {
    data.forEach(dogBreed => {
        // Hacer una solicitud para obtener la URL de la imagen usando reference_image_id
        fetch(`https://api.thedogapi.com/v1/images/${dogBreed.reference_image_id}`)
            .then(response => response.json())
            .then(imageData => {
                const imageUrl = imageData.url;
                const article = document.createRange().createContextualFragment(`
                    <article>
                        <div class="image-container">
                            <img src="${imageUrl}" alt="raza" style="max-width: 100px; height: auto;">
                        </div>
                        <h2>${dogBreed.name}</h2>
                        <span> ${dogBreed.temperament} </span>
                        <p>${dogBreed.bred_for}</p>
                        <p>${dogBreed.breed_group}</p>
                        <p>${dogBreed.life_span}</p>
                        
                    </article>
                `);
                const main = document.querySelector("main")
                main.append(article)
            })
            .catch(error => {
                console.error('Error al obtener la URL de la imagen:', error.message);
            });
    });
});




