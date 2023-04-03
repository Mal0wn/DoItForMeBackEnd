const missionService = require("../src/services/mission.service");
const mission = require("../src/models/mission.model")

test('la récupération échoue avec une erreur', async () => {
    expect.assertions(1);
    return await missionService.findById('x').catch(e =>
        expect(e).toEqual(e),
    );
});