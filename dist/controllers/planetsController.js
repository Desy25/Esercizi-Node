let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
const getAll = (req, res) => {
    res.json(planets);
};
const getOneById = (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const planet = planets.find((p) => p.id === planetId);
    if (!planet) {
        return res.status(404).json({ error: 'Error: Planet not found!' });
    }
    res.json(planet);
};
const createPlanet = (req, res) => {
    const newPlanet = req.body;
    planets.push(newPlanet);
    res.status(201).json({ msg: 'Planet created!' });
};
const updateById = (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const planetIndex = planets.findIndex((p) => p.id === planetId);
    if (planetIndex === -1) {
        return res.status(404).json({ error: 'Error: Planet not found!' });
    }
    planets[planetIndex] = req.body;
    res.json({ msg: 'Planet updated!' });
};
const deleteById = (req, res) => {
    const planetId = req.params.id;
    planets = planets.filter((planet) => String(planet.id) !== planetId);
    res.json({ msg: 'Planet deleted!' });
};
export { getAll, getOneById, createPlanet, updateById, deleteById };
