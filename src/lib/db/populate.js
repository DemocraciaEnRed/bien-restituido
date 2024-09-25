const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'bien-restituido';

// Lista de íconos disponibles
const icons = ["car", "tractor", "gear", "motorcycle", "shop"];
// Lista de destinos disponibles
const destinations = ['auction', 'reuse', 'Testing'];

// Datos para las jurisdicciones y tribunales
const jurisdicciones = [
    'Capital Federal', 'Buenos Aires', 'CABA', 'La Plata', 'Rosario'
];
const juzgados = [
    'Juzgado de Primera Instancia', 'Juzgado Penal', 'Juzgado Civil', 'Juzgado Laboral'
];
const fiscalias = [
    'Fiscalía General', 'Fiscalía Penal', 'Fiscalía Civil', 'Fiscalía Laboral'
];
const tribunales = [
    'Tribunal Superior', 'Tribunal de Apelación', 'Tribunal Federal', 'Tribunal de Juicio'
];

const populateDB = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Colecciones
        const categories = db.collection('categories');
        const subCategories = db.collection('subcategories');
        const extraFields = db.collection('extrafields');
        const assets = db.collection('assets');

        await categories.deleteMany({});
        await subCategories.deleteMany({});
        await extraFields.deleteMany({});
        await assets.deleteMany({});

        // Crear categorías
        const category1 = { name: 'Category 1', slug: 'category-1' };
        const category2 = { name: 'Category 2', slug: 'category-2' };

        const category1Result = await categories.insertOne(category1);
        const category2Result = await categories.insertOne(category2);

        // Crear subcategorías para la primera categoría
        const subCategory1A = {
            name: 'SubCategory 1A',
            icon: icons[0],  // "car"
            color: '#FFBE98',
            category: category1Result.insertedId,
            slug: 'category-1-subCategory-1a',
        };
        const subCategory1B = {
            name: 'SubCategory 1B',
            icon: icons[1],  // "tractor"
            color: '#F05A7E',
            category: category1Result.insertedId,
            slug: 'category-1-subCategory-1b',
        };

        const subCategory1AResult = await subCategories.insertOne(subCategory1A);
        const subCategory1BResult = await subCategories.insertOne(subCategory1B);

        // Crear subcategorías para la segunda categoría
        const subCategory2A = {
            name: 'SubCategory 2A',
            icon: icons[2],  // "gear"
            color: '#125B9A',
            category: category2Result.insertedId,
            slug: 'category-2-subCategory-2a',
        };
        const subCategory2B = {
            name: 'SubCategory 2B',
            icon: icons[3],  // "motorcycle"
            color: '#0B8494',
            category: category2Result.insertedId,
            slug: 'category-2-subCategory-2b',
        };

        const subCategory2AResult = await subCategories.insertOne(subCategory2A);
        const subCategory2BResult = await subCategories.insertOne(subCategory2B);

        // Crear campos extra para la primera categoría
        const extraFields1 = [
            { name: 'Extra Field 1A', hiddenDownload: false, type: 'text', description: 'Extra Field 1A Description', required: true, showCard: 'ALLWAYS', category: category1Result.insertedId, slug: 'category-1-extra-field-1a' },
            { name: 'Extra Field 1B', hiddenDownload: false, type: 'number', description: 'Extra Field 1B Description', required: false, showCard: 'EXPANDED', category: category1Result.insertedId, slug: 'category-1-extra-field-1b' },
            { name: 'Extra Field 1C', hiddenDownload: true, type: 'date', description: 'Extra Field 1C Description', required: true, showCard: 'ALLWAYS', category: category1Result.insertedId, slug: 'category-1-extra-field-1c' },
            { name: 'Extra Field 1D', hiddenDownload: false, type: 'email', description: 'Extra Field 1D Description', required: false, showCard: 'NO', category: category1Result.insertedId, slug: 'category-1-extra-field-1d' }
        ];
        const extraFields1Result = await extraFields.insertMany(extraFields1);

        // Crear campos extra para la segunda categoría
        const extraFields2 = [
            { name: 'Extra Field 2A', hiddenDownload: false, type: 'text', description: 'Extra Field 2A Description', required: true, showCard: 'ALLWAYS', category: category2Result.insertedId, slug: 'category-2-extra-field-2a' },
            { name: 'Extra Field 2B', hiddenDownload: false, type: 'number', description: 'Extra Field 2B Description', required: false, showCard: 'EXPANDED', category: category2Result.insertedId, slug: 'category-2-extra-field-2b' },
            { name: 'Extra Field 2C', hiddenDownload: true, type: 'date', description: 'Extra Field 2C Description', required: true, showCard: 'ALLWAYS', category: category2Result.insertedId, slug: 'category-2-extra-field-2c' },
            { name: 'Extra Field 2D', hiddenDownload: false, type: 'email', description: 'Extra Field 2D Description', required: false, showCard: 'NO', category: category2Result.insertedId, slug: 'category-2-extra-field-2d' }
        ];
        const extraFields2Result = await extraFields.insertMany(extraFields2);

        // Helper para crear los "extras" basado en la categoría
        const createExtras = (categoryId) => {
            let extras = {

            };
            let extraFieldsForCategory;
            let key;
            if (categoryId.equals(category1Result.insertedId)) {
                extraFieldsForCategory = extraFields1;
                key = extraFields1Result
            } else if (categoryId.equals(category2Result.insertedId)) {
                extraFieldsForCategory = extraFields2;
                key = extraFields2Result
            }
            extraFieldsForCategory.forEach((field, idx) => {
                let value;
                switch (field.type) {
                    case 'text':
                        value = `Sample text for ${field.name}`;
                        break;
                    case 'number':
                        value = Math.floor(Math.random() * 100);
                        break;
                    case 'date':
                        value = new Date().toISOString().split('T')[0];
                        break;
                    case 'email':
                        value = `SampleEmail${idx}@email.com`;
                        break;
                    default:
                        value = null;
                }
                extras[key.insertedIds[idx]] = value;
            });

            return extras;
        };

        // Crear activos (assets)
        const assetsData = [

        ];

        for (let i = 0; i < 100; i++) {

            const categories = [category1Result, category2Result]

            const categorySelect = categories[Math.floor(Math.random() * categories.length)]

            const subCategorySelect = await subCategories.findOne({ category: categorySelect.insertedId })



            assetsData.push(
                {
                    ownerName: 'John' + i,
                    ownerLastName: 'Doe' + i,
                    ownerIdType: 'passport+i',
                    ownerNumberId: '123456' + i,
                    ownerAddress: i + ' Street Name',
                    province: 'Some Province' + i,
                    location: 'Some Location' + i,
                    category: categorySelect.insertedId,
                    subCategory: subCategorySelect._id,
                    destination: destinations[Math.floor(Math.random() * destinations.length)],
                    destinationInfo: { info: 'Additional info' + i },
                    extras: createExtras(categorySelect.insertedId),
                    address: i + ' Street Name',
                    confiscated: false,
                    cautelaDate: new Date().toISOString().split('T')[0],
                    cautelaResolution: `file-resolution-${i}.pdf`,
                    juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                    juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                    fiscaliaJurisdiccion: 'Cámara Nacional de Apelaciones en lo Criminal y Correccional',
                    fiscalia: "Fiscalía Nº 23 ante los Juzgados Nacionales en lo Criminal y Correccional",
                    tribunal: 'Tribunal Superior',
                    causeNumber: 123456 + i,
                    thirdParties: false,
                    causeCoverSheet: 'Cover sheet information ' + i,
                    archivedAt: !(i % 10) ? new Date().toISOString().split('T')[0] : null,
                }
            )
        }

        await assets.insertMany(assetsData);

        console.log('Database populated successfully');
    } catch (err) {
        console.error('Error populating the database', err);
    } finally {
        await client.close();
    }
};

populateDB();
