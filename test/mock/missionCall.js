const data = [
    {
        id: 1,
		picture: null,
		status: "ongoing",
		price: 10,
		title: "Mock Name 1",
		description: "Mock Description 1",
		creation_date: "2023-04-04T12:18:24.894Z",
		id_create: 2,
		id_make: null,
		address: {
			id: 1,
			number: 123,
			street: "Mock Address",
			zip_code: "12345",
			city: "Mock City",
			country: "France",
			complement: "",
			latitude: "100.000001",
			longitude: "100.000001",
			id_user: 1,
			id_mission: 1
		},
		creator: {
			id: 2,
			firstname: "Mock",
			lastname: "Mock",
			email: "Mock@Mock.fr",
			password: "Mock",
			picture: null,
			birthday: "2000-09-23T22:00:00.000Z",
			role: "user",
			phone: 123456789
		}
    }
  ];
  
  export default {
    findAllWithUser: jest.fn(url => {
      if (url === 'http://localhost:3000/mission/') {
        return Promise.resolve({
          data,
          status: 200
        });
      } else {
        throw new Error('Mock Error code 404');
      }
    }),
    findById: jest.fn(url => {
        if (url === 'http://localhost:3000/mission/1') {
          return Promise.resolve({
            data,
            status: 200
          });
        } else {
          throw new Error('Mock Error code 404');
        }
      }) 
  };