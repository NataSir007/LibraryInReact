export const mockLibraries = [
  {
    id: 1,
    title: 'Central Library',
    address: '123 Main St',
    homepage: 'https://central-library.com',
    facebookUrl: 'https://facebook.com/central-library',
    noteTranslations: [{
      language: 'en',
      note: 'Main library in the city center'
    }, 
    {
      language: 'es',
      note: 'Biblioteca principal en el centro de la ciudad'
    }, 
    {
      language: 'fr',
      note: 'Bibliothèque principale du centre-ville'
    }],
    libraryEmailContactDetails: [{
      id: 1,
      libraryId: 1,
      serviceName: 'Email',
      contactName: 'John Doe',
      contactEmail: 'john.doe@central-library.com'
    }, {
      id: 2,
      libraryId: 1,
      serviceName: 'Email',
      contactName: 'Jane Smith',
      contactEmail: 'jane.smith@central-library.com'
    }, {
      libraryId: 1,
      serviceName: 'Email',
      contactName: 'Bob Johnson',
      contactEmail: 'bob.johnson@central-library.com'
    }],
    libraryPhoneNumberContactDetails: [{
      id: 1,
      libraryId: 1,
      serviceName: 'Phone',
      contactName: 'John Doe',
      contactPhoneNumber: '123-456-7890'
    }, 
    {
      id: 2,
      libraryId: 1,
      serviceName: 'Phone',
      contactName: 'Jane Smith',
      contactPhoneNumber: '123-456-7890'
    }, 
    {
      id: 3,
      libraryId: 1,
      serviceName: 'Phone',
      contactName: 'Bob Johnson',
      contactPhoneNumber: '123-456-7890'
    }],
    libraryMailingAddresses: 
      {
        libraryId: 1,
        postOfficeBox: 'PO Box 123',
        postalCode: '12345',
        locationType: 'Physical',
        locationName: 'Central Library'
      }
    ,
    libraryImages: [{
      id: 1,
      libraryId: 1,
      fileName: 'central-library-main.jpg',
      filePath: '/images/central-library-main.jpg',
      altText: 'Main entrance of Central Library',
      imageType: 1
    }, 
    {
      id: 2,
      libraryId: 1,
      fileName: 'central-library-exterior.jpg',
      filePath: '/images/central-library-exterior.jpg',
      altText: 'Exterior view of Central Library',
      imageType: 2
    }, 
    {
      id: 3,
      libraryId: 1,
      fileName: 'central-library-interior.jpg',
      filePath: '/images/central-library-interior.jpg',
      altText: 'Interior view of Central Library',
      imageType: 3
    }, 
    {
      id: 4,
      libraryId: 1,
      fileName: 'central-library-thumbnail.jpg',
      filePath: '/images/central-library-thumbnail.jpg',
      altText: 'Thumbnail of Central Library',
      imageType: 4
    }]
  },
  {
    id: 2,
    title: 'University Library',
    address: '456 Campus Ave',
    homepage: 'https://university-library.edu',
    facebookUrl: 'https://facebook.com/university-library',
    noteTranslations: [{
      language: 'en',
      note: 'University library on campus'
    }, {
      language: 'fr',
      note: 'Bibliothèque universitaire'
    }],
    libraryEmailContactDetails: [{
      id: 4,
      libraryId: 2,
      serviceName: 'Email',
      contactName: 'Alice Johnson',
      contactEmail: 'alice.johnson@university-library.edu'
    }, {
      id: 5,
      libraryId: 2,
      serviceName: 'Email',
      contactName: 'Bob Brown',
      contactEmail: 'bob.brown@university-library.edu'
    }],
    libraryPhoneNumberContactDetails: [{
      id: 4,
      libraryId: 2,
      serviceName: 'Phone',
      contactName: 'Alice Johnson',
      contactPhoneNumber: '555-0123'
    }, {
      id: 5,
      libraryId: 2,
      serviceName: 'Phone',
      contactName: 'Bob Brown',
      contactPhoneNumber: '555-0123'
    }],
    libraryMailingAddresses: {
      libraryId: 2,
      postOfficeBox: 'PO Box 456',
      postalCode: '45678',
      locationType: 'Physical',
      locationName: 'University Library'
    },
    libraryImages: [{
      id: 5,
      libraryId: 2,
      fileName: 'university-library-main.jpg',
      filePath: '/images/university-library-main.jpg',
      altText: 'Main entrance of University Library',
      imageType: 2
    }, {
      id: 6,
      libraryId: 2,
      fileName: 'university-library-exterior.jpg',
      filePath: '/images/university-library-exterior.jpg',
      altText: 'Exterior view of University Library',
      imageType: 3
    }]
  }
];