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
            color: '#ff0000',
            category: category1Result.insertedId,
            slug: 'category-1-subcategory-1A',
        };
        const subCategory1B = {
            name: 'SubCategory 1B',
            icon: icons[1],  // "tractor"
            color: '#00ff00',
            category: category1Result.insertedId,
            slug: 'category-1-subcategory-1B',
        };

        const subCategory1AResult = await subCategories.insertOne(subCategory1A);
        const subCategory1BResult = await subCategories.insertOne(subCategory1B);

        // Crear subcategorías para la segunda categoría
        const subCategory2A = {
            name: 'SubCategory 2A',
            icon: icons[2],  // "gear"
            color: '#ff0000',
            category: category2Result.insertedId,
            slug: 'category-2-subcategory-2A',
        };
        const subCategory2B = {
            name: 'SubCategory 2B',
            icon: icons[3],  // "motorcycle"
            color: '#00ff00',
            category: category2Result.insertedId,
            slug: 'category-2-subcategory-2B',
        };

        const subCategory2AResult = await subCategories.insertOne(subCategory2A);
        const subCategory2BResult = await subCategories.insertOne(subCategory2B);

        // Crear campos extra para la primera categoría
        const extraFields1 = [
            { name: 'Extra Field 1A', hiddenDownload: false, type: 'text', description: 'Extra Field 1A Description', required: true, showCard: 'ALLWAYS', category: category1Result.insertedId, slug: 'category-1-extra-field-1A' },
            { name: 'Extra Field 1B', hiddenDownload: false, type: 'number', description: 'Extra Field 1B Description', required: false, showCard: 'EXPANDED', category: category1Result.insertedId, slug: 'category-1-extra-field-1B' },
            { name: 'Extra Field 1C', hiddenDownload: true, type: 'date', description: 'Extra Field 1C Description', required: true, showCard: 'ALLWAYS', category: category1Result.insertedId, slug: 'category-1-extra-field-1C' },
            { name: 'Extra Field 1D', hiddenDownload: false, type: 'boolean', description: 'Extra Field 1D Description', required: false, showCard: 'NO', category: category1Result.insertedId, slug: 'category-1-extra-field-1D' }
        ];
        const extraFields1Result = await extraFields.insertMany(extraFields1);

        // Crear campos extra para la segunda categoría
        const extraFields2 = [
            { name: 'Extra Field 2A', hiddenDownload: false, type: 'text', description: 'Extra Field 2A Description', required: true, showCard: 'ALLWAYS', category: category2Result.insertedId, slug: 'category-2-extra-field-2A' },
            { name: 'Extra Field 2B', hiddenDownload: false, type: 'number', description: 'Extra Field 2B Description', required: false, showCard: 'EXPANDED', category: category2Result.insertedId, slug: 'category-2-extra-field-2B' },
            { name: 'Extra Field 2C', hiddenDownload: true, type: 'date', description: 'Extra Field 2C Description', required: true, showCard: 'ALLWAYS', category: category2Result.insertedId, slug: 'category-2-extra-field-2C' },
            { name: 'Extra Field 2D', hiddenDownload: false, type: 'boolean', description: 'Extra Field 2D Description', required: false, showCard: 'NO', category: category2Result.insertedId, slug: 'category-2-extra-field-2D' }
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
                    case 'boolean':
                        value = Math.random() < 0.5;
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
            {
                ownerName: 'John',
                ownerLastName: 'Doe',
                ownerIdType: 'passport',
                ownerNumberId: '123456789',
                ownerAddress: '123 Street Name',
                province: 'Some Province',
                location: 'Some Location',
                category: category1Result.insertedId,
                subCategory: subCategory1AResult.insertedId,
                destination: destinations[0], // "auction"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category1Result.insertedId),
                address: '123 Street Name',
                confiscated: false,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: 'Cámara Nacional de Apelaciones en lo Criminal y Correccional',
                fiscalia: "Fiscalía Nº 23 ante los Juzgados Nacionales en lo Criminal y Correccional",
                tribunal: 'Tribunal Superior',
                causeNumber: 123456,
                thirdParties: false,
                causeCoverSheet: 'Cover sheet information',
                archivedAt: null,
            },
            {
                ownerName: 'Jane',
                ownerLastName: 'Doe',
                ownerIdType: 'id card',
                ownerNumberId: '987654321',
                ownerAddress: '456 Another St',
                province: 'Another Province',
                location: 'Another Location',
                category: category1Result.insertedId,
                subCategory: subCategory1BResult.insertedId,
                destination: destinations[1], // "reuse"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category1Result.insertedId),
                address: '456 Another St',
                confiscated: true,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution2.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: "Cámara Nacional de Apelaciones en lo Comercial",
                fiscalia: "Fiscalía General ante la Cámara Nacional de Apelaciones en lo Comercial",
                tribunal: 'Tribunal de Apelación',
                causeNumber: 654321,
                thirdParties: true,
                causeCoverSheet: 'Cover sheet information 2',
                archivedAt: new Date().toISOString().split('T')[0],
            },
            {
                ownerName: 'Alice',
                ownerLastName: 'Smith',
                ownerIdType: 'driver license',
                ownerNumberId: '1122334455',
                ownerAddress: '789 Some St',
                province: 'Yet Another Province',
                location: 'Yet Another Location',
                category: category2Result.insertedId,
                subCategory: subCategory2AResult.insertedId,
                destination: destinations[2], // "Testing"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category2Result.insertedId),
                address: '789 Some St',
                confiscated: false,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution3.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: "Cámara Federal de Apelaciones de Bahía Blanca",
                fiscalia: "Fiscalía General ante la Cámara Federal de Apelaciones de Bahía Blanca",
                tribunal: 'Tribunal Federal',
                causeNumber: 789012,
                thirdParties: false,
                causeCoverSheet: 'Cover sheet information 3',
                archivedAt: null,
            },
            {
                ownerName: 'Bob',
                ownerLastName: 'Johnson',
                ownerIdType: 'passport',
                ownerNumberId: '2233445566',
                ownerAddress: '1011 Another St',
                province: 'Some Province',
                location: 'Some Location',
                category: category2Result.insertedId,
                subCategory: subCategory2BResult.insertedId,
                destination: destinations[0], // "auction"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category2Result.insertedId),
                address: '1011 Another St',
                confiscated: true,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution4.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: "Cámara Federal de Apelaciones de Comodoro Rivadavia",
                fiscalia: "Fiscalía General ante la Cámara Federal de Apelaciones de Comodoro Rivadavia",
                tribunal: 'Tribunal de Juicio',
                causeNumber: 345678,
                thirdParties: true,
                causeCoverSheet: 'Cover sheet information 4',
                archivedAt: null,
            },
            {
                ownerName: 'Charlie',
                ownerLastName: 'Brown',
                ownerIdType: 'id card',
                ownerNumberId: '3344556677',
                ownerAddress: '1213 Example St',
                province: 'Some Province',
                location: 'Example Location',
                category: category1Result.insertedId,
                subCategory: subCategory1AResult.insertedId,
                destination: destinations[1], // "reuse"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category1Result.insertedId),
                address: '1213 Example St',
                confiscated: false,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution5.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: "Cámara Federal de Apelaciones de Corrientes",
                fiscalia: "Fiscalía General ante la Cámara Federal de Apelaciones de Corrientes",
                tribunal: 'Tribunal Superior',
                causeNumber: 456789,
                thirdParties: false,
                causeCoverSheet: 'Cover sheet information 5',
                archivedAt: null,
            },
            {
                ownerName: 'Eve',
                ownerLastName: 'Williams',
                ownerIdType: 'driver license',
                ownerNumberId: '4455667788',
                ownerAddress: '1415 Another Example St',
                province: 'Another Example Province',
                location: 'Another Example Location',
                category: category2Result.insertedId,
                subCategory: subCategory2BResult.insertedId,
                destination: destinations[2], // "Testing"
                destinationInfo: { info: 'Additional info' },
                extras: createExtras(category2Result.insertedId),
                address: '1415 Another Example St',
                confiscated: true,
                cautelaDate: new Date().toISOString().split('T')[0],
                cautelaResolution: 'file-resolution6.pdf',
                juzgadoJurisdiccion: "Cámara Federal de Apelaciones de Bahia Blanca",
                juzgado: "Juzgado Federal de Primera Instancia de Santa Rosa",
                fiscaliaJurisdiccion: "Cámara Federal de Apelaciones de Córdoba",
                fiscalia: "Fiscalía General Nº 2 ante los Tribunales Orales en lo Criminal Federal de Córdoba",
                tribunal: 'Tribunal de Apelación',
                causeNumber: 567890,
                thirdParties: true,
                causeCoverSheet: 'Cover sheet information 6',
                archivedAt: null,
            },
        ];

        await assets.insertMany(assetsData);

        console.log('Database populated successfully');
    } catch (err) {
        console.error('Error populating the database', err);
    } finally {
        await client.close();
    }
};

populateDB();
