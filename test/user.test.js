const userController = require('../src/controllers/user.controller');
const userService = require('../src/services/user.service');
const jwt = require('jsonwebtoken');

// Test getCurrentUser in userController. Test if checkToken has been called and if findUserById has been called.
// The function most return status 200 and the user.
describe('getCurrentUser', () => {
    it('should return status 200 and the user', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mock checkToken
        const checkTokenMock = jest.spyOn(userController, 'checkToken');
        checkTokenMock.mockReturnValue(1); // Mock the returned userId

        // Mock findUserById
        const findUserByIdMock = jest.spyOn(userService, 'findUserById');
        const user = {
            id: '1',
            email: 'user@gmail.com',
            lastname: 'user',
            firstname: 'user',
            password: 'user',
            birthday: '01/01/2000',
            phone: '0600000000',
            role: 'user',
            address: [
                {
                    id: '10',
                    street: 'street',
                    city: 'city',
                    postalCode: 'postalCode',
                    country: 'country',
                },
            ],
        };
        findUserByIdMock.mockResolvedValue(user);

        await userController.getCurrentUser(req, res, next);

        expect(checkTokenMock).toHaveBeenCalled();
        expect(findUserByIdMock).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });
    it('should return status 401 when the token is invalid', async () => {
        const req = {
          headers: {
            authorization: 'Bearer invalidToken',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const next = jest.fn();
      
        // Mock checkToken to return status 401
        jest.spyOn(userController, 'checkToken').mockReturnValue(res.status(401));
      
        await userController.getCurrentUser(req, res, next);
      
        expect(userController.checkToken).toHaveBeenCalledWith(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });
});

describe('deleteCurrentUser', () => {
    it('should return status 200 when user is successfully deleted', async () => {
        // Création des mocks
        const req = {
            body: {
                phrase: 'DELETE MY ACCOUNT',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
    
        // Mock checkToken
        const checkTokenMock = jest.spyOn(userController, 'checkToken');
        checkTokenMock.mockResolvedValue(1);
    
        // Mock findUserById
        const findUserByIdMock = jest.spyOn(userService, 'findUserById');
        const user = {
            id: 1,
            email: 'updateduser@gmail.com',
            lastname: 'updated',
            firstname: 'updated',
            password: 'updated',
            birthday: '02/02/2000',
            phone: '0700000000',
            role: 'user',
            address: [
                {
                    id: '11',
                    street: 'updated street',
                    city: 'updated city',
                    postalCode: 'updated postalCode',
                    country: 'updated country',
                },
            ],
        };
        findUserByIdMock.mockResolvedValue(user);
    
        // Mock deleteUserRelationship
        const deleteUserRelationshipMock = jest.spyOn(userService, 'deleteUserRelationship');
        deleteUserRelationshipMock.mockResolvedValue();
    
        // Mock deleteUser
        const deleteUserMock = jest.spyOn(userService, 'deleteUser');
        deleteUserMock.mockResolvedValue();
    
        // Appel de la méthode à tester
        await userController.deleteCurrentUser(req, res, next);
    
        // Vérifications des appels et du statut de retour
        expect(checkTokenMock).toHaveBeenCalled();
        expect(findUserByIdMock).toHaveBeenCalledWith(1);
        expect(deleteUserRelationshipMock).toHaveBeenCalledWith(1);
        expect(deleteUserMock).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
    })
});

