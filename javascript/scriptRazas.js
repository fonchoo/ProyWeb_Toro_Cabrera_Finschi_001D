// Objeto de traducción
const translations = {
    name: {
        "Affenpinscher": "Affenpinscher",
        "Afghan Hound": "Sabueso afgano",
        "African Hunting Dog": "Perro de caza africano",
        "Airedale Terrier": "Airedale Terrier",
        "Akbash Dog": "Perro Akbash",
        "Akita": "Akita",
        "Alapaha Blue Blood Bulldog": "Bulldog Alapaha Blue Blood",
        "Alaskan Husky": "Husky de Alaska",
        "Alaskan Malamute": "Malamute de Alaska",
        // Agrega más traducciones según sea necesario
    },
    bred_for: {
        "Small rodent hunting, lapdog": "Caza de pequeños roedores, perro faldero",
        "Coursing and hunting": "Carreras y caza",
        "A wild pack animal": "Animal salvaje en manadas",
        "Badger, otter hunting": "Caza de tejones y nutrias",
        "Sheep guarding": "Guardia de ovejas",
        "Hunting bears": "Caza de osos",
        "Guarding": "Guardia",
        "Sled pulling": "Tracción de trineo",
        "Hauling heavy freight, Sled pulling": "Transporte de carga pesada, Tracción de trineo",
        // Agrega más traducciones según sea necesario
    },
    breed_group: {
        "Toy": "Jugueton",
        "Hound": "Sabueso",
        "Terrier": "Terrier",
        "Working": "Trabajador",
        "Mixed": "Mixto",
        // Agrega más traducciones según sea necesario
    },
    life_span: {
        "10 - 12 years": "10 - 12 años",
        "10 - 13 years": "10 - 13 años",
        "11 years": "11 años",
        "12 - 13 years": "12 - 13 años",
        "12 - 14 years": "12 - 14 años",
        "12 - 15 years": "12 - 15 años",
        "12 - 16 years": "12 - 16 años",
        "10 - 14 years": "10 - 14 años",
        // Agrega más traducciones según sea necesario
    },
    temperament: {
        "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving": "Testarudo, Curioso, Juguetón, Aventurero, Activo, Amante de la diversión",
        "Aloof, Clownish, Dignified, Independent, Happy": "Distante, Payaso, Digno, Independiente, Feliz",
        "Wild, Hardworking, Dutiful": "Salvaje, Trabajador, Deberoso",
        "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous": "Sociable, Amigable, Alerta, Confiable, Inteligente, Valiente",
        "Loyal, Independent, Intelligent, Brave": "Leal, Independiente, Inteligente, Valiente",
        "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous": "Dócil, Alerta, Receptivo, Digno, Compuesto, Amigable, Receptivo, Fiel, Valiente",
        "Loving, Protective, Trainable, Dutiful, Responsible": "Amoroso, Protector, Adiestrable, Deberoso, Responsable",
        "Friendly, Energetic, Loyal, Gentle, Confident": "Amigable, Energético, Leal, Gentil, Confiable",
        "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful": "Amigable, Afectuoso, Devoto, Leal, Digno, Juguetón",
        // Agrega más traducciones según sea necesario
    }
};

// Función para traducir los campos
function translateField(field, value) {
    if (translations[field] && translations[field][value]) {
        return translations[field][value];
    }
    // Si no hay traducción disponible, devuelve el valor original
    return value;
}

// Esta función obtiene los datos de las razas de perros y los procesa
function getRazas(done) {
    const results = fetch("https://api.thedogapi.com/v1/breeds");

    results
        .then(response => response.json())
        .then(data => {
            done(data);
        });
}

// Esta función traduce los datos y los muestra en el documento HTML
getRazas(data => {
    let count = 0; // Contador para rastrear el número de razas mostradas
    data.forEach(dogBreed => {
        if (count < 9) { // Mostrar solo los datos de las primeras 10 razas
            // Traducir los campos
            const translatedName = translateField('name', dogBreed.name);
            const translatedBredFor = translateField('bred_for', dogBreed.bred_for);
            const translatedBreedGroup = translateField('breed_group', dogBreed.breed_group);
            const translatedLifeSpan = translateField('life_span', dogBreed.life_span);
            const translatedTemperament = translateField('temperament', dogBreed.temperament);

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
                            <h2>${translatedName}</h2>
                            <span> ${translatedTemperament} </span>
                            <p>${translatedBredFor}</p>
                            <p>${translatedBreedGroup ? translatedBreedGroup : ''}</p>
                            <p>${translatedLifeSpan}</p>
                        </article>
                    `);
                    const main = document.querySelector("main");
                    main.append(article);
                })
                .catch(error => {
                    console.error('Error al obtener la URL de la imagen:', error.message);
                });

            count++; // Incrementar el contador después de mostrar los datos de una raza
        }
    });
});

